import { getAuthHeaders } from "../helpers/getAuthHeaders";

export async function getProfile() {
  const res = await fetch("/api/account/profile", {
    headers: getAuthHeaders()
  });

  return res.json();
}

export async function updateProfile(form: any) {
  await fetch("/api/account/profile", {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(form)
  });
}