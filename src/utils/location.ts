// Where a page sits on the site, for the location bar under the header:
// Driver Categories › Cameras › ZWO › ASI Cameras
import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { CATEGORIES } from "../config/categories";
import { slugify } from "./slugify";

export interface Crumb { label: string; href?: string }

const DOCS = path.resolve(process.cwd(), "src/content/docs");

// Manufacturer slug -> display name, from manufacturer_name in the drivers' YAML files
let manufacturers: Map<string, string> | undefined;
function manufacturerName(slug: string): string {
  if (!manufacturers) {
    manufacturers = new Map();
    for (const category of readdirSync(DOCS)) {
      const categoryDir = path.join(DOCS, category);
      for (const maker of readdirSync(categoryDir, { withFileTypes: true })) {
        if (!maker.isDirectory() || manufacturers.has(slugify(maker.name))) continue;
        for (const driver of readdirSync(path.join(categoryDir, maker.name))) {
          const file = path.join(categoryDir, maker.name, driver, `${driver}.yaml`);
          if (!existsSync(file)) continue;
          const info = yaml.load(readFileSync(file, "utf8")) as Record<string, unknown> | undefined;
          if (typeof info?.manufacturer_name === "string") {
            manufacturers.set(slugify(maker.name), info.manufacturer_name);
            break;
          }
        }
      }
    }
  }
  return manufacturers.get(slug) ?? slug;
}

const categoryName = (slug: string) => CATEGORIES[slug as keyof typeof CATEGORIES] ?? slug;

/** The trail for a page. The last crumb is the page itself and has no link. */
export function locationOf(pathname: string, title: string): Crumb[] {
  const parts = pathname.split("/").filter(Boolean);
  const home: Crumb = { label: "Driver Categories", href: "/" };
  if (parts.length === 0) return [{ label: home.label }];
  if (!(parts[0] in CATEGORIES)) return [home, { label: title }];

  const [category, maker] = parts;
  const trail: Crumb[] = [home, { label: categoryName(category), href: `/${category}/` }];
  if (maker) trail.push({ label: manufacturerName(maker), href: `/${category}/${maker}/` });
  if (parts.length > 2) trail.push({ label: title });
  delete trail[trail.length - 1].href;
  return trail;
}
