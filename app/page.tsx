"use client";

import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

type Player = {
  id: number;
  name: string;
  pos: string;
  image: string;
};

type FormationName = "433" | "532" | "442";
type SlotRole = "FWD" | "MID" | "DEF" | "GK";

const proxiedImage = (url: string) =>
  `/api/image?url=${encodeURIComponent(url)}`;

const splitName = (name: string) => {
  if (name === "Jan Paul van Hecke") {
    return { first: "Jan Paul", last: "van Hecke" };
  }

  const parts = name.split(" ");
  return { first: parts[0], last: parts.slice(1).join(" ") };
};

const PLAYERS: Player[] = [
  { id: 24, name: "Bart Verbruggen", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/a131d0ac2a737fd5b3a1a9a6b278357c.png" },
  { id: 25, name: "Mark Flekken", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/045ba4edaa585ab7da10c84e7cc73090.png" },
  { id: 26, name: "Robin Roefs", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/8237a6a83948d53cdfeefbd7a5619b52.png" },

  { id: 1, name: "Virgil van Dijk", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/b61529d98808eb966fa155298ca81792.png" },
  { id: 2, name: "Nathan Aké", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/6d083f4cd5471af78621f2ef39b2ec8d.png" },
  { id: 3, name: "Micky van de Ven", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/16c8b649221dc9ab2af8e1d4214affd9.png" },
  { id: 4, name: "Jurriën Timber", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/5558488abad76dabf7076daf84500e20.png" },
  { id: 5, name: "Denzel Dumfries", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/eb7c4ba733681711810cfff5deb06b23.png" },
  { id: 6, name: "Jorrel Hato", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/cc449e3c4dc6a3ddb4f22416872a0db5.png" },
  { id: 7, name: "Jan Paul van Hecke", pos: "DEF", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/22d846a63280443114ec4423c562a804.png" },

  { id: 8, name: "Frenkie de Jong", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/cd3807c73b8d246ce326a0e48533e9e0.png" },
  { id: 9, name: "Tijjani Reijnders", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/be24e2c2dc9664752b4865432810daf7.png" },
  { id: 10, name: "Ryan Gravenberch", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/6a67dd18fee1f62250aa5aaca86f415a.png" },
  { id: 11, name: "Marten de Roon", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/42189180815db4a2560a94688349c90e.png" },
  { id: 12, name: "Teun Koopmeiners", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/e4df247111b5e39d17aeb1d13d702623.png" },
  { id: 13, name: "Justin Kluivert", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/1c1b667529377a70756babbed55e1f53.png" },
  { id: 14, name: "Guus Til", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/ec76a949fad2cb76184bced7e83604b7.png" },
  { id: 15, name: "Quinten Timber", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/c36c9ea1cff363bd7200d4bb985519ea.png" },
  { id: 16, name: "Mats Wieffer", pos: "MID", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/814279f4ec832051d2434f42f5d59cde.png" },

  { id: 17, name: "Memphis Depay", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/67ac5232be47bd45341f04454dc2c279.png" },
  { id: 18, name: "Cody Gakpo", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/3e9a4e8dee2e952749a7cdd047dfa6c0.png" },
  { id: 19, name: "Donyell Malen", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/d0baeb98900e2274cc70149e16b95683.png" },
  { id: 20, name: "Brian Brobbey", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/ac1404b1a1ac6bcfd2b3b71febcf03d8.png" },
  { id: 21, name: "Wout Weghorst", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/890eeee1d86b357850454f94f94cdd8d.png" },
  { id: 22, name: "Noa Lang", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/8b55ea37b795f39c4a94fb3b8903ab48.png" },
  { id: 23, name: "Crysencio Summerville", pos: "FWD", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/1f2b7d8cd13cd2cf84c38b384be85595.png" },
];

const FORMATIONS: Record<FormationName, number[][]> = {
  "433": [[0, 1, 2], [3, 4, 5], [6, 7, 8, 9], [10]],
  "532": [[0, 1], [2, 3, 4], [5, 6, 7, 8, 9], [10]],
  "442": [[0, 1], [2, 3, 4, 5], [6, 7, 8, 9], [10]],
};

const TRASH_CURSOR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect x='10' y='12' width='12' height='13' rx='2' fill='none' stroke='%23ffffff' stroke-width='2.2'/%3E%3Cpath d='M9 9h14M13 9V7h6v2M14 15v7M18 15v7' fill='none' stroke='%23ffffff' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E\") 16 16, pointer";

export default function Home() {
  const [formationName, setFormationName] = useState<FormationName>("433");
  const [squad, setSquad] = useState<(Player | null)[]>(Array(11).fill(null));
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [swapSlot, setSwapSlot] = useState<number | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null);
  const [hoveredFormation, setHoveredFormation] = useState<FormationName | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const exportRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const playerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const formation = FORMATIONS[formationName];

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 760);
    updateIsMobile();

    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const updateScrollProgress = () => {
    const panel = panelRef.current;
    if (!panel) return;

    if (window.innerWidth <= 760) {
      const maxScroll = panel.scrollWidth - panel.clientWidth;
      setScrollProgress(maxScroll <= 0 ? 0 : panel.scrollLeft / maxScroll);
      return;
    }

    const maxScroll = panel.scrollHeight - panel.clientHeight;
    setScrollProgress(maxScroll <= 0 ? 0 : panel.scrollTop / maxScroll);
  };

  const scrollPanelBy = (amount: number) => {
    if (!panelRef.current) return;

    if (window.innerWidth <= 760) {
      panelRef.current.scrollBy({ left: amount, behavior: "smooth" });
      return;
    }

    panelRef.current.scrollBy({ top: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Bungee&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      if (panelRef.current) {
        e.preventDefault();

        if (window.innerWidth <= 760) {
          panelRef.current.scrollLeft += e.deltaY;
        } else {
          panelRef.current.scrollTop += e.deltaY;
        }

        updateScrollProgress();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    requestAnimationFrame(updateScrollProgress);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    if (selectedPlayer && selectedSlot !== null) {
      setSquad((prev) => {
        const next = [...prev];
        const oldIndex = prev.findIndex((p) => p?.id === selectedPlayer.id);

        if (oldIndex !== -1) next[oldIndex] = next[selectedSlot];

        next[selectedSlot] = selectedPlayer;
        return next;
      });

      setSelectedPlayer(null);
      setSelectedSlot(null);
      setSwapSlot(null);
    }
  }, [selectedPlayer, selectedSlot]);

  const preloadImages = async () => {
    await Promise.all(
      PLAYERS.map(
        (p) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = proxiedImage(p.image);
          })
      )
    );
  };

  const exportPng = async () => {
    if (!exportRef.current) return;

    await preloadImages();

    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      allowTaint: false,
      imageTimeout: 15000,
      logging: false,
    });

    const fileName = `oranje-builder-${formationName}.png`;

    const downloadPng = () => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png", 1);
      link.click();
    };

    const isMobileShare =
      typeof window !== "undefined" &&
      window.innerWidth <= 760 &&
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function";

    if (isMobileShare) {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          downloadPng();
          return;
        }

        const file = new File([blob], fileName, { type: "image/png" });
        const shareData = {
          title: "Mijn Oranje-opstelling",
          text: "Mijn Oranje-opstelling",
          files: [file],
        };

        try {
          if (
            typeof navigator.canShare === "function" &&
            navigator.canShare({ files: [file] })
          ) {
            await navigator.share(shareData);
            return;
          }

          await navigator.share({
            title: shareData.title,
            text: shareData.text,
          });
        } catch (error) {
          if ((error as Error)?.name !== "AbortError") {
            downloadPng();
          }
        }
      }, "image/png", 1);

      return;
    }

    downloadPng();
  };

  const getSlotRole = (slotIndex: number): SlotRole => {
    const rowIndex = formation.findIndex((row) => row.includes(slotIndex));
    if (rowIndex === 0) return "FWD";
    if (rowIndex === 1) return "MID";
    if (rowIndex === 2) return "DEF";
    return "GK";
  };

  const scrollToRole = (role: SlotRole) => {
    const targetId =
      role === "GK" ? 24 : role === "DEF" ? 1 : role === "MID" ? 8 : 17;

    requestAnimationFrame(() => {
      const target = playerRefs.current[targetId];
      const panel = panelRef.current;
      if (!target || !panel) return;

      if (window.innerWidth <= 760) {
        panel.scrollTo({
          left: target.offsetLeft - panel.offsetLeft,
          behavior: "smooth",
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      requestAnimationFrame(updateScrollProgress);
    });
  };

  const clearSelection = () => {
    setSquad(Array(11).fill(null));
    setSelectedPlayer(null);
    setSelectedSlot(null);
    setSwapSlot(null);
  };

  const handleFieldBackgroundClick = () => {
    if (swapSlot !== null) {
      setSquad((prev) => {
        const next = [...prev];
        next[swapSlot] = null;
        return next;
      });

      setSwapSlot(null);
      setSelectedSlot(null);
      setSelectedPlayer(null);
      return;
    }

    setSelectedSlot(null);
  };

  const handleFieldClick = (index: number) => {
    scrollToRole(getSlotRole(index));

    if (selectedPlayer) {
      setSelectedSlot(index);
      return;
    }

    if (swapSlot !== null) {
      if (swapSlot === index) {
        setSwapSlot(null);
        return;
      }

      setSquad((prev) => {
        const next = [...prev];
        const temp = next[index];
        next[index] = next[swapSlot];
        next[swapSlot] = temp;
        return next;
      });

      setSwapSlot(null);
      setSelectedSlot(null);
      setSelectedPlayer(null);
      return;
    }

    if (selectedSlot !== null && squad[index]) {
      setSquad((prev) => {
        const next = [...prev];
        next[selectedSlot] = next[index];
        next[index] = null;
        return next;
      });

      setSelectedSlot(null);
      setSwapSlot(null);
      setSelectedPlayer(null);
      return;
    }

    if (squad[index]) {
      setSwapSlot(index);
      setSelectedSlot(null);
      return;
    }

    setSelectedSlot((current) => (current === index ? null : index));
  };

  const handleInventoryClick = (player: Player) => {
    if (swapSlot !== null) {
      setSquad((prev) => {
        const next = [...prev];
        const playerOldIndex = prev.findIndex((p) => p?.id === player.id);
        const fieldPlayer = next[swapSlot];

        if (playerOldIndex !== -1) {
          next[playerOldIndex] = fieldPlayer;
        }

        next[swapSlot] = player;
        return next;
      });

      setSwapSlot(null);
      setSelectedSlot(null);
      setSelectedPlayer(null);
      return;
    }

    if (selectedSlot !== null) {
      setSquad((prev) => {
        const next = [...prev];
        const playerOldIndex = prev.findIndex((p) => p?.id === player.id);

        if (playerOldIndex !== -1) {
          next[playerOldIndex] = next[selectedSlot];
        }

        next[selectedSlot] = player;
        return next;
      });

      setSelectedSlot(null);
      setSwapSlot(null);
      setSelectedPlayer(null);
      return;
    }

    setSelectedPlayer((current) => (current?.id === player.id ? null : player));
    setSwapSlot(null);
  };

  const renderPitchLines = () => (
    <div style={{ ...styles.pitchPerspective, ...(isMobile ? styles.mobilePitchPerspective : {}) }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={styles.pitchSvg}
        aria-hidden="true"
      >
        <path
          d="M24 2 Q21.5 2 21 5 L8.8 95 Q8.3 99 12.5 99 H87.5 Q91.7 99 91.2 95 L79 5 Q78.5 2 76 2 Z"
          style={styles.pitchFieldShape}
        />
        <line x1="14" y1="50" x2="86" y2="50" style={styles.pitchSvgLine} />
        <ellipse cx="50" cy="50" rx="10.5" ry="8.5" style={styles.pitchSvgLine} />
      </svg>
    </div>
  );

  const renderVisualSlot = (index: number, exportMode = false) => {
    const player = squad[index];
    const active = !exportMode && (selectedSlot === index || swapSlot === index);
    const hover = !exportMode && hoveredSlot === index;
    const nameParts = player ? splitName(player.name) : null;

    return (
      <div
        key={index}
        onClick={
          exportMode
            ? undefined
            : (e) => {
                e.stopPropagation();
                handleFieldClick(index);
              }
        }
        onMouseEnter={exportMode ? undefined : () => setHoveredSlot(index)}
        onMouseLeave={exportMode ? undefined : () => setHoveredSlot(null)}
        style={{
          ...styles.slot,
          ...(!exportMode && isMobile ? styles.mobileSlot : {}),
          ...(exportMode ? styles.exportSlot : {}),
          transform: active || hover ? "scale(1.035)" : "scale(1)",
          outline: active
            ? "2px solid #00ff88"
            : hover
            ? "2px solid rgba(255,255,255,0.4)"
            : "2px solid transparent",
          boxShadow: active
            ? "0 0 26px rgba(0,255,136,0.45)"
            : hover
            ? "0 10px 28px rgba(255,120,0,0.35)"
            : "none",
        }}
      >
        {player && nameParts ? (
          <div style={{ ...styles.card, ...(exportMode ? styles.exportCard : {}) }}>
            <div
              style={{
                ...styles.cardPhoto,
                ...(exportMode ? styles.exportCardPhoto : {}),
                backgroundImage: `url("${proxiedImage(player.image)}")`,
                transform: hover ? "scale(1.08)" : "scale(1)",
              }}
            />
            <div style={styles.cardOverlay} />
            <div style={{ ...styles.cardName, ...styles.twoLineName, ...(exportMode ? styles.exportCardName : {}) }}>
              <span>{nameParts.first}</span>
              <span>{nameParts.last}</span>
            </div>
          </div>
        ) : (
          <div style={styles.emptyDot} />
        )}
      </div>
    );
  };

  const renderFormation = (exportMode = false) => (
    <div
      style={{
        ...(exportMode ? styles.exportFormation : styles.formation),
        ...(!exportMode && isMobile ? styles.mobileFormation : {}),
      }}
    >
      {formation.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            ...(exportMode ? styles.exportRow : styles.row),
            ...(!exportMode && isMobile ? styles.mobileRow : {}),
          }}
        >
          {row.map((slotIndex) => renderVisualSlot(slotIndex, exportMode))}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ ...styles.page, ...(isMobile ? styles.mobilePage : {}) }}>
      <div style={styles.siteTexture} />

      <div style={{ ...styles.layout, ...(isMobile ? styles.mobileLayout : {}) }}>
        <div
          style={{
            ...styles.fieldArea,
            ...(isMobile ? styles.mobileFieldArea : {}),
            cursor: swapSlot !== null ? TRASH_CURSOR : "default",
          }}
          onClick={handleFieldBackgroundClick}
        >
          <img
            src="/logo.png"
            alt="DE18"
            style={{
              position: "absolute",
              top: isMobile ? 4 : 6,
              left: isMobile ? 4 : 6,
              width: isMobile ? 76 : 110,
              height: "auto",
              zIndex: 10,
              filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.35))",
              pointerEvents: "none",
            }}
          />
          {renderPitchLines()}

          <div style={{ ...styles.formationControls, ...(isMobile ? styles.mobileFormationControls : {}) }}>
            <div style={{ ...styles.formationButtons, ...(isMobile ? styles.mobileFormationButtons : {}) }}>
              {(["433", "532", "442"] as FormationName[]).map((f) => {
                const isActive = formationName === f;
                const isHover = hoveredFormation === f;

                return (
                  <button
                    key={f}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormationName(f);
                      setSelectedSlot(null);
                      setSwapSlot(null);
                    }}
                    onMouseEnter={() => setHoveredFormation(f)}
                    onMouseLeave={() => setHoveredFormation(null)}
                    style={{
                      ...styles.formationButton,
                      ...(isMobile ? styles.mobileFormationButton : {}),
                      background: isActive ? "#27418C" : "rgba(0,0,0,0.28)",
                      color: "white",
                      transform: isHover ? "scale(1.035)" : "scale(1)",
                      border: isHover
                        ? "2px solid rgba(255,255,255,0.35)"
                        : "2px solid transparent",
                      boxShadow: isHover
                        ? "0 10px 26px rgba(255,120,0,0.35)"
                        : "none",
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ ...styles.fieldActionControls, ...(isMobile ? styles.mobileFieldActionControls : {}) }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                exportPng();
              }}
              style={{ ...styles.shareButton, ...(isMobile ? styles.mobileActionButton : {}) }}
            >
              deel ↗
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              style={{ ...styles.clearButton, ...(isMobile ? styles.mobileActionButton : {}) }}
            >
              selectie legen
            </button>
          </div>

          {renderFormation(false)}
        </div>

        <div style={{ ...styles.panelWrap, ...(isMobile ? styles.mobilePanelWrap : {}) }}>
          <div
            ref={panelRef}
            className="players-panel"
            style={{ ...styles.panel, ...(isMobile ? styles.mobilePanel : {}) }}
            onScroll={updateScrollProgress}
          >
            <div style={{ ...styles.grid, ...(isMobile ? styles.mobileGrid : {}) }}>
              {PLAYERS.map((p) => {
                const active = selectedPlayer?.id === p.id;
                const hover = hoveredPlayer === p.id;

                return (
                  <div
                    key={p.id}
                    ref={(el) => {
                      playerRefs.current[p.id] = el;
                    }}
                    onClick={() => handleInventoryClick(p)}
                    onMouseEnter={() => setHoveredPlayer(p.id)}
                    onMouseLeave={() => setHoveredPlayer(null)}
                    style={{
                      ...styles.inventoryCard,
                      ...(isMobile ? styles.mobileInventoryCard : {}),
                      transform: active || hover ? "scale(1.035)" : "scale(1)",
                      border: active
                        ? "2px solid #00ff88"
                        : hover
                        ? "2px solid rgba(255,255,255,0.35)"
                        : "2px solid transparent",
                      boxShadow: active
                        ? "0 0 28px rgba(0,255,136,0.45)"
                        : hover
                        ? "0 10px 26px rgba(255,120,0,0.35)"
                        : "none",
                      scrollSnapAlign: "start",
                    }}
                  >
                    <div
                      style={{
                        ...styles.inventoryPhoto,
                        backgroundImage: `url("${proxiedImage(p.image)}")`,
                        transform: hover ? "scale(1.16)" : "scale(1.08)",
                      }}
                    />
                    <div style={styles.cardOverlay} />
                    <div style={{ ...styles.cardName, ...styles.twoLineName }}>{p.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ ...styles.customScrollbar, ...(isMobile ? styles.mobileCustomScrollbar : {}) }}>
            <button type="button" style={{ ...styles.scrollButton, ...(isMobile ? styles.mobileScrollButton : {}) }} onClick={() => scrollPanelBy(-180)}>
              ▲
            </button>

            <div style={styles.scrollRail}>
              <div style={{ ...styles.scrollThumb, top: `${scrollProgress * 72}%` }} />
            </div>

            <button type="button" style={{ ...styles.scrollButton, ...(isMobile ? styles.mobileScrollButton : {}) }} onClick={() => scrollPanelBy(180)}>
              ▼
            </button>
          </div>

          {isMobile && (
            <div style={styles.mobileHorizontalScrollbar}>
              <div
                style={{
                  ...styles.mobileHorizontalThumb,
                  left: `${scrollProgress * 70}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div ref={exportRef} style={styles.exportField}>
        <div style={styles.siteTexture} />
        {renderPitchLines()}
        {renderFormation(true)}
      </div>

      <style>{`
        @keyframes dropIn {
          0% {
            transform: perspective(800px) rotateX(-65deg) translateY(-35px) scale(.78);
            opacity: 0;
          }
          65% {
            transform: perspective(800px) rotateX(8deg) translateY(4px) scale(1.03);
            opacity: 1;
          }
          100% {
            transform: perspective(800px) rotateX(0deg) translateY(0) scale(1);
            opacity: 1;
          }
        }

        .players-panel {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .players-panel::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          display: none;
        }
      `}</style>
    </div>
  );
}

const line = "rgba(255,122,24,0.22)";

const styles: any = {
  page: {
    height: "100vh",
    overflow: "hidden",
    color: "white",
    padding: 18,
    boxSizing: "border-box",
    fontFamily: "'Bungee', sans-serif",
    background: "linear-gradient(135deg,#ff7a18,#ff4d00,#6b0000)",
    position: "relative",
  },

  siteTexture: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.065) 0px 2px, transparent 2px 8px)",
  },

  layout: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    gap: 18,
    overflow: "hidden",
  },

  fieldArea: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },

  pitchPerspective: {
    position: "absolute",
    left: "12%",
    right: "12%",
    top: "7%",
    bottom: "15%",
    zIndex: 1,
    pointerEvents: "none",
    opacity: 0.62,
    transform: "perspective(900px) rotateX(24deg)",
    transformOrigin: "center center",
    filter: "blur(10px) drop-shadow(0 24px 70px rgba(0,0,0,0.30))",
    overflow: "visible",
  },

  pitchSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
  },

  pitchFieldShape: {
    fill: "rgba(3, 3, 4, 0.52)",
  },

  pitchSvgLine: {
    fill: "none",
    stroke: line,
    strokeWidth: 0.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke",
    opacity: 0.72,
  },

  pitchSvgFill: {
    fill: line,
  },

  exportField: {
    position: "fixed",
    left: "-9999px",
    top: 0,
    display: "inline-flex",
    width: "auto",
    height: "auto",
    padding: 28,
    borderRadius: 28,
    overflow: "hidden",
    background: "linear-gradient(135deg,#ff7a18,#ff4d00,#6b0000)",
    fontFamily: "'Bungee', sans-serif",
  },

  formationControls: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "stretch",
  },

  fieldActionControls: {
    position: "absolute",
    top: 54,
    right: 0,
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "stretch",
  },

  formationButtons: {
    display: "flex",
    gap: 8,
  },

  formationButton: {
    border: "2px solid transparent",
    borderRadius: 11,
    padding: "8px 11px",
    fontFamily: "'Bungee', sans-serif",
    fontSize: 11,
    cursor: "pointer",
    transition: "transform .18s ease, box-shadow .18s ease, border .18s ease, background .18s ease",
  },

  clearButton: {
    border: "none",
    borderRadius: 13,
    padding: "9px 11px",
    fontFamily: "'Bungee', sans-serif",
    fontSize: 10,
    color: "white",
    background: "rgba(0,0,0,0.34)",
    backdropFilter: "blur(0.5px)",
    cursor: "pointer",
  },

  shareButton: {
    border: "none",
    borderRadius: 13,
    padding: "9px 11px",
    fontFamily: "'Bungee', sans-serif",
    fontSize: 10,
    color: "white",
    background: "#27418C",
    backdropFilter: "blur(0.5px)",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(39,65,140,0.35)",
  },

  formation: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    padding: "24px 36px",
    boxSizing: "border-box",
  },

  exportFormation: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
  },

  exportRow: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
  },

  slot: {
    height: "calc((100vh - 120px) / 4)",
    aspectRatio: "104 / 132",
    borderRadius: 20,
    background: "rgba(0,0,0,0.14)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform .18s ease, box-shadow .18s ease, outline .18s ease",
    flex: "0 0 auto",
  },

  exportSlot: {
    width: 104,
    height: 132,
    minWidth: 104,
    minHeight: 132,
    maxWidth: 104,
    maxHeight: 132,
    flex: "0 0 auto",
    cursor: "default",
    transition: "none",
    borderRadius: 16,
  },

  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    animation: "dropIn .28s cubic-bezier(.2,.8,.2,1)",
    overflow: "hidden",
  },

  exportCard: {
    animation: "none",
  },

  cardPhoto: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 15%",
    backgroundRepeat: "no-repeat",
    transition: "transform .18s ease",
    willChange: "transform",
  },

  exportCardPhoto: {
    backgroundSize: "cover",
    backgroundPosition: "center 15%",
    transition: "none",
    willChange: "auto",
  },

  inventoryPhoto: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    transition: "transform .18s ease",
    willChange: "transform",
  },

  cardOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent 42%)",
  },

  cardName: {
    position: "absolute",
    bottom: 7,
    left: 0,
    width: "100%",
    textAlign: "center",
    fontSize: "clamp(9px, 0.75vw, 13px)",
    textShadow: "0 2px 10px black",
    padding: "0 4px",
    pointerEvents: "none",
  },

  twoLineName: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    lineHeight: 1,
  },

  exportCardName: {
    fontSize: 9,
    bottom: 7,
  },

  emptyDot: {
    width: 30,
    height: 30,
    borderRadius: 999,
    margin: "auto",
    marginTop: 50,
    background: "radial-gradient(circle, rgba(255,185,92,0.36), rgba(255,122,24,0.16) 42%, transparent 76%)",
  },

  panelWrap: {
    width: 390,
    height: "100%",
    position: "relative",
    display: "flex",
    gap: 10,
  },

  panel: {
    width: 360,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    borderRadius: 24,
    background: "rgba(3, 3, 4, 0.46)",
    backdropFilter: "blur(0.5px)",
    padding: 14,
    boxSizing: "border-box",
    scrollSnapType: "y mandatory",
    scrollPaddingTop: 14,
    scrollBehavior: "smooth",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.30)",
  },

  customScrollbar: {
    width: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  scrollButton: {
    width: 20,
    height: 20,
    border: "none",
    borderRadius: 999,
    background: "#27418C",
    color: "white",
    fontSize: 9,
    lineHeight: "20px",
    padding: 0,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
  },

  scrollRail: {
    position: "relative",
    flex: 1,
    width: 12,
    background: "transparent",
  },

  scrollThumb: {
    position: "absolute",
    left: 0,
    width: 12,
    height: "28%",
    borderRadius: 999,
    background: "#27418C",
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },

  inventoryCard: {
    position: "relative",
    height: "calc((100vh - 110px) / 4)",
    borderRadius: 18,
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform .18s ease, box-shadow .18s ease, border .18s ease",
  },

  mobilePage: {
    height: "100dvh",
    padding: 10,
  },

  mobileLayout: {
    flexDirection: "column",
    gap: 10,
  },

  mobileFieldArea: {
    flex: "0 0 72%",
    width: "100%",
    minHeight: 0,
  },

  mobilePitchPerspective: {
    top: "12%",
    bottom: "12%",
  },

  mobileFormation: {
    gap: 6,
    padding: "48px 4px 8px",
  },

  mobileRow: {
    gap: 6,
  },

  mobileSlot: {
    height: "clamp(68px, 22.5vw, 90px)",
    borderRadius: 12,
  },

  mobileFormationControls: {
    top: 0,
    right: 0,
    gap: 6,
  },

  mobileFieldActionControls: {
    top: "auto",
    bottom: 8,
    right: 0,
    gap: 7,
    alignItems: "stretch",
  },

  mobileFormationButtons: {
    gap: 5,
  },

  mobileFormationButton: {
    padding: "6px 8px",
    fontSize: 9,
    borderRadius: 9,
  },

  mobileActionButton: {
    padding: "7px 8px",
    fontSize: 8,
    borderRadius: 10,
  },

  mobilePanelWrap: {
    flex: "1 1 28%",
    width: "100%",
    minHeight: 0,
    gap: 0,
    paddingBottom: 14,
    boxSizing: "border-box",
  },

  mobilePanel: {
    width: "100%",
    height: "calc(100% - 14px)",
    borderRadius: 18,
    padding: 10,
    overflowX: "auto",
    overflowY: "hidden",
    scrollSnapType: "x mandatory",
    scrollPaddingLeft: 10,
    WebkitOverflowScrolling: "touch",
  },

  mobileGrid: {
    display: "flex",
    gridTemplateColumns: "none",
    gridAutoFlow: "column",
    gap: 10,
    height: "100%",
    width: "max-content",
  },

  mobileInventoryCard: {
    flex: "0 0 calc((100vw - 60px) / 3)",
    width: "calc((100vw - 60px) / 3)",
    height: "100%",
    minHeight: 0,
    borderRadius: 14,
    scrollSnapAlign: "start",
  },

  mobileCustomScrollbar: {
    display: "none",
  },

  mobileHorizontalScrollbar: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 1,
    height: 7,
    borderRadius: 999,
    background: "rgba(0,0,0,0.22)",
    overflow: "hidden",
  },

  mobileHorizontalThumb: {
    position: "absolute",
    top: 0,
    width: "30%",
    height: "100%",
    borderRadius: 999,
    background: "#27418C",
    boxShadow: "0 2px 10px rgba(0,0,0,0.28)",
    transition: "left .12s linear",
  },

  mobileScrollButton: {
    width: 18,
    height: 18,
    fontSize: 8,
    lineHeight: "18px",
  },
};
