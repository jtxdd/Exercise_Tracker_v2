const React = require('react');

const Result = (props) => {
  return(
    <div className={props.result ? 'badge badge-success fadeOut' : 'badge badge-danger fadeOut'}>
      {props.result ? 'Success!' : 'Fail!'}
    </div>
  );
};

module.exports = Result;