export const apiConnect = async (
  target: string
): Promise<{ posts: object; maxPages: number }> => {
  const response = await fetch(target, {
    method: "GET",
    headers: {},
  });
  const posts: object = await response.json();
  const maxPages: number = Number(response.headers.get("X-WP-TotalPages"));
  return { posts, maxPages };
};
