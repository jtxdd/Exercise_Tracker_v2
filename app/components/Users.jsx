const React = require('react');

const Users = (props) => {
  const selection = props.selected.key === 'Exercise_Form' || props.selected.key === 'User_Form' || props.selected.key === 'Fetch_Form';
  const classNames = selection ? 'hide-users' : 'container show-users flex-wrap justify-content-center mt-3';
  const classForHeader = selection ? 'hide-users' : 'text-center mt-5';
  return(
    <div>
      <h3 className={classForHeader}>Users</h3>
      <div className={classNames}>
        {props.users.map((el,i) =>
          <a key={el.user_id} id={el.username} href="#" className="btn btn-secondary mr-3 my-2" onClick={() => props.username(el.username)}>
            <div>{el.username}</div>
            <div>{el.user_id}</div>
          </a>
        )}
      </div>
    </div>
  );
};

module.exports = Users;