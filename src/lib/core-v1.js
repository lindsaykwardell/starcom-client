export const POLITICS = "Politics";
export const INDUSTRY = "Industry";
export const SCIENCE = "Science";

export const DOMAINS = [POLITICS, INDUSTRY, SCIENCE];

export const SHIP = "Ship";
export const FIGHTER = "Fighter";
export const STATION = "Station";
export const SYSTEM = "System";
export const CAPITAL_SYSTEM = "Capital System";
export const START_SYSTEM = "Starting System";
export const COMMAND = "Command";
export const MANEUVER = "Maneuver";
export const TECHNOLOGY = "Technology";

export const CARD_TYPES = [
  SHIP,
  FIGHTER,
  STATION,
  SYSTEM,
  COMMAND,
  MANEUVER,
  TECHNOLOGY,
];

export const DAMAGEABLE = [
  SHIP,
  FIGHTER,
  STATION
]

const SYSTEM_CONTEXT_MENU = [
  {
    action: "develop",
    label: "Build Development",
  },
];

const DAMAGE_CONTEXT_MENU = [
  {
    action: "damage:1",
    label: "Add 1 damage"
  },
  {
    action: "damage:2",
    label: "Add 2 damage"
  },
  {
    action: "damage:3",
    label: "Add 3 damage"
  },
  {
    action: "repair:1",
    label: "Repair 1 damage"
  },
  {
    action: "destroy",
    label: "Destroy this"
  }
]

export const CARD_LIST = [
  {
    id: 1,
    img: "Advanced_Fighters",
    type: TECHNOLOGY,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 2,
    img: "Advanced_Shields",
    type: TECHNOLOGY,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 3,
    contextMenu: [],
  },
  {
    id: 3,
    img: "Advanced_Weapons",
    type: TECHNOLOGY,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 3,
    contextMenu: [],
  },
  {
    id: 4,
    img: "Alien_World",
    type: SYSTEM,
    domain: SCIENCE,
    deck: SYSTEM,
    count: 3,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 4,
  },
  {
    id: 5,
    img: "Applied_Learning",
    type: TECHNOLOGY,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 3,
    contextMenu: [],
  },
  {
    id: 6,
    img: "Asteroid_Field",
    type: SYSTEM,
    domain: INDUSTRY,
    deck: SYSTEM,
    count: 3,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 1,
  },
  {
    id: 7,
    img: "Barrage",
    type: COMMAND,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 3,
    contextMenu: [],
  },
  {
    id: 8,
    img: "Battlecruiser",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 9,
    img: "Black_Hole",
    type: SYSTEM,
    domain: SCIENCE,
    deck: SYSTEM,
    count: 1,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 2,
  },
  {
    id: 10,
    img: "Bribery",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 11,
    img: "Carrier",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 12,
    img: "Ceasefire",
    type: MANEUVER,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 13,
    img: "Citation",
    type: MANEUVER,
    domain: POLITICS,
    deck: POLITICS,
    count: 4,
    contextMenu: [],
  },
  {
    id: 14,
    img: "Close_Borders",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 2,
    contextMenu: [],
  },
  {
    id: 15,
    img: "Corvette",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 16,
    img: "Damage_Control",
    type: MANEUVER,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 3,
    contextMenu: [],
  },
  {
    id: 17,
    img: "Defense_Station",
    type: STATION,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 18,
    img: "Destroyer",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 19,
    img: "Dreadnought",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 20,
    img: "Drummond",
    type: CAPITAL_SYSTEM,
    domain: SCIENCE,
    deck: SYSTEM,
    count: 1,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 6,
  },
  {
    id: 21,
    img: "Empty_System",
    type: SYSTEM,
    domain: null,
    deck: SYSTEM,
    count: 3,
    contextMenu: [],
    developmentLevel: 0,
    maxDevelopmentLevel: 0,
  },
  {
    id: 22,
    img: "Enhanced_Defenses",
    type: TECHNOLOGY,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 23,
    img: "Evasion",
    type: MANEUVER,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 4,
    contextMenu: [],
  },
  {
    id: 24,
    img: "Fighter_Bays",
    type: TECHNOLOGY,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 25,
    img: "Filibuster",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 2,
    contextMenu: [],
  },
  {
    id: 26,
    img: "Forsei",
    type: CAPITAL_SYSTEM,
    domain: INDUSTRY,
    deck: SYSTEM,
    count: 1,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 6,
  },
  {
    id: 27,
    img: "Forum",
    type: TECHNOLOGY,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 4,
    contextMenu: [],
  },
  {
    id: 28,
    img: "Frigate",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 29,
    img: "Harvest_the_Remains",
    type: COMMAND,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 4,
    contextMenu: [],
  },
  {
    id: 30,
    img: "Homeworld",
    type: START_SYSTEM,
    domain: null,
    deck: null,
    contextMenu: [
      ...SYSTEM_CONTEXT_MENU,
      {
        action: "build:15",
        label: "Build Corvette",
      },
      {
        action: "build:18",
        label: "Build Destroyer",
      },
      {
        action: "build:28",
        label: "Build Frigate",
      },
      {
        action: "build:8",
        label: "Build Battlecruiser",
      },
      {
        action: "build:41",
        label: "Build Missile Cruiser",
      },
      {
        action: "build:11",
        label: "Build Carrier",
      },
      {
        action: "build:19",
        label: "Build Dreadnought",
      },
    ],
    developmentLevel: 1,
    maxDevelopmentLevel: 6,
  },
  {
    id: 31,
    img: "Illusory_Defeat",
    type: MANEUVER,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 2,
    contextMenu: [],
  },
  {
    id: 32,
    img: "Industrial_Theory",
    type: TECHNOLOGY,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 3,
    contextMenu: [],
  },
  {
    id: 33,
    img: "Inspiration",
    type: COMMAND,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 4,
    contextMenu: [],
  },
  {
    id: 34,
    img: "Intercept_Orders",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 3,
    contextMenu: [],
  },
  {
    id: 35,
    img: "Interdiction",
    type: COMMAND,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 2,
    contextMenu: [],
  },
  {
    id: 36,
    img: "Jump_Stabilization",
    type: COMMAND,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 2,
    contextMenu: [],
  },
  {
    id: 37,
    img: "Logistics_Computers",
    type: TECHNOLOGY,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 2,
    contextMenu: [],
  },
  {
    id: 38,
    img: "Machine_Learning",
    type: TECHNOLOGY,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 2,
    contextMenu: [],
  },
  {
    id: 39,
    img: "Maximum_Firepower",
    type: MANEUVER,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 4,
    contextMenu: [],
  },
  {
    id: 40,
    img: "Military_Outpost",
    type: SYSTEM,
    domain: POLITICS,
    deck: SYSTEM,
    count: 2,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 3,
  },
  {
    id: 41,
    img: "Missile_Cruiser",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 42,
    img: "Missile_Platform",
    type: STATION,
    domain: POLITICS,
    deck: POLITICS,
    count: 4,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 43,
    img: "New_Colony",
    type: SYSTEM,
    domain: POLITICS,
    deck: SYSTEM,
    count: 3,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 3,
  },
  {
    id: 44,
    img: "Observatory",
    type: STATION,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 3,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 45,
    img: "Orbital_Hangar",
    type: STATION,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 46,
    img: "Production_Lines",
    type: COMMAND,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 2,
    contextMenu: [],
  },
  {
    id: 47,
    img: "Production_World",
    type: SYSTEM,
    domain: INDUSTRY,
    deck: SYSTEM,
    count: 2,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 4,
  },
  {
    id: 48,
    img: "Pulsar_System",
    type: SYSTEM,
    domain: INDUSTRY,
    deck: SYSTEM,
    count: 1,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 2,
  },
  {
    id: 49,
    img: "Raise_Shields",
    type: MANEUVER,
    domain: SCIENCE,
    deck: SCIENCE,
    count: 4,
    contextMenu: [],
  },
  {
    id: 50,
    img: "Ram",
    type: MANEUVER,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 4,
    contextMenu: [],
  },
  {
    id: 51,
    img: "Refinery",
    type: STATION,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 4,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 52,
    img: "Repair_Crews",
    type: COMMAND,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 4,
    contextMenu: [],
  },
  {
    id: 53,
    img: "Research_World",
    type: SYSTEM,
    domain: SCIENCE,
    deck: SYSTEM,
    count: 2,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 4,
  },
  {
    id: 54,
    img: "Sabotage",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 4,
    contextMenu: [],
  },
  {
    id: 55,
    img: "Salvage_Operations",
    type: TECHNOLOGY,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 4,
    contextMenu: [],
  },
  {
    id: 56,
    img: "Sanctions",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 2,
    contextMenu: [],
  },
  {
    id: 57,
    img: "Scout",
    type: SHIP,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 58,
    img: "Silis_Major",
    type: CAPITAL_SYSTEM,
    domain: POLITICS,
    deck: SYSTEM,
    count: 1,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 6,
  },
  {
    id: 59,
    img: "Spy_Network",
    type: COMMAND,
    domain: POLITICS,
    deck: POLITICS,
    count: 4,
    contextMenu: [],
  },
  {
    id: 60,
    img: "Strike_Fighter",
    type: FIGHTER,
    domain: null,
    deck: null,
    damage: 0,
    contextMenu: [...DAMAGE_CONTEXT_MENU],
  },
  {
    id: 61,
    img: "Strip_Mining",
    type: COMMAND,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 2,
    contextMenu: [],
  },
  {
    id: 62,
    img: "Targeting_Systems",
    type: TECHNOLOGY,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 3,
    contextMenu: [],
  },
  {
    id: 63,
    img: "Trade_Routes",
    type: TECHNOLOGY,
    domain: INDUSTRY,
    deck: INDUSTRY,
    count: 2,
    contextMenu: [],
  },
  {
    id: 64,
    img: "Trade_World",
    type: SYSTEM,
    domain: POLITICS,
    deck: SYSTEM,
    count: 2,
    contextMenu: [...SYSTEM_CONTEXT_MENU],
    developmentLevel: 0,
    maxDevelopmentLevel: 4,
  },
];

export const randomCard = () => {
  return CARD_LIST[Math.floor(Math.random() * CARD_LIST.length)];
};

export const HOMEWORLD = CARD_LIST.find((card) => card.img === "Homeworld");

export const DECK_POLITICS = CARD_LIST.filter(
  (card) => card.deck === POLITICS
).reduce((deck, card) => {
  const list = [...deck];
  for (let i = 0; i < card.count; i++) {
    list.push({ ...card });
  }
  return list;
}, []);

export const DECK_INDUSTRY = CARD_LIST.filter(
  (card) => card.deck === INDUSTRY
).reduce((deck, card) => {
  const list = [...deck];
  for (let i = 0; i < card.count; i++) {
    list.push({ ...card });
  }
  return list;
}, []);

export const DECK_SCIENCE = CARD_LIST.filter(
  (card) => card.deck === SCIENCE
).reduce((deck, card) => {
  const list = [...deck];
  for (let i = 0; i < card.count; i++) {
    list.push({ ...card });
  }
  return list;
}, []);

export const DECK_SYSTEM = CARD_LIST.filter(
  (card) => card.deck === SYSTEM
).reduce((deck, card) => {
  const list = [...deck];
  for (let i = 0; i < card.count; i++) {
    list.push({ ...card });
  }
  return list;
}, []);
