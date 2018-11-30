const React = require('react');

const User_Form = (props) => {
  return(
    <div className="">
      <form action="/api/exercise/new-user" method="post">
        <h3>Create a New User</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Username</span>
          </div>
          <input id="username" type="text" className="form-control" placeholder="Username" name="username" value={props.username} onChange={props.handleUserForm} required />
        </div>
        <button id="username_submit" className="btn btn-primary" onClick={props.handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

module.exports = User_Form;

{/*
<div className="">
      <form action="/api/exercise/new-user" method="post">
        <h3>Create a New User</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Username</span>
          </div>
          <input id="username" type="text" className="form-control" placeholder="Username" name="username" value={props.username} onChange={props.handleUserForm} required />
        </div>
        <button id="username_submit" className="btn btn-primary" onClick={props.handleSubmit}>Submit</button>
      </form>
    </div>
*/}