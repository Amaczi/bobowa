export const apiConnect = async (target) => {
  const response = await fetch(target, {
    method: "GET",
    headers: {},
  });
  const posts = await response.json();
  const maxPages = response.headers.get("X-WP-TotalPages");
  return { posts, maxPages };
};
