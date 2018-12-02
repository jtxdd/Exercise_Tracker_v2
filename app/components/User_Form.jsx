const React = require('react');

const User_Form = (props) => {
  return(
    <div className="d-flex justify-content-center mt-5">
      <form id="username_form" onSubmit={props.handleSubmit}>
        <h3>Create a New User</h3>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Username</span>
          </div>
          <input id="username" type="text" className="form-control"  name="username" onChange={props.handleFormChange} value={props.username} placeholder="Username*" required />
        </div>
        <button id="username_submit" className="btn btn-primary mx-1">Submit</button>
        <button id="username_cancel" className="btn btn-danger mx-1" onClick={props.handleCancel} type="button">Cancel</button>
      </form>
    </div>
  );
}

module.exports = User_Form;