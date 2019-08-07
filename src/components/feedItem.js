import React from "react";

const FeedItem = props => {
  const { id, type, timer, status, online, imgUrl } = props.machSpecs;

  return (
    <div
      className="feed-item"
      style={{ border: online ? "2px solid #7ED321" : "2px solid #9B9B9B" }}
      onClick={props.selectMachine(props.machSpecs)}
    >
      <span
        className="feed-indicator-dot"
        style={{
          backgroundColor: online ? "#7ED321" : "#9B9B9B"
        }}
      />
      <img src={imgUrl} alt="PNG" />
      <div className="feed-item-text-wrapper">
        <p>
          {type} {id}
        </p>
        <p>
          {timer} Timer {status}
        </p>
      </div>
      <p>{online ? "Online" : "Offline"}</p>
    </div>
  );
};

export default FeedItem;
