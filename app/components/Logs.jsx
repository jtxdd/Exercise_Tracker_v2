const React = require('react');

const Logs = (props) => {
  
  const formatter = (item, x) => {
    let options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    let format = {
      date: new Date(x).toLocaleString([], options).split(','),
      mins: x < 10 ? '0' + x : x
    };
    return format[item];
  };
  
  const class_static = 'container border shadow mt-5';
  const class_status = props.show_logs ? 'show-logs ' + class_static : 'hide-logs';
  
  return(
    <div className={class_status}>
      <div className="row border-bottom border-dark py-1">
        <div className="col-sm-4 font-weight-bold">Description</div>
        <div className="col-sm-4 font-weight-bold">Duration</div>
        <div className="col-sm-4 text-center font-weight-bold">Date</div>
      </div>
      {props.logs.map((el, i) => 
        <div key={'log_' + i} className="row border-bottom border-primary">
          <div className="col-sm-4 cap-first">{el.description}</div>
          <div className="col-sm-4">{formatter('mins', +el.duration)} mins</div>
          <div className="col-sm-4">
            <div className="row no-gutters">
              {formatter('date', el.date).map(el => 
                <div className="col-sm-3">{el}</div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mt-3 pb-2 font-weight-bold">Exercises: {props.logs.length}</div>
    </div>
  );
};

module.exports = Logs;