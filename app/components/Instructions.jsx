const React = require('react');

const Instructions = () => {
  return(
    <div id="instructions" className="justify-content-end">
      <div className="d-flex justify-content-center">
        <p>
          <span className="font-weight-bold">GET users's exercise log: </span>
          <code>GET /api/exercise/log?{`${'{userId}'}`}[&amp;from][&amp;to][&amp;limit]</code>
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <p className="mx-5">
          <span className="font-weight-bold">{'{ }'}</span>
          <span className="pr-2">= required,</span>
        </p>
        <p className="mx-5">
          <span className="font-weight-bold">[ ]</span>
          <span>= optional</span>
        </p>
      </div>
      <div className="d-flex justify-content-center">
        <p className="mx-5">
          <span className="font-weight-bold">from, to</span>
          <span className="pr-2">= dates (yyyy-mm-dd);</span>
        </p>
        <p className="mx-5">
          <span className="font-weight-bold">limit</span>
          <span>= number</span>
        </p>
      </div>
    </div>
  );
};

module.exports = Instructions;