const React = require('react');

const User_Logs = (props) => {
  return(
    <div className="align-self-center mx-3">
      <button id="userLogs" className="btn btn-primary" onClick={props.handleClick}>User Logs</button>
    </div>
  );
};

module.exports = User_Logs;