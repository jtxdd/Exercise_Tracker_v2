const React = require('react');

const Add_Exercise = (props) => {
  return(
    <div className="align-self-center mx-3">
      <button id="addExercise" className="btn btn-primary" onClick={props.handleClick}>Add Exercise</button>
    </div>
  );
};

module.exports = Add_Exercise;