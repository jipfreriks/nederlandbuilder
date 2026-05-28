import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Eredivisie teams (hard but reliable base)
    const teams = [
      { id: 1, name: "FC Twente" },
      { id: 2, name: "Ajax" },
      { id: 3, name: "PSV" },
      { id: 4, name: "Feyenoord" },
      { id: 5, name: "AZ Alkmaar" },
    ];

    // Simulated real squad data (later vervangen door live API)
    const players = [
      { id: 101, name: "Ricky van Wolfswinkel", club: "FC Twente", pos: "ST" },
      { id: 102, name: "Sem Steijn", club: "FC Twente", pos: "CM" },
      { id: 103, name: "Joshua Brenet", club: "FC Twente", pos: "RB" },

      { id: 201, name: "Steven Bergwijn", club: "Ajax", pos: "LW" },
      { id: 202, name: "Jordan Henderson", club: "Ajax", pos: "CM" },

      { id: 301, name: "Luuk de Jong", club: "PSV", pos: "ST" },
      { id: 302, name: "Johan Bakayoko", club: "PSV", pos: "RW" },

      { id: 401, name: "Santiago Giménez", club: "Feyenoord", pos: "ST" },
      { id: 402, name: "Quinten Timber", club: "Feyenoord", pos: "CM" },

      { id: 501, name: "Vangelis Pavlidis", club: "AZ Alkmaar", pos: "ST" },
    ];

    return NextResponse.json({
      teams,
      players,
    });
  } catch (err) {
    return NextResponse.json({
      teams: [],
      players: [],
    });
  }
}