export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9.-]/g, "") // Keep letters, numbers, dots, and hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/\.+/g, ".") // Replace multiple dots with single dot
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .replace(/^\.|\.$/g, ""); // Remove leading/trailing dots
}

export function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

export function findEventBySlug<T extends { title: string }>(
  events: T[],
  slug: string
): T | undefined {
  const title = slugToTitle(slug);
  return events.find(
    (event) => event.title.toLowerCase() === title.toLowerCase()
  );
}

export function isValidEventSlug<T extends { title: string }>(
  events: T[],
  slug: string
): boolean {
  return findEventBySlug(events, slug) !== undefined;
}
