type Player = {
  id: number;
  name: string;
  pos: string;
  image: string;
};

type FormationName = "433" | "532" | "442";

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

// =====================================================
// PLAYER PHOTO TWEAKS (ZOEK HIEROP)
// =====================================================
const ROEFS_FIELD_SCALE = 1.15;
const ROEFS_FIELD_Y = "-60%";

const KOOPMEINERS_Y = "25%";
// =====================================================

function getPlayer(id: number) {
  return PLAYERS.find((player) => player.id === id) ?? null;
}

export default async function ExportPage({
  searchParams,
}: {
  searchParams?: Promise<{
    formation?: string;
    squad?: string;
  }>;
}) {
  const params = await searchParams;

  const formationParam = params?.formation;
  const formationName: FormationName =
    formationParam === "532" || formationParam === "442" ? formationParam : "433";

  const ids = (params?.squad ?? "")
    .split(",")
    .map((value) => Number(value));

  const squad = Array.from({ length: 11 }, (_, index) =>
    ids[index] ? getPlayer(ids[index]) : null
  );

  const formation = FORMATIONS[formationName];

  const renderSlot = (slotIndex: number) => {
    const player = squad[slotIndex];
    const nameParts = player ? splitName(player.name) : null;

    return (
      <div key={slotIndex} style={styles.slot}>
        {player && nameParts ? (
          <div style={styles.card}>
            <div
              style={{
                ...styles.cardPhoto,
                backgroundImage: `url("${proxiedImage(player.image)}")`,
                backgroundPosition:
                  player.id === 26
                    ? `center ${ROEFS_FIELD_Y}`
                    : player.id === 12
                    ? `center ${KOOPMEINERS_Y}`
                    : "center 15%",
                transform:
                  player.id === 26
                    ? `scale(${ROEFS_FIELD_SCALE})`
                    : "scale(1)",
              }}
            />
            <div style={styles.cardOverlay} />
            <div style={{ ...styles.cardName, ...styles.twoLineName }}>
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');

        html,
        body {
          margin: 0;
          padding: 0;
          width: 760px;
          min-height: 100%;
          overflow: hidden;
          background: #ff4d00;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      <main id="export-root" style={styles.page}>
        <svg style={styles.textureSvg} viewBox="0 0 760 900" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="diagonal-texture" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="2" height="8" fill="rgba(255,255,255,0.16)" />
            </pattern>
            <pattern id="diagonal-texture-soft" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="1" height="16" fill="rgba(255,255,255,0.07)" />
            </pattern>
          </defs>
          <rect width="760" height="900" fill="url(#diagonal-texture)" />
          <rect width="760" height="900" fill="url(#diagonal-texture-soft)" opacity="0.7" />
        </svg>

        <img src="/logo.png" alt="DE18" style={styles.logo} />

        <div style={styles.formation}>
          {formation.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((slotIndex) => renderSlot(slotIndex))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: 760,
    position: "relative",
    overflow: "clip",
    boxSizing: "border-box",
    padding: "40px 18px",
    background: "linear-gradient(135deg,#ff7a18,#ff4d00,#6b0000)",
    color: "white",
    fontFamily: "'Bungee', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "2px solid #ff4d00",
    outlineOffset: "-1px",
  },

  textureSvg: {
    position: "absolute",
    inset: -2,
    width: "calc(100% + 4px)",
    height: "calc(100% + 4px)",
    zIndex: 1,
    pointerEvents: "none",
  },

  logo: {
    position: "relative",
    width: 118,
    height: "auto",
    zIndex: 20,
    opacity: 0.94,
    filter: "none",
    marginBottom: 10,
    flex: "0 0 auto",
  },

  formation: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    padding: 0,
    boxSizing: "border-box",
    flex: "0 0 auto",
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
  },

  slot: {
    width: 128,
    height: 162,
    flex: "0 0 auto",
    borderRadius: 18,
    overflow: "hidden",
    background: "rgba(0,0,0,0.16)",
  },

  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },

  cardPhoto: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 15%",
    backgroundRepeat: "no-repeat",
    imageRendering: "auto",
    transformOrigin: "center center",
  },

  cardOverlay: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: "linear-gradient(to top, rgba(0,0,0,0.82), transparent 42%)",
  },

  cardName: {
    position: "absolute",
    bottom: 11,
    left: 0,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
    textShadow: "0 2px 10px black",
    padding: "0 4px",
    pointerEvents: "none",
    letterSpacing: 0,
  },

  twoLineName: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    lineHeight: 1,
  },

  emptyDot: {
    width: 30,
    height: 30,
    borderRadius: 999,
    margin: "auto",
    marginTop: 50,
    background:
      "radial-gradient(circle, rgba(255,185,92,0.36), rgba(255,122,24,0.16) 42%, transparent 76%)",
  },
};
