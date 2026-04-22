import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CommentNode from "../components/CommentNode";

export default function TreePage() {
  const { id } = useParams();
  const [tree, setTree] = useState<any[]>([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const loadTree = () => {
    fetch(`/api/post/${id}/comments`)
      .then(res => res.json())
      .then(data => setTree(data));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    loadTree();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start'
      }}>
        <div style={{
          width: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center'
        }}>
          <h1>Comments Tree</h1>
          <button onClick={loadTree}>Reset</button>
        </div>
        
        <br/><br/>

        {tree.map(node => (
          <CommentNode key={node.id} node={node} reload={loadTree} postId={id!} />
        ))}
      </div>
  
      <br/><br/>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write comment..."
        />
  
        <button
          onClick={async () => {
            if (text && !(text.trim().length === 0)) {
              await fetch(`/api/post/${id}/comment`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                  content: text,
                  parentId: null,
                }),
              });
    
              setText("");
              loadTree();
            } else {
              alert('Комментарий не может быть пустым')
            }
          }}
        >
          Add comment
        </button>
      </div>
    </div>
  );
}