import { getAuthHeaders } from "../helpers/getAuthHeaders";

export async function getPostComments(postId: string) {
  const res = await fetch(`/api/post/${postId}/comments`);
  return res.json();
}

export async function addComment(postId: string, content: string, parentId: string | null) {
  await fetch(`/api/post/${postId}/comment`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content, parentId })
  });
}

export async function deleteComment(id: string) {
  await fetch(`/api/comment/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
}

export async function editComment(id: string, content: string) {
  await fetch(`/api/comment/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content })
  });
}

export async function getCommentTree(id: string) {
  const res = await fetch(`/api/comment/${id}/tree`, {
    headers: getAuthHeaders()
  });
  return res.json();
}