import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, addComment, editComment } from '../features/comments/commentsSlice';
import { fetchComments, postComment, updateComment } from '../services/commentAPI';

const CommentSection = ({ recipeId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchComments(recipeId).then((data) => dispatch(setComments(data)));
  }, [recipeId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const updated = await updateComment(editId, { text });
      dispatch(editComment(updated));
      setEditId(null);
    } else {
      const newComment = await postComment(recipeId, { text });
      dispatch(addComment(newComment));
    }
    setText('');
  };

  const handleEdit = (comment) => {
    setEditId(comment._id);
    setText(comment.text);
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Update' : 'Post'}</button>
      </form>

      {comments.map((c) => (
        <div key={c._id} className="comment-box">
          <p>{c.text}</p>
          <button onClick={() => handleEdit(c)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
