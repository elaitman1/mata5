import React from "react";
import Feed from "./feed";
import Machine from "./machine";
import ChatItem from "./chat/chatItem";
import ProfileItem from "./profile/profileItem";

//so profileitem must not be machine selected and must not be display profile
const Main = props => {
  const renderMain = () => {
    //see parent of profileItem to see where toggleNotification comes from
    if (props.displayProfile) {
      return (
        <ProfileItem
          displayProfile={props.displayProfile}
          user={props.user}
          toggleNotification={props.toggleNotification}
          hideProfile={props.hideProfile}
        />
      );
    } else if (props.displayChat) {
      return (
        <ChatItem
          chats={props.chats}
          displayChat={props.displayChat}
          setInitialTime={props.setInitialTime}
          sendNewMessage={props.sendNewMessage}
        />
      );
    } else {
      if (!props.machineSelected) {
        return (
          <Feed
            cells={props.cells}
            toggleMachineSelection={props.toggleMachineSelection}
          />
        );
      } else {
        return (
          <Machine
            machine={props.machineSelected}
            toggleMachineSelection={props.toggleMachineSelection}
            savePrepChecklists={props.savePrepChecklists}
            setDeviceTimer={props.setDeviceTimer}
          />
        );
      }
    }
  };

  return (
    <div id="main" className="main-container">
      {renderMain()}
    </div>
  );
};

export default Main;
