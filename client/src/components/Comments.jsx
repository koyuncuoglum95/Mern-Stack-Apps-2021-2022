import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import {commentStart, commentSuccess, commentFailure} from '../redux/commentSlice'

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 40px;
`;

const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [ desc, setDesc ] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const addComment = async () => {
    dispatch(commentStart());
    try {
      const res = axios.post('/comments',{ desc, videoId});
      dispatch(commentSuccess(res.data));
    } catch (error) {
      dispatch(commentFailure());
    }
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." onChange={(e) => setDesc(e.target.value)}/>
        <Button onClick={addComment}>Comment</Button>
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
