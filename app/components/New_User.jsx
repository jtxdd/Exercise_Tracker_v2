const React = require('react');

const New_User = (props) => {
  return(
    <div className="align-self-center mx-3">
      <button id="newUser" className="btn btn-primary" onClick={props.handleClick}>New User</button>
    </div>
  );
}

module.exports = New_User;