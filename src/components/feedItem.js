import React from "react";

const FeedItem = props => {
<<<<<<< HEAD
  const { name, utilization, timer, status } = props.machSpecs;
=======
  const { id, type, utilization, timer, status, online } = props.machSpecs;
>>>>>>> hotfix

  return (
    <div
      className="feed-item"
<<<<<<< HEAD
      style={{ border: status === "Online" ? "2px solid #7ED321" : "2px solid #9B9B9B" }}
=======
      style={{ border: online ? "2px solid #7ED321" : "2px solid #9B9B9B" }}
>>>>>>> hotfix
      onClick={props.toggleMachineSelection(props.machSpecs)}
    >
      <span
        className="feed-indicator-dot"
        style={{
<<<<<<< HEAD
          backgroundColor: status === "Online" ? "#7ED321" : "#9B9B9B"
=======
          backgroundColor: online ? "#7ED321" : "#9B9B9B"
>>>>>>> hotfix
        }}
      />
      <img src="./assets/machList.png" alt="PNG" />
      <div className="feed-item-text-wrapper">
        <p>
          {type} {id}
        </p>
        <p
          style={{
            color:
              utilization >= 66 ? "#7ED321" : utilization <= 39 ? "#BB0000" : "orange"
          }}
        >
          {utilization}% Utilization
        </p>
        <p>
          {timer} Timer {status}
        </p>
        <p
          style={{
            color:
              utilization >= 66 ? "#7ED321" : utilization <= 39 ? "#BB0000" : "orange"
          }}
        >
          {utilization}% Utilization
        </p>
        <p>
          {timer}
        </p>
      </div>
<<<<<<< HEAD
      <p>{status}</p>
=======
      <p>{online ? "Online" : "Offline"}</p>
>>>>>>> hotfix
    </div>
  );
};

export default FeedItem;
