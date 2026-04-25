export async function getPosts() {
  const res = await fetch("/api/post?Size=10");
  const data = await res.json();
  return data.posts;
}