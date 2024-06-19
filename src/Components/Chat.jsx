
import React, { useContext, useState } from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import { DispWidthContext } from "../context/dispWidthContext";
import { PageContext } from "../context/pageContext";
import { updateDoc, deleteField, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../Firebase";
import { signOut } from "firebase/auth";

const Chat = () => {
  const { data } = useContext(ChatContext) || {};
  const { currentUser } = useContext(AuthContext) || {};
  const { displayWidth } = useContext(DispWidthContext) || { displayWidth: window.innerWidth };
  const { handlePageChange } = useContext(PageContext) || { handlePageChange: () => {} };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClearChat = async () => {
    try {
      // Clear all messages for this chat
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: [],
      });

      // Update the user chat documents to remove the last message
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: deleteField(),
        [`${data.chatId}.date`]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: deleteField(),
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      console.log("Chat cleared successfully!");
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log('Camera opened');
        // Here you can handle the camera stream, such as displaying it in a video element
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {displayWidth < 499 && <FaArrowLeft className='arrow' onClick={handlePageChange} />}
          <img src={data.user?.photoURL} alt="" />
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <img onClick={openCamera} src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img className="moreimg" onClick={toggleMenu} src={More} alt="More" />
          {/* <FaEllipsisV className="dropdown-icon" onClick={toggleDropdown} /> */}
          {menuVisible && (
            <div className="dropdownMenu">
              <button onClick={handleSignOut}>Logout</button>
              <button>User Info</button>
              <button onClick={handleClearChat}>Clear chat</button>
              {/* Add more options here if needed */}
            </div>
          )}
          {/* {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleClearChat}>Clear chat</button>
            </div>
          )} */}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;


