const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const Nav_Head = require('./components/Nav_Head');
const User_Form = require('./components/User_Form');
const Exercise_Form = require('./components/Exercise_Form');
const Users = require('./components/Users');
const Logs = require('./components/Logs');
const Logs_Form = require('./components/Logs_Form');
const Result = require('./components/Result');


//URL Paths

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date:  '',
      logs:  [],
      users: [],
      limit: '',
      filter:  {},
      user_id: '',
      to_date: '',
      from_date: '',
      selected:  null,
      username: '',
      duration: '',
      show_logs: false,
      filter_logs: [],
      description: ''
    };
    this.handleClick  = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }
  
  componentDidMount() {
    this.handleFetchUsers();
  }
  
  handleResult(res) {
    if (res.status === 200) {
      this.setState({ selected: <Result result={true} /> });
      res.form === 'user' ? this.handleFetchUsers() : '';
    } else {
      this.setState({ selected: <Result result={false} /> });
    }
  }
  
  handleFormChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }
  
  handleFetchUsers() {
    fetch('/users')
      .then(res => res.json())
      .then(result => {
        this.setState({users: result.docs})
      }); 
  }
  
  handleCancel() {
    this.setState({ selected: <span></span> });
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
          <Logs_Form 
            key={'Logs_Form'} 
            handleSubmit={this.handleSubmit} 
            handleFormChange={this.handleFormChange} 
            handleCancel={this.handleCancel}
          />
        );
      },
      users:() => {
        this.handleFetchUsers();
        return(
          <Users 
            users={this.state.users} 
            handleClick={(id) => {this.setState({user_id: id}); this.handleSubmit(id)}} 
          />
        );
      }
    };
    
    this.setState({ selected: selected[e.target.id](), show_logs: false });
  }
    
  handleSubmit(e) {
    const get_options = () => {
      return {method: 'get', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};
    };
    const post_options = (body) => {
      return {method: 'post', body: body, headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}};
    };
    
    let submit = '';
        
    let action = {
      username_form:() => {
        let body = JSON.stringify({username: this.state.username});
        return fetch('/new_user', post_options(body))
          .then(res => res.json())
          .then(result => {
            result.form = 'user';
            this.handleResult(result);
          });
      },
      
      exercise_form:() => {
        let body = JSON.stringify({
            _id: this.state.user_id, 
            description: this.state.description, 
            duration: this.state.duration, 
            date: this.state.date
          });
        return fetch('/exercise', post_options(body)).then(res => res.json())
          .then(result => {
            result.form = 'exercise';
            this.handleResult(result);
          });
      },
      
      logs_form:() => {
        const { user_id, from_date, to_date, limit } = this.state;
        const url = new URL('https://meadow-innocent.glitch.me/logs');
        const params = {_id: user_id, from_date, to_date, limit };
        
        url.search = new URLSearchParams(params);
        
        return fetch(url, get_options()).then(res => res.json())
          .then(result => {
            result.form = 'logs';
            this.handleResult(result);
            
            let filter = { from_logs: [], to_logs: [], limit_logs: [] };
            
            const filter_param = (param, docs) => {
              const gt = param === 'from_logs';
              
              filter[param] = docs.map(el => {
                el.date = new Date(el.date).toISOString();
                return el;
              });
              
              if (gt) {
                return filter[param].filter(el => new Date(from_date).toISOString() <= el.date);
              } else {
                return filter[param].filter(el => new Date(to_date).toISOString() >= el.date);
              }
            };
          
            if (from_date) {
              filter_param('from_logs', result.docs);
            }
          
            if (to_date) {
              filter_param('to_logs', result.docs);
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
    
    if (typeof e === 'string') {
      setTimeout(() => {
        this.setState({show_logs: true});
        submit = 'logs_form';
        action[submit]();
      }, 500);
    } else {
      e.preventDefault();
      submit = e.target.id;
      action[submit]();
    }
  }
    
  render() {
    return(
      <div>
        <Nav_Head handleClick={this.handleClick} />
        {this.state.selected ? this.state.selected : <span></span>}
        {this.state.logs.length ? <Logs show_logs={this.state.show_logs} logs={this.state.filter_logs.length ? this.state.filter_logs : this.state.logs} /> : <span></span>}
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

{/*<Users users={this.state.users} selected={this.state.selected ? this.state.selected : false} username={this.handleUserLogs} />*/}