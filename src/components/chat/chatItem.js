import React from "react";

const ChatItem = props => {
  return (
    <div className="chat-item-container">
      {props.chats[props.displayChat[0]][props.displayChat[1]].map(
        chat => chat[1]
      )}
    </div>
  );
};

export default ChatItem;
