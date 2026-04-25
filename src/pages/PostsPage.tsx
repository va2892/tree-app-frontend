import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPosts } from "../api/postApi";
import { getPostComments, addComment } from "../api/commentApi";
import { useAuth } from "../hooks/useAuth";
import CommentNode from "../components/CommentNode";

export default function PostsPage() {
  const [openedPosts, setOpenedPosts] = useState<Record<string, boolean>>({});
  const [commentsMap, setCommentsMap] = useState<Record<string, any[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useAuth();

  const loadComments = async (postId: string) => {
    const data = await getPostComments(postId);

    setCommentsMap(prev => ({
      ...prev,
      [postId]: data
    }));
  };

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link style={{ padding: 10 }} to="/profile"><button>Profile</button></Link>
      </header>
      <h1 style={{ marginLeft: "auto" }}>Posts</h1>
      {posts.map(p => (
        <div key={p.id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>

          <button onClick={async () => {
            const isOpen = openedPosts[p.id];

            if (!isOpen) {
              await loadComments(p.id);
            }

            setOpenedPosts(prev => ({
              ...prev,
              [p.id]: !isOpen
            }));
          }}>
            {openedPosts[p.id] ? "Hide Comments" : "Open Comments"}
          </button>

          {openedPosts[p.id] && (
            <div style={{ marginTop: 20 }}>
              <h4>Comments</h4>

              <div style={{ marginBottom: 10 }}>
                <input
                  placeholder="Write comment..."
                  value={commentInputs[p.id] || ""}
                  onChange={(e) =>
                    setCommentInputs(prev => ({
                      ...prev,
                      [p.id]: e.target.value
                    }))
                  }
                />

                <button
                  onClick={async () => {
                    const text = commentInputs[p.id];

                    if (!text || text.trim().length === 0) {
                      alert("Комментарий не может быть пустым");
                      return;
                    }

                    await addComment(p.id, text, null);

                    setCommentInputs(prev => ({
                      ...prev,
                      [p.id]: ""
                    }));

                    loadComments(p.id);
                  }}
                >
                  Add comment
                </button>
              </div>

              {commentsMap[p.id]?.map(node => (
                <CommentNode
                  key={node.id}
                  node={node}
                  reload={() => loadComments(p.id)}
                  postId={p.id}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}