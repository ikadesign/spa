import React from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.sendID = this.sendID.bind(this);
    this.sendCompleted = this.sendCompleted.bind(this);
  }

  sendID(id) {
    this.props.deleteTodoItem(id);
  }
  sendCompleted(id) {
    this.props.completeTodoItem(id);
  }
  
  render() {
    return(
      <div className="list-block">
        <h3>Todo list</h3>
        <ul className="item-list">
          {
            this.props.todos.map((todos, idx) => (
              <TodoItem sendCompleted={this.sendCompleted} sendID={this.sendID} id={todos.id} name={todos.name} completed={todos.completed} key={idx} />
            ))
          }
        </ul>
      </div>
    );
  }
}