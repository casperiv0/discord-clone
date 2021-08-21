export function getGuildInitials(name: string) {
  const [firstWord, secondWord] = name.split(" ");

  return `${firstWord?.charAt(0)}${secondWord?.charAt(0) ?? ""}`;
}
