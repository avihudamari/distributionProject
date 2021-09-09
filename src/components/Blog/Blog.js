import "./Blog.module.css";
import Post from "./Post/Post";
import { Component, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

class Blog extends Component {

    state = {
        newMessage: '',
        posts: [
            {
                text:
                    'חברים יקרים! \
                    בשבוע הבא תתקיים הרמת כוסית לקראת ראש השנה. \
                    האירוע יכובד בנוכחות ראש העיר, ושר העבודה והרווחה. \
                    אנא עשו מאמץ להגיע לאירוע בזמן. \
                    (לו"ז מדויק יפורסם בהמשך). \
                    *הגעה בלבוש הולם \
                    בתודה והערכה גדולה - \
                    אביהוא, אביחי ויוסי'
                ,
                createdAt: new Date('2021-09-02T12:31:59.401+00:00').toLocaleDateString()
            },
            {
                text:  
                    'מחלקים ומתנדבים יקרים! \
                    לקראת החגים בשבוע הבא אנחנו נערכים בכוחות מתוגברים. מי מכם שיכול להביא את חבריו, אחיו, מכריו או כל אחד לסייע - נשמח ביותר! \
                    בתודה ובהערכה - \
                    אביהוא, אביחי ויוסי' 
                ,
                createdAt: new Date('2021-09-01T14:31:59.401+00:00').toLocaleDateString()
            },
            {
                text:
                    'חברים יקרים! \
                    תודה רבה לכל מי שהגיע אתמול לחלוקה, אנחנו ממש שמחים לראות את ההיענות הרבה. \
                    בע"ה בשבוע הבא נמשיך בחלוקה מאיפה שסיימנו, יש עוד משפחות שזקוקות לנו.  \
                    בהערכה גדולה - אביהוא, אביחי ויוסי'
                ,
                createdAt: new Date('2021-08-30T14:31:59.401+00:00').toLocaleDateString()
            },
            {
                text: 
                'חברים יקרים!  \
                שוב- מזכירים שנפגשים מחר לחלוקה, הפעם ממש מדובר בהצלת נפשות!  \
                חלוקת תרופות למבודדים, מדובר בתרופות חיוניות ביותר, ואנחנו נקראנו לסייע בעניין.  \
                אישור מעבר חיוני יונפק לכל אחד ואחת.  \
                נא להשתבץ בהקדם! \
                תודה רבה!! \
                אביהוא, אביחי ויוסי',
                createdAt: new Date('2021-08-27T14:31:59.401+00:00').toLocaleDateString()
            },
            {
                text:
                'חברים יקרים! \
                תודה רבה לכל מי שהגיע אתמול לחלוקה, אנחנו ממש שמחים לראות את ההיענות הרבה. \
                בע"ה בשבוע הבא נמשיך בחלוקה מאיפה שסיימנו, יש עוד משפחות שזקוקות לנו.  \
                 בהערכה גדולה - אביהוא, אביחי ויוסי',
                createdAt: new Date('2021-08-25T14:31:59.401+00:00').toLocaleDateString()
            }
        ]
    }

    handleChangeMessage = () => {

    }

    handlePostSubmit = () => {

    }

    // constructor(props) {
    //     super(props);
    //     this.scrollRef = React.createRef();     
    // }

    render() {
        return (
            <div className="messenger">
                <div className="chatBox">
                    <div className="chatBoxWrapper" style={{alignItems:'center'}}>
                        {
                        this.state.posts.lengh == 0 ? (
                            <span className="noConversationText">
                                אין עדיין פוסטים
                            </span>
                        ):
                            <div style={{ overflowY: "scroll", width: "100%"}}>
                            {/* <div className="chatBoxTop"> */}
                            {this.state.posts.map((p) => (
                                <div>
                                    <Post post={p}/>
                                </div>
                            ))}
                            </div>
                        }
                            <div className="chatBoxBottom" style={{width: '80%'}}>
                            <textarea
                                className="chatMessageInput"
                                placeholder="כתוב משהו..."
                                onChange={(e) => this.handleChangeMessage(e.target.value)}
                                value={this.state.newMessage}
                            ></textarea>
                            <button className="chatSubmitButton" onClick={this.handlePostSubmit}>
                                פרסם
                            </button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

// function Messenger() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [currentChat, setCurrentChat] = useState(null);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <div className="messenger">
//         <div className="chatBox">
//           <div className="chatBoxWrapper" style={currentChat?{alignItems:'inherit'}:{alignItems:'center'}}>
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="כתוב משהו..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     שלח
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 פתח שיחה כדי להתחיל צ'אט
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </>    
//   );
// }

export default Blog;