import React from "react";
import Feed from "./feed";
import Machine from "./machine";
import ChatItem from "./chat/chatItem";
import ProfileItem from "./profile/profileItem";

const Main = props => {
  const renderMain = () => {
    if (props.displayChat) {
      return (
        <ChatItem
          chats={props.chats}
          displayChat={props.displayChat}
          sendNewMessage={props.sendNewMessage}
        />
      )
    } else if (props.displayProfile) {
      return (
        <ProfileItem displayProfile={props.displayProfile} />
      )
    } else {
      if (!props.machineSelected) {
        return (
          <Feed
            cells={props.cells}
            toggleMachineSelection={props.toggleMachineSelection}
          />
        )
      } else {
        return (
          <Machine
            machine={props.machineSelected}
            toggleMachineSelection={props.toggleMachineSelection}
          />
        )
      }
    }
  }

  return (
    <div id="main" className="main-container">
      {renderMain()}
    </div>
  );
};

export default Main;
