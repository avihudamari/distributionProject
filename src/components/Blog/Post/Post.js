import "./Post.module.css";
import { format } from "timeago.js";

export default function Post(props) {
    console.log(props.post.text);
  return ( 
    <div className="message own" style={{paddingRight: '20px'}} >
     {/* <div className="post"> */}
      <div className="messageTop">
        {/* <img
          className="messageImg"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        /> */}
        <p className="messageText" style={{textAlign: 'right', fontSize: 'larger', backgroundColor: 'thistle', borderRadius: '7px'}}>{props.post.text}</p>
      </div>
      <div className="messageBottom">{props.post.createdAt}</div>
    </div>
  );
}