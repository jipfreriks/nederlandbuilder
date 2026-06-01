import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type ExportBody = {
  formationName?: "433" | "532" | "442";
  squadIds?: string;
};

export async function POST(req: Request) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

  try {
    const body = (await req.json()) as ExportBody;

    const formationName =
      body.formationName === "532" || body.formationName === "442"
        ? body.formationName
        : "433";

    const squadIds = body.squadIds ?? "";

    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") ?? "https";

    if (!host) {
      return new Response("Missing host", { status: 400 });
    }

    const baseUrl = `${proto}://${host}`;
    const exportUrl = `${baseUrl}/export?formation=${formationName}&squad=${encodeURIComponent(
      squadIds
    )}`;

    const isLocal =
      host.includes("localhost") ||
      host.includes("127.0.0.1") ||
      process.env.NODE_ENV === "development";

    browser = await puppeteer.launch({
      args: isLocal ? [] : chromium.args,
      defaultViewport: {
        width: 760,
        height: 950,
        deviceScaleFactor: 2,
      },
      executablePath: isLocal
        ? undefined
        : await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(exportUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.evaluate(async () => {
      const images = Array.from(document.images);
      await Promise.all(
        images.map((img) => {
          if (img.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );

      if ("fonts" in document) {
        await document.fonts.ready;
      }
    });

    const element = await page.$("#export-root");

    if (!element) {
      return new Response("Export root not found", { status: 500 });
    }

    const screenshot = await element.screenshot({
      type: "png",
    });

    return new Response(new Uint8Array(screenshot), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Export failed:", error);
    return new Response("Export failed", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
