const React = require('react');

const Exercise_Form = (props) => {
  return(
    <div className="">
      <form action="/api/exercise/add" method="post">
        <h3>Add exercises</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">User ID</span>
          </div>
          <input id="user_id" type="text" className="form-control" placeholder="Username" name="userId" onChange={props.handleExerciseForm} value={props.exercise.user_id} required />
        </div>
          
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <input id="description" type="text" className="form-control" placeholder="Description" name="description" onChange={props.handleExerciseForm} value={props.exercise.description} />
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Duration</span>
          </div>
          <input id="duration" type="number" className="form-control" placeholder="duration* (mins.)" name="duration" required onChange={props.handleExerciseForm} value={props.exercise.duration} />
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Date</span>
          </div>
          <input id="date" type="text" className="form-control" placeholder="date (yyyy-mm-dd)" name="date" onChange={props.handleExerciseForm} value={props.exercise.date} />
        </div>
        <button id="exercise_submit" className="btn btn-primary" onClick={props.handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

module.exports = Exercise_Form;