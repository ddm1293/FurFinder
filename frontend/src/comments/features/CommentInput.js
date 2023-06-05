import {useState} from "react";
import {useDispatch} from "react-redux";
import {addComment} from "./commentSlice";
import {Input, Button} from "antd";

const {TextArea} = Input;

function CommentInput() {
    const [comment, setComment] = useState("");
    const isEmptyComment = comment.length === 0; // disable button when no comment
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setComment(event.target.value)
    };
    const handleClick = () => {
        dispatch(addComment(comment))
        setComment(""); // clear input
    }

    return (
        <div className="comment-input">
            <TextArea className="comment-text" rows={4} placeholder="Leave your comment" value={comment}
                      onChange={handleChange}/>
            <Button className="comment-button" type="primary" onClick={handleClick}
                    disabled={isEmptyComment}>Comment</Button>
        </div>
    );
}

export default CommentInput;