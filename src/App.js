import React, { Component } from 'react';
import uuid from 'uuid';
import Projects from './Components/Projects';
import Todos from './Components/Todos';
import AddProject from './Components/AddProject';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      projects: [],
      todos: [],
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, error){
        console.log(error);
      }.bind(this)
    });
  }

  getProjects(){
    this.setState(
      {
        projects: [
          {
            id: uuid.v4(),
            title: 'Business Website',
            category: 'Web Design'
          },
          {
            id: uuid.v4(),
            title: 'Social Application',
            category: 'Mobile Development'
          },
          {
            id: uuid.v4(),
            title: 'Ecommerce Shopping Cart',
            category: 'Web Development'
          }
        ]
      }
    );
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex( x => x.id === id );
    projects.splice(index, 1);
    this.setState({projects:projects});
  }

  render() {
    return (
      <div className="App">
        <div className="Projects">
          Add Project
          <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
          <AddProject addProject={ this.handleAddProject.bind(this) } />
        </div>
        <div className="Todos">
          <h3>Todo list</h3>
          <Todos todos={this.state.todos}/>
        </div>
      </div>
    );
  }
}


export default App;
