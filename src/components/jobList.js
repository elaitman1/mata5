import React from 'react'

const jobList = (props) => {
  return (
    <div className="overlay" onClick={props.hideTask}>
      <div className="preparation-checklist-container">
      <h4 >Reporting</h4>
      <h4 style={{margin:"1em"}}>For Job#</h4>
        <div className="backgroundJobList">
        </div>
      </div>
    </div>
  )
}

export default jobList
