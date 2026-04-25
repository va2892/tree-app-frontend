export async function loginApi(email: string, password: string) {
  const res = await fetch("/api/account/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json();
}