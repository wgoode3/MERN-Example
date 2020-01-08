import React, { Component } from 'react';
import axios from 'axios';

class NinjaForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  addNinja = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/ninjas", this.state)
      .then(res => {
        this.props.addedNinja();
        this.setState({name: ""});
      })
      .catch(err => console.log(err));
  }

  changeName = e => {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.addNinja}>
        <label>Name:</label>
        &nbsp;
        <input 
          type="text" 
          onChange={this.changeName} 
          value={this.state.name} 
        />
        <input type="submit" />
      </form>
    );
  }

}

class NinjaList extends Component {
  render() {
    return (
      <>
        <h1>All Ninjas</h1>
        <ul>
          {
            this.props.ninjas.map( ninja => 
              <li key={ninja._id}>{ninja.name}</li>
            )
          }
        </ul>
      </>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ninjas: []
    }
  }

  componentDidMount() {
    this.fetchNinjas();
  }

  fetchNinjas = () => {
    axios.get("http://localhost:8000/ninjas")
      .then(res => this.setState({ninjas: res.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <NinjaList ninjas={this.state.ninjas} />
        <hr />
        <NinjaForm addedNinja={this.fetchNinjas} />
      </>
    );
  }
}

export default App;