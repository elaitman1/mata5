import React from "react";

const FeedItem = props => {
  const { id, type, timer, status, imgUrl } = props.machSpecs;

  return (
    <div className="feed-item" onClick={props.selectMachine(props.machSpecs)}>
      <span className="feed-indicator-dot" />
      <img src={imgUrl} alt="PNG" />
      <div className="feed-item-text-wrapper">
        <p>
          {type} {id}
        </p>
        <p>
          {timer} Timer {status}
        </p>
      </div>
    </div>
  );
};

export default FeedItem;
