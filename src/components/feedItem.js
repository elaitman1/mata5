import React from "react";

const FeedItem = props => {
  const { name } = props.machSpecs;
  // const { id, type, utilization, timer, status, online } = props.machSpecs;

  return (
    <div
      className="feed-item"
      onClick={props.toggleMachineSelection(props.machSpecs)}
    >
      <img src="./assets/machList.png" alt="PNG" />
      <div className="feed-item-text-wrapper">
        <p>
          {name}
        </p>
      </div>
    </div>
  );
  // return (
  //   <div
  //     className="feed-item"
  //     style={{ border: online ? "2px solid #7ED321" : "2px solid #9B9B9B" }}
  //     onClick={props.toggleMachineSelection(props.machSpecs)}
  //   >
  //     <span
  //       className="feed-indicator-dot"
  //       style={{
  //         backgroundColor: online ? "#7ED321" : "#9B9B9B"
  //       }}
  //     />
  //     <img src="./assets/machList.png" alt="PNG" />
  //     <div className="feed-item-text-wrapper">
  //       <p>
  //         {name}
  //       </p>
  //       <p
  //         style={{
  //           color:
  //             utilization >= 66 ? "#7ED321" : utilization <= 39 ? "#BB0000" : "orange"
  //         }}
  //       >
  //         {utilization}% Utilization
  //       </p>
  //       <p>
  //         {timer} Timer {status}
  //       </p>
  //     </div>
  //     <p>{online ? "Online" : "Offline"}</p>
  //   </div>
  // );
};

export default FeedItem;
