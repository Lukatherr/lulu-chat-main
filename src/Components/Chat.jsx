import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../Context/ChatContext";
import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import Chats from "./Chats";
import { useState } from "react";
import Home from "../pages/Home";

const Chat = ({ toggleComponent }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <img
          src="https://www.iconbolt.com/iconsets/stroke-7/back.svg"
          alt=""
          onClick={() => toggleComponent()}
        />
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img
            src="https://www.iconbolt.com/iconsets/iconoir/add-user.svg"
            alt=""
          />
          <img
            src="https://www.iconbolt.com/iconsets/bootstrap-icons/camera-video.svg"
            alt=""
          />
          <img
            src="https://www.iconbolt.com/iconsets/iconsax-outline/more.svg"
            alt=""
          />
        </div>
      </div>
      <Messages></Messages>
      <Input></Input>
    </div>
  );
};

export default Chat;
