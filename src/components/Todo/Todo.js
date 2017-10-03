import React from 'react'
import axios from 'axios'

import TodoInput from './TodoInput'
import TodoList from './TodoList'

import './todo.scss'

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.completeTodoItem = this.completeTodoItem.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);

    this.state = {
      "todos": [
        {
          "id": "1",
          "name": "Work work1", 
          "completed": "false"
        },
        {
          "id": "2",
          "name": "Home work1", 
          "completed": "false"
        },
        {
          "id": "3",
          "name": "Clean work1", 
          "completed": "false"
        }
      ]
    }
  }
  
  deleteTodoItem(id) {
    // console.log('delete!'+id);
    const {todos} = this.state;
    let newTodos = todos.filter((item) => item.id !== id);
    this.setState(
      {
        todos: newTodos
      }, function() {
        // console.log(newTodos);
      }
    )
  }

  completeTodoItem(id) {
    const {todos} = this.state;
    let newTodos = todos.map((item) => {
      if (item.id === id) {
        if (item.completed === true) {
          item.completed = false;
        }else {
          item.completed = true;
        }
      }
      return item;
    })
    this.setState({
      todos: newTodos
    })
  }
  
  addTodoItem(Todotext) {
    // create item info
    const newID = this.state.todos.length + 1 + '';
    const completed = false;

    this.setState({
      todos: [
        ...this.state.todos,
        {
          id:newID, 
          name: Todotext,
          completed: completed
        }
      ]
    })
  }

  render() {
    return(
        <div className="todo-page">
          <h2 className="todo-title">a Todo app</h2>
          <div className="todo-container">
            <div className="todo-input"><TodoInput todos={this.state.todos} addTodoItem={this.addTodoItem} /></div>
            <div className="todo-list"><TodoList todos={this.state.todos} completeTodoItem={this.completeTodoItem} deleteTodoItem={this.deleteTodoItem} /></div>
          </div>
        </div>
    )
  }
}