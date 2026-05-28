"use client";

import { useEffect, useState } from "react";

type Player = {
  id: number;
  name: string;
  club: string;
  pos: string;
  image: string;
};

const players: Player[] = [
  { id: 1, name: "Nathan Aké", club: "Manchester City", pos: "CB/LB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/6d083f4cd5471af78621f2ef39b2ec8d.png" },
  { id: 2, name: "Brian Brobbey", club: "Sunderland", pos: "ST", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/ac1404b1a1ac6bcfd2b3b71febcf03d8.png" },
  { id: 3, name: "Memphis Depay", club: "Corinthians", pos: "ST", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/67ac5232be47bd45341f04454dc2c279.png" },
  { id: 4, name: "Virgil van Dijk", club: "Liverpool", pos: "CB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/b61529d98808eb966fa155298ca81792.png" },
  { id: 5, name: "Denzel Dumfries", club: "Internazionale", pos: "RB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/eb7c4ba733681711810cfff5deb06b23.png" },
  { id: 6, name: "Mark Flekken", club: "Leverkusen", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/045ba4edaa585ab7da10c84e7cc73090.png" },
  { id: 7, name: "Cody Gakpo", club: "Liverpool", pos: "LW", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/3e9a4e8dee2e952749a7cdd047dfa6c0.png" },
  { id: 8, name: "Ryan Gravenberch", club: "Liverpool", pos: "CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/6a67dd18fee1f62250aa5aaca86f415a.png" },
  { id: 9, name: "Jorrel Hato", club: "Chelsea", pos: "LB/CB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/cc449e3c4dc6a3ddb4f22416872a0db5.png" },
  { id: 10, name: "Jan Paul van Hecke", club: "Brighton", pos: "CB/CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/22d846a63280443114ec4423c562a804.png" },
  { id: 11, name: "Frenkie de Jong", club: "Barcelona", pos: "CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/cd3807c73b8d246ce326a0e48533e9e0.png" },
  { id: 12, name: "Justin Kluivert", club: "Bournemouth", pos: "CAM/LW", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/1c1b667529377a70756babbed55e1f53.png" },
  { id: 13, name: "Teun Koopmeiners", club: "Juventus", pos: "CM/CB/CAM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/e4df247111b5e39d17aeb1d13d702623.png" },
  { id: 14, name: "Noa Lang", club: "Galatasaray", pos: "LW", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/8b55ea37b795f39c4a94fb3b8903ab48.png" },
  { id: 15, name: "Donyell Malen", club: "Roma", pos: "ST/RW", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/d0baeb98900e2274cc70149e16b95683.png" },
  { id: 16, name: "Tijjani Reijnders", club: "Man City", pos: "CAM/CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/be24e2c2dc9664752b4865432810daf7.png" },
  { id: 17, name: "Robin Roefs", club: "Sunderland", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/8237a6a83948d53cdfeefbd7a5619b52.png" },
  { id: 18, name: "Marten de Roon", club: "Atalanta", pos: "CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/42189180815db4a2560a94688349c90e.png" },
  { id: 19, name: "Crysencio Summerville", club: "West Ham", pos: "RW", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/1f2b7d8cd13cd2cf84c38b384be85595.png" },
  { id: 20, name: "Guus Til", club: "PSV", pos: "CAM/ST", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/ec76a949fad2cb76184bced7e83604b7.png" },
  { id: 21, name: "Jurriën Timber", club: "Arsenal", pos: "CB/RB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/5558488abad76dabf7076daf84500e20.png" },
  { id: 22, name: "Quinten Timber", club: "Marseille", pos: "CM", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/c36c9ea1cff363bd7200d4bb985519ea.png" },
  { id: 23, name: "Micky van de Ven", club: "Tottenham", pos: "CB/LB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/16c8b649221dc9ab2af8e1d4214affd9.png" },
  { id: 24, name: "Bart Verbruggen", club: "Brighton", pos: "GK", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/a131d0ac2a737fd5b3a1a9a6b278357c.png" },
  { id: 25, name: "Wout Weghorst", club: "Ajax", pos: "ST", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/890eeee1d86b357850454f94f94cdd8d.png" },
  { id: 26, name: "Mats Wieffer", club: "Brighton", pos: "CM/CB/RB", image: "https://sassets.knvb.nl/sites/onsoranje.nl/files/players/814279f4ec832051d2434f42f5d59cde.png" },
];

const formations = {
  "4-3-3": {
    positions: ["GK", "LB", "LCB", "RCB", "RB", "LCM", "CAM", "RCM", "LW", "ST", "RW"],
    rows: [
      [8, 9, 10],
      [5, 6, 7],
      [1, 2, 3, 4],
      [0],
    ],
  },

  "5-3-2": {
    positions: ["GK", "LWB", "LCB", "CB", "RCB", "RWB", "LCM", "CM", "RCM", "ST", "ST"],
    rows: [
      [9, 10],
      [6, 7, 8],
      [1, 2, 3, 4, 5],
      [0],
    ],
  },

  "4-4-2": {
    positions: ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "ST", "ST"],
    rows: [
      [9, 10],
      [5, 6, 7, 8],
      [1, 2, 3, 4],
      [0],
    ],
  },
};

const rolePriority: Record<string, number[]> = {
  GK: [24, 6, 17],
  LCB: [4, 1, 23, 10],
  RCB: [21, 10, 13, 26],
  CB: [4, 21, 10, 1, 23],
  LB: [23, 1, 9],
  RB: [5, 21, 26],
  LWB: [23, 1, 9],
  RWB: [5, 21, 26],
  LCM: [11, 16, 8, 26, 13],
  CM: [11, 8, 18, 16, 13],
  RCM: [8, 18, 13, 26, 22, 16],
  CAM: [16, 12, 20, 13],
  LM: [7, 14, 12],
  RM: [15, 19, 7],
  LW: [7, 14, 12, 3],
  RW: [15, 19, 7, 14],
  ST: [3, 15, 25, 2, 20],
};

function getPriority(playerId: number, pos: string) {
  const list = rolePriority[pos];
  if (!list) return 999;
  const idx = list.indexOf(playerId);
  return idx === -1 ? 999 : idx;
}

export default function Home() {
  const [formationName, setFormationName] =
    useState<keyof typeof formations>("4-3-3");

  const formation = formations[formationName];

  const [squad, setSquad] = useState<(Player | null)[]>(Array(11).fill(null));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Bungee&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const placePlayer = (player: Player) => {
    if (selectedSlot === null) return;

    const copy = [...squad];
    copy[selectedSlot] = player;
    setSquad(copy);
    setSelectedSlot(null);
  };

  const selectedPosition =
    selectedSlot !== null
      ? formation.positions[selectedSlot]
      : null;

  const sortedPlayers = selectedPosition
    ? [...players].sort(
        (a, b) =>
          getPriority(a.id, selectedPosition) -
          getPriority(b.id, selectedPosition)
      )
    : players;

  const PlayerCard = ({ p }: { p: Player }) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        onClick={() => placePlayer(p)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...styles.card,
          transform: hover ? "scale(1.05)" : "scale(1)",
          boxShadow: hover
            ? "0 10px 25px rgba(255,140,0,0.4)"
            : "none",
        }}
      >
        <img src={p.image} style={styles.cardImg} />
        <div style={styles.cardOverlay} />
        <div style={styles.cardName}>{p.name}</div>
      </div>
    );
  };

  const FieldSlot = ({ i }: { i: number }) => {
    const [hover, setHover] = useState(false);

    return (
      <div
        onClick={() => setSelectedSlot(i)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...styles.slot,
          transform: hover ? "scale(1.06)" : "scale(1)",
          boxShadow: hover
            ? "0 0 18px rgba(255,140,0,0.55)"
            : "none",
        }}
      >
        {squad[i] ? (
          <div style={styles.playerWrap}>
            <img src={squad[i]!.image} style={styles.img} />
            <div style={styles.overlay} />
            <div style={styles.name}>{squad[i]!.name}</div>
          </div>
        ) : (
          formation.positions[i]
        )}
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚽ Squad Builder</h1>

      <div style={styles.formationBar}>
        {Object.keys(formations).map((f) => (
          <button
            key={f}
            onClick={() =>
              setFormationName(f as keyof typeof formations)
            }
            style={{
              ...styles.formationButton,
              background:
                formationName === f
                  ? "#ff8c00"
                  : "rgba(255,255,255,0.1)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={styles.layout}>
        <div style={styles.field}>
          <div style={styles.fieldTexture} />
          <div style={styles.fieldGlow} />

          <div style={styles.pitch}>
            {formation.rows.map((row, idx) => (
              <div key={idx} style={styles.row}>
                {row.map((i) => (
                  <FieldSlot key={i} i={i} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.panel}>
          {selectedSlot !== null ? (
            sortedPlayers.map((p) => (
              <PlayerCard key={p.id} p={p} />
            ))
          ) : (
            <p style={{ opacity: 0.6 }}>
              Klik op een positie
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    padding: 20,
    color: "white",
    fontFamily: "'Bungee', sans-serif",
  },

  title: {
    marginBottom: 10,
  },

  formationBar: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
  },

  formationButton: {
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    color: "white",
    cursor: "pointer",
    fontFamily: "'Bungee', sans-serif",
    transition: "0.2s",
  },

  layout: {
    display: "flex",
    gap: 20,
  },

  field: {
    flex: 1,
    height: 650,
    borderRadius: 20,
    position: "relative",
    padding: 10,
    background: "linear-gradient(145deg, #ff9a3c, #d35400)",
    overflow: "hidden",
  },

  fieldTexture: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 6px)",
    opacity: 0.25,
    pointerEvents: "none",
  },

  fieldGlow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at center, rgba(255,255,255,0.18), transparent 60%)",
    pointerEvents: "none",
  },

  pitch: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 6,
  },

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
  },

  slot: {
    width: 115,
    height: 140,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    transition: "0.25s",
  },

  playerWrap: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 15%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
  },

  name: {
    position: "absolute",
    bottom: 6,
    width: "100%",
    textAlign: "center",
    fontSize: 11,
    fontWeight: 700,
    textShadow: "0 2px 6px rgba(0,0,0,0.9)",
    fontFamily: "'Bungee', sans-serif",
    lineHeight: 1.2,
    padding: "0 4px",
  },

  panel: {
    width: 320,
    height: 650,
    background: "#111827",
    padding: 12,
    borderRadius: 12,
    overflowY: "auto",
  },

  card: {
    position: "relative",
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
    cursor: "pointer",
    transition: "0.2s",
  },

  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 15%",
  },

  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
  },

  cardName: {
    position: "absolute",
    bottom: 6,
    width: "100%",
    textAlign: "center",
    fontSize: 10,
    fontWeight: 700,
    textShadow: "0 2px 6px rgba(0,0,0,0.9)",
    fontFamily: "'Bungee', sans-serif",
    lineHeight: 1.2,
    padding: "0 4px",
  },
};