const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const New_User = require('./components/New_User');
const User_Form = require('./components/User_Form');
const Add_Exercise = require('./components/Add_Exercise');
const Exercise_Form = require('./components/Exercise_Form');
const Instructions = require('./components/Instructions');
const Header = require('./components/Header');
const Users = require('./components/Users');
const Success = require('./components/Success');
const Fail = require('./components/Fail');
const Logs = require('./components/Logs');
const Fetch_Form = require('./components/Fetch_Form');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selected:  null,
      username: '',
      user_id: '',
      description: '',
      duration: '',
      date: '',
      logs: [],
      filter_logs: [],
      filter: {},
      from_date: '',
      to_date: '',
      limit: ''
    };
    this.handleClick  = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleUserLogs = this.handleUserLogs.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  
  componentDidMount() {
    this.handleFetchUsers();
  }
  
  handleFormChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  
  handleSuccess(ops, res) {
    let user = ops === 'user';
    
    this.setState({selected: <Success />});
    
    if (user) {
      this.handleFetchUsers();
    }
    
    //let logs = ops === 'logs';
    //if (logs) { this.setState({selected: <Logs />}); }
  }
  
  handleFail(ops, res) {
    this.setState({selected: <Fail />});
  }
  
  handleUserLogs(username) {
    //fetch('/' + username)
    fetch(`/logs?username=${username}&from=${''}&to=${''}&limit=${''}`)
      .then(res => res.json())
      .then(result => {
        this.setState({logs: result.docs});
      });
  }
  
  handleFetchUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(result => {
        this.setState({users: result})
      }); 
  }
  
  handleCancel() {
    this.setState({selected: <span></span>});
  }
  
  handleClick(e) {
    let selected = {
      addExercise:() => {
        return(
          <Exercise_Form 
            key={'Exercise_Form'}
            handleSubmit={this.handleSubmit}
            handleCancel={this.handleCancel}
            handleFormChange={this.handleFormChange}
          />
        );
      },
      newUser:() => {
        return(
          <User_Form 
            key={'User_Form'}
            handleSubmit={this.handleSubmit} 
            handleFormChange={this.handleFormChange}
            handleCancel={this.handleCancel}
          />
        );
      },
      userLogs:() => {
        return(
          <Fetch_Form 
            key={'Fetch_Form'} 
            handleSubmit={this.handleSubmit} 
            handleFormChange={this.handleFormChange} 
            handleCancel={this.handleCancel}
          />
        );
      }
    };
    
    this.setState({
      selected:  selected[e.target.id]()
    });
  }
    
  handleSubmit(e) {
    e.preventDefault();
    let submit = e.target.id;
    
    let action = {
      username_form:() => {
        let options = {
          method: 'post',
          body: JSON.stringify({username: this.state.username}),
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          }
        };
        return fetch('/new_user', options)
          .then(res => res.json())
          .then(result => {
            result.status === 200 ? this.handleSuccess('user', 'success') : this.handleFail('user', 'fail');
          });
      },
      exercise_form:() => {
        let options = {
          method: 'post',
          body: JSON.stringify({
            _id: this.state.user_id, 
            description: this.state.description, 
            duration: this.state.duration, 
            date: this.state.date
          }),
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          }
        };
        return fetch('/exercise', options)
          .then(res => res.json())
          .then(result => {
            result.status === 200 ? this.handleSuccess('exercise', 'success') : this.handleFail('exercise', 'fail');
          });
      },
      fetch_form:() => {
        let options = {
          method: 'get',
          headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
          }
        };
        let url = new URL('https://meadow-innocent.glitch.me/logs');
        let { user_id, from_date, to_date, limit } = this.state;
        let params = {_id: user_id, from_date, to_date, limit};
        url.search = new URLSearchParams(params);
        return fetch(url, options)
          .then(res => res.json())
          .then(result => {
            result.status === 200 ? this.handleSuccess('logs', 'success') : this.handleFail('logs', 'fail');
            
            let filter = {from_logs: [], to_logs: [], limit_logs: []};
          
            if (from_date) {
              filter.from_logs = result.docs.map(el => {
                el.date = new Date(el.date).toISOString();
                return el;
              }).filter(el => new Date(from_date).toISOString() <= el.date);
            }
          
            if (to_date) {
              filter.to_logs = result.docs.map(el => {
                el.date = new Date(el.date).toISOString();
                return el;
              }).filter(el => new Date(to_date).toISOString() >= el.date);
            }
          
            if (limit) {
              filter.limit_logs = result.docs.slice(0, limit);
            }
          
            this.setState({
              filter_logs: filter.from_logs.concat(filter.to_logs.concat(filter.limit_logs)),
              filter: filter,
              logs: result.docs
            });
          });
      }
    };
    action[submit]();
  }
    
  render() {
    return(
      <div>
        <Header handleClick={this.handleClick} />
        {/*<Users users={this.state.users} selected={this.state.selected ? this.state.selected : false} username={this.handleUserLogs} />*/}
        <Instructions />
        {this.state.selected ? this.state.selected : <span></span>}
        {this.state.logs.length ? <Logs logs={this.state.filter_logs.length ? this.state.filter_logs : this.state.logs} /> : <span></span>}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

/*
const { user_id, description, duration, date } = this.state;
    const items = {user_id, description, duration, date };
    const stateText = (JSON.stringify(items, null, 2)).replace(/["{},]/g, '');
    const x = {color:'white', position:'absolute', top:'3rem', left:0};
*/
{/*<pre id="state_text" style={x}>{stateText}</pre>*/}
