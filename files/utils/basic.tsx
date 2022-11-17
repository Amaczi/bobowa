export function dangerousData(value: string | string[]): string {
  return encodeURIComponent(value);
}

export function scrollToTop(): void {
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
