export function getRankByLevel(level: number): string {
  const ranks = [
    "Beginner",
    "Novice",
    "Apprentice",
    "Junior",
    "Adept",
    "Skilled",
    "Expert",
    "Veteran",
    "Master",
    "Grandmaster",
    "Elite",
    "Champion",
    "Hero",
    "Legend",
    "Mythic",
    "Immortal",
    "Divine",
    "Celestial",
    "Eternal",
    "Supreme",
  ];

  // Calculate index based on level
  const index = Math.min(Math.floor((level - 1) / 10), ranks.length - 1);
  return ranks[index];
}
