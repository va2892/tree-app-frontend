import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/post?Size=10")
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(p => (
        <div key={p.id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <button onClick={() => navigate(`/post/${p.id}`)}>
            Open Tree
          </button>
        </div>
      ))}
    </div>
  );
}