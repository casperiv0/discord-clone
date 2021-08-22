export function classes(...classes: (boolean | string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
