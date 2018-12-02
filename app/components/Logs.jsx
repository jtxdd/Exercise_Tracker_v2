const React = require('react');

const Logs = (props) => {
  let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  let count = props.logs.length;
  return(
    <div className="container-fluid mt-5">
      <div className="row pb-2">
        <div className="col-sm-4">Description</div>
        <div className="col-sm-4">Duration</div>
        <div className="col-sm-4 text-center">Date</div>
      </div>
      {props.logs.map((el, i) => 
        <div key={'log_' + i} className="row">
          <div className="col-sm-4 cap-first">{el.description}</div>
          <div className="col-sm-4">{+el.duration < 10 ? '0' + el.duration : el.duration} mins</div>
          <div className="col-sm-4">
            <div className="row no-gutters">
              <div className="col-sm-3">{new Date(el.date).toLocaleString([], options).split(',')[0]}</div>
              <div className="col-sm-3">{new Date(el.date).toLocaleString([], options).split(',')[1]}</div>
              <div className="col-sm-3">{new Date(el.date).toLocaleString([], options).split(',')[2]}</div>
              <div className="col-sm-3">{new Date(el.date).toLocaleString([], options).split(',')[3]}</div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 ">Number of Exercises: {count}</div>
    </div>
  );
};

module.exports = Logs;