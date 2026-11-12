// Shared quote options — used by the full /quote wizard and the home quick-quote.

export const LOADS = [
  { v: "20 ft container", hint: "Up to ~28 m³" },
  { v: "40 ft container", hint: "Up to ~58 m³" },
  { v: "Pallet", hint: "One or a few pallets" },
  { v: "Loose cargo", hint: "Boxes, cartons, LCL" },
];

export const DESTINATIONS = [
  { v: "Los Angeles", transit: "26–32 days" },
  { v: "Houston", transit: "30–36 days" },
  { v: "New York", transit: "32–38 days" },
  { v: "West Virginia", transit: "34–40 days" },
];

export const CARGO_SUGGESTIONS = ["Apparel", "Tea & spices", "FMCG", "Machinery", "Furniture"];

// Phrased to complete "…ready by ___."
export const READY = ["next week", "the end of the month", "next month", "a flexible date"];

export const SERVICES = [
  { v: "Ocean freight", hint: "FCL & LCL sailings" },
  { v: "Air freight", hint: "When time is critical" },
  { v: "Customs brokerage", hint: "We clear it at the US port" },
  { v: "Warehousing", hint: "Our own US warehouses" },
  { v: "Final-mile trucking", hint: "To the buyer's door" },
  { v: "Project cargo", hint: "Oversized & heavy-lift" },
];

export const WHATSAPP = "94112307748";
export const SALES_EMAIL = "info.sl@cargoworldwideinc.com";

export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
