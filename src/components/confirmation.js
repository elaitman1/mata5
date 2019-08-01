import React from "react";

const Confirmation = props => {
  const confirmationHash = {
    "Inspection": "Saved",
    "Start Job": "Job Started"
  };

  const closeConfirmation = () => {
    props.toggleConfirmation();
    if (props.task === "Inspection") {
      props.hideTask();
    }

    if (props.task === "Start Job") {
      props.startJobObj.removeJob(props.startJobObj.jobNum);
      if (props.startJobObj.totalJobs === 0) {
        props.hideTask();
      }
    }
  };

  return (
    <div className="confirmation-container">
      <img src="./assets/confirmation.png" alt="Shield" />
      <h4>{confirmationHash[props.task]}</h4>
      <button className="form-submit-button" onClick={closeConfirmation}>
        Ok
      </button>
    </div>
  );
};

export default Confirmation;
