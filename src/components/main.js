import React from "react";
import Feed from "./feed";
import Machine from "./machine";
import ChatItem from "./chat/chatItem";
import ProfileItem from "./profile/profileItem";

const Main = props => {
  return (
    <div id="main" className="main-container">
      {props.displayChat ? (
        <ChatItem
          chats={props.chats}
          displayChat={props.displayChat}
          sendNewMessage={props.sendNewMessage}
        />
      ) : props.displayProfile ? (
        <ProfileItem />
      ) :
      !props.machineSelected ? (
        <Feed
          cells={props.cells}
          toggleMachineSelection={props.toggleMachineSelection}
        />
      ) : (
        <Machine
          machine={props.machineSelected}
          toggleMachineSelection={props.toggleMachineSelection}
        />
      )}
    </div>
  );
};

export default Main;
