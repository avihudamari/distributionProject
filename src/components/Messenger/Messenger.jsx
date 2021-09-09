import "./messenger.css";
import Conversation from "../conversation/Conversation.jsx";
import Message from "../Message/Message.jsx";
import ChatOnline from "../chatOnline/chatOnline.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConversationClicked, setIsConversationClicked] = useState(false);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  // let user = null;

  useEffect(() => {
    // user = window.localStorage.getItem(user);
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user? user._id: null]);
  // }, []);

  useEffect( () => {
    socket.current.emit("addUser", user? user._id: null);
    socket.current.on("getUsers", (users) => {
      console.log("users: ", users);
      
      let chatUsers = null;
    
      async function fetchMyAPI() {
        if (user.isAdmin) {
          await axios.post("/users/getDistributors")
          .then(res => {
            chatUsers = res.data;
            console.log("chatUsers: ", chatUsers);
            setOnlineUsers(
              //chatUsers.filter((f) => users.some((u) => u.userId === f))
              chatUsers
            );
            console.log("onlineUsers: ", onlineUsers);
          })
          .catch(error => {
            console.log(error);
          });   
        }
        else {
          await axios.post("/users/getAdmins")
          .then(res => {
            chatUsers = res.data;
            console.log("chatUsers: ", chatUsers);
            setOnlineUsers(
              //chatUsers.filter((f) => users.some((u) => u.userId === f))
              chatUsers
            );
            console.log("onlineUsers: ", onlineUsers);
          })
          .catch(error => {
            console.log(error);
          });   
        }
      }
      fetchMyAPI();
    });
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
        <div className="chatBox">
          <div className="chatBoxWrapper" style={currentChat?{alignItems:'inherit'}:{alignItems:'center'}}>
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="כתוב משהו..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    שלח
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                פתח שיחה כדי להתחיל צ'אט
              </span>
            )}
          </div>
        </div>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder={user? user.isAdmin ? "חפש מחלקים" : "חפש מנהל חלוקה": null} className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={ () =>
                setCurrentChat(c)
              }>
                <Conversation conversation={c} currentUser={user}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>    
  );
}