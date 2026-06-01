import { chromium } from "playwright";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ExportBody = {
  formationName?: "433" | "532" | "442";
  squadIds?: string;
};

export async function POST(req: Request) {
  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null;

  try {
    const body = (await req.json()) as ExportBody;

    const formationName =
      body.formationName === "532" || body.formationName === "442"
        ? body.formationName
        : "433";

    const squadIds = body.squadIds ?? "";

    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") ?? "http";

    if (!host) {
      return new Response("Missing host", { status: 400 });
    }

    const baseUrl = `${proto}://${host}`;
    const exportUrl = `${baseUrl}/export?formation=${formationName}&squad=${encodeURIComponent(
      squadIds
    )}`;

    browser = await chromium.launch({
      headless: true,
    });

    const page = await browser.newPage({
      viewport: {
        width: 760,
        height: 950,
      },
      deviceScaleFactor: 2,
    });

    await page.goto(exportUrl, {
      waitUntil: "networkidle",
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

    const screenshot = await page.locator("#export-root").screenshot({
      type: "png",
    });

    return new Response(new Uint8Array(screenshot), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Export failed", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
