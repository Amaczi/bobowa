export function dangerousData(string) {
  return encodeURIComponent(string);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
