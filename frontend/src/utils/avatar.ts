// utils/avatar.ts
export function getInitials(text: string = ""): string {
  if (!text) return "U";

  const parts = text.trim().split(" ");

  if (parts.length === 1) {
    return parts[0]!.charAt(0).toUpperCase(); // Developer → D
  }

  return (parts[0]![0]! + parts[1]![0]).toUpperCase(); // Scrum Master → SM
}

// stable random color generator
export function getRandomColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`; // vibrant & readable
}
