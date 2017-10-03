import React from 'react'

export default class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      Todotext: ''
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (this.state.Todotext != '') {
      this.props.addTodoItem(this.state.Todotext);
      this.setState({
        Todotext: ''
      })
    }
  }

  handleChange(ev) {
    // console.log(ev.target.value);
    this.setState({
      Todotext: ev.target.value
    })
  }

  render() {
    return(
      <form action="submit" onSubmit={this.handleSubmit}>
        <h3>Add item</h3>
        <input
          type="text"
          name="todo-text"
          className="input-text"
          placeholder=''
          value={this.state.Todotext}
          onChange={this.handleChange} 
        />
        <button className="input-btn">Submit</button>
      </form>
    )
  }
}