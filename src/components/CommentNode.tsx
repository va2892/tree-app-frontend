import { useEffect, useState } from "react";

export default function CommentNode({ node, reload, postId }: any) {
  const [text, setText] = useState(node.content);
  const [originalText, setOriginalText] = useState(node.content);
  const [children, setChildren] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const loadChildren = async () => {
    const res = await fetch(`/api/comment/${node.id}/tree`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setChildren(data);
    console.log(text, data)
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadChildren();
  }, [node.id]);

  const add = async () => {
    await fetch(`/api/post/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ content: "New comment", parentId: node.id }),
    });
    reload();
    loadChildren();
  };

  const remove = async () => {
    await fetch(`/api/comment/${node.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    if (children.length > 0) {
      setText(null);
    }
    reload();
  };

  const edit = async () => {
    if (text && !(text.trim().length === 0)) {
      await fetch(`/api/comment/${node.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ content: text }),
      });
      reload();
    } else {
      alert('Комментарий не может быть пустым')
    }
  };

  return (
    <div style={{ 
      marginLeft: 20, 
      borderLeft: "1px solid gray", 
      paddingLeft: 10, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
    }}>
      {(!originalText || originalText.trim().length === 0) && (
        <div>
          <input value='[comment deleted]' disabled />
        </div>
      )}
      {(originalText && !(originalText.trim().length === 0)) && (
        <div>
          <input value={text} onChange={e => setText(e.target.value)} />
  
          <button onClick={add}>Add</button>
          <button onClick={edit}>Edit</button>
          <button onClick={remove}>Delete</button>
        </div>
      )}
      

      {children?.map((child: any) => (
        <CommentNode
          key={child.id}
          node={child}
          reload={loadChildren}
          postId={postId}
        />
      ))}
    </div>
  );
}