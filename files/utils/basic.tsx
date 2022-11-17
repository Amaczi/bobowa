export function dangerousData(value: any): string {
  return encodeURIComponent(value);
}

export function scrollToTop(): void {
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
