import React from 'react'

const jobList = (props) => {
  return (
    <div className="overlay" onClick={props.hideTask}>
      <div className="preparation-checklist-container" >
      <h4 >Reporting</h4>
      <h4 style={{marginBottom:'.4em'}}>For Job#<img className="arrowRight"
        src="./assets/arrowDown.png" alt="arrowDown"/></h4>
        <div className="backgroundJobList">
        {Object.keys(props.chats.Jobs).map(job=><ul style={{listStyleType:'none', marginLeft:'-2em'}}><li>{job}</li></ul>)}
        </div>
      </div>
    </div>
  )
}

export default jobList
