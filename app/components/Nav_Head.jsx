const React = require('react');

const Nav_Head = (props) => {
  return(
    <nav className="navbar navbar-expand bg-dark">
      <a className="navbar-brand text-white" href="#">
        <header>Exercise Tracker</header>
      </a>
      <div className="navbar-nav">
        <div className="d-flex justify-content-center">
          <div className="align-self-center mx-3">
            <button id="addExercise" className="btn btn-primary" onClick={props.handleClick}>Add Exercise</button>
          </div>
          <div className="align-self-center mx-3">
            <button id="newUser" className="btn btn-primary" onClick={props.handleClick}>New User</button>
          </div>
          <div className="align-self-center mx-3">
            <button id="userLogs" className="btn btn-primary" onClick={props.handleClick}>User Logs</button>
          </div>
          <div className="align-self-center mx-3">
            <button id="users" className="btn btn-primary" onClick={props.handleClick}>Users</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

module.exports = Nav_Head;