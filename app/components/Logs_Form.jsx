const React = require('react');

const Logs_Form = (props) => {
  return(
    <form id="logs_form" className="container d-flex flex-column w-50 mt-5" onSubmit={props.handleSubmit}>
      <h3>View Exercise Logs</h3>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">User ID</span>
        </div>
        <input id="user_id" type="text" className="form-control" name="user_id" onChange={props.handleFormChange} value={props.user_id} placeholder="User Id*" required />
      </div>
      <h6 className="mt-2">Optional Filters</h6>
      <div className="input-group mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text width-4">From</span>
        </div>
        <input id="from_date" type="date" className="form-control" name="from_date" onChange={props.handleFormChange} value={props.from_date} placeholder="From Date" />
      </div>
      <div className="input-group mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text width-4 justify-content-center">To</span>
        </div>
        <input id="to_date" type="date" className="form-control" name="to_date" onChange={props.handleFormChange} value={props.to_date} placeholder="To Date" />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Limit</span>
        </div>
        <input id="limit" type="number" className="form-control" name="limit" onChange={props.handleFormChange} value={props.limit} placeholder="Limit" />
      </div>
      <div>
        <button id="fetchLogs_form" className="btn btn-primary">Submit</button>
        <button id="fetchLogs_cancel" className="btn btn-danger mx-1" onClick={props.handleCancel} type="button">Cancel</button>
      </div>
    </form>
  );
};

module.exports = Logs_Form;