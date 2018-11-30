const React = require('react');
const ReactDOM = require('react-dom');

/* Import Components */
const New_User = require('./components/New_User');
const User_Form = require('./components/User_Form');
const Add_Exercise = require('./components/Add_Exercise');
const Exercise_Form = require('./components/Exercise_Form');
const Instructions = require('./components/Instructions');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: false,
      selected:  null,
      username: '',
      exercise: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExerciseForm = this.handleExerciseForm.bind(this);
    this.handleUserForm = this.handleUserForm.bind(this);
  }
  
  handleClick(e) {
    let selected = {
      addExercise:() => {
        return(
          <Exercise_Form 
            handleSubmit={this.handleSubmit} 
            handleExerciseForm={this.handleExerciseForm}
            exercise={this.state.exercise}
          />
        );
      },
      newUser:() => {
        return(
          <User_Form 
            handleSubmit={this.handleSubmit} 
            handleUserForm={this.handleUserForm} 
            username={this.state.username}
          />
        );
      }
    };
    
    this.setState({
      selection: !this.state.selection,
      selected:  selected[e.target.id]()
    });
  }
  
  handleUserForm(e) {
    console.log(e.target.value);
    this.setState({username: e.target.value});
  }
  
  handleExerciseForm(e) {
    
  }
  
  
  handleSubmit(e) {
    let submit = e.target.id;
    let post = {
      username_submit:() => {
        let url = '/new_user';
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(this.state.username),
          headers: {'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(result => {
          //
        });
      },
      exercise_submit:() => {}
    };
    post[submit]();
  }
    
  render() {
    return(
      <div>
        <div className="d-flex justify-content-center">
          <h1 className="mx-3">Exercise Tracker</h1>
          <New_User handleClick={this.handleClick} />
          <Add_Exercise handleClick={this.handleClick} />
        </div>
        <Instructions />
        <div className="d-flex justify-content-center mt-5">
          {this.state.selected ? this.state.selected : ''}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));