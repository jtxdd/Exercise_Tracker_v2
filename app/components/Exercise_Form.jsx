const React = require('react');

const Exercise_Form = (props) => {
  return(
    <div className="d-flex justify-content-center mt-5">
      <form id="exercise_form" onSubmit={props.handleSubmit}>
        <h3>Add exercises</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">User ID</span>
          </div>
          <input id="user_id" type="text" className="form-control" name="user_id" onChange={props.handleFormChange} value={props.user_id} placeholder="User Id*" required />
        </div>
          
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Description</span>
          </div>
          <input id="description" type="text" className="form-control" name="description" onChange={props.handleFormChange} value={props.description} placeholder="Description*" required />
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Duration</span>
          </div>
          <input id="duration" type="number" className="form-control" name="duration" onChange={props.handleFormChange} value={props.duration} placeholder="Duration* (mins)" required />
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Date</span>
          </div>
          <input id="date" type="date" className="form-control" name="date" onChange={props.handleFormChange} value={props.date} placeholder="Date" />
        </div>
        <button id="exercise_submit" className="btn btn-primary mx-1">Submit</button>
        <button id="exercise_cancel" className="btn btn-danger mx-1" onClick={props.handleCancel} type="button">Cancel</button>
      </form>
    </div>
  );
};

module.exports = Exercise_Form;