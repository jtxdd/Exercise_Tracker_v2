const React = require('react');

const User_Form = (props) => {
  return(
    <form id="username_form" className="container d-flex flex-column w-50 mt-5" onSubmit={props.handleSubmit}>
      <h3>Create a New User</h3>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Username</span>
        </div>
        <input id="username" type="text" className="form-control"  name="username" onChange={props.handleFormChange} value={props.username} placeholder="Username*" required />
      </div>
      <div>
        <button id="username_submit" className="btn btn-primary mx-1">Submit</button>
        <button id="username_cancel" className="btn btn-danger mx-1" onClick={props.handleCancel} type="button">Cancel</button>
      </div>
    </form>
  );
}

module.exports = User_Form;