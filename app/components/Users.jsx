const React = require('react');

const Users = (props) => {
  return(
    <div className="container-fluid mt-5">
      <h3>Users</h3>
      {props.users.map(el =>
        <a key={el.user_id} 
          id={el.username} 
          href="#" 
          className="btn btn-secondary mr-3 my-2"
          onClick={() => props.handleClick(el._id)}>
            <div>{el.username}</div>
        </a>
      )}
    </div>
  );
};

module.exports = Users;