import React,{useState,useRef} from 'react';
import { Typography,TextField,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles.js";
import {commentPost} from "../../actions/posts";

const CommentSection = ({post}) => {
    const commentRef = useRef();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment,setComment] = useState('');
    const [comments,setComments] = useState(post?.comments);
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalcomment = `${user.result.name} : ${comment}`;
        const newComments = await dispatch(commentPost(finalcomment,post._id));
        setComments(newComments);
        setComment('');
        commentRef.current.scrollIntoView({behaviour:'smooth'});
    }
    return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer} >
                <Typography variant="h6" gutterBottom>Comments</Typography>
                {comments.map((c,i)=>(
                    <Typography key={i} gutterBottom variant="subtitle1" >
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                        </Typography>
                ))}
                <div ref={commentRef} />
            </div>
            {user?.result?.name &&(
            <div style={{width:"70%"}} >
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField 
                    fullWidth 
                    rows={4} 
                    label="Comment" 
                    variant="outlined"  
                    multiline 
                    value={comment} 
                    onChange={(e)=>setComment(e.target.value)}/>
                    <Button style={{marginTop:"10px"}}
                    fullWidth
                    disabled={!comment}
                    variant="contained"
                    onClick={handleClick}
                    color="primary"
                    >
                        Comment
                    </Button>
            </div>)}
        </div>
    </div>
  )
}

export default CommentSection