import { useEffect, useState } from "react";
import { addComment, deleteComment, editComment, getCommentTree } from "../api/commentApi";

export default function CommentNode({ node, reload, postId }: any) {
  const [text, setText] = useState(node.content);
  const [originalText, setOriginalText] = useState(node.content);
  const [children, setChildren] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const loadChildren = async () => {
    const data = await getCommentTree(node.id);
    setChildren(data);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    loadChildren();
  }, [node.id]);

  const add = async () => {
    await addComment(postId, "New comment", node.id);
    await loadChildren(); 
  };
  
  const remove = async () => {
    await deleteComment(node.id);
    reload(); 
  };
  
  const edit = async () => {
    await editComment(node.id, text);
    reload(); 
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