const React = require('react');
const New_User = require('./New_User');
const Add_Exercise = require('./Add_Exercise');
const User_Logs = require('./User_Logs');

const Header = (props) => {
  return(
    <div className="d-flex justify-content-center">
      <h1 className="mx-3">Exercise Tracker</h1>
      <New_User handleClick={props.handleClick} />
      <Add_Exercise handleClick={props.handleClick} />
      <User_Logs handleClick={props.handleClick} />
    </div>
  );
};

module.exports = Header;