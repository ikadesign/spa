import React from 'react'

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickComplete = this.handleClickComplete.bind(this);
  }
  handleClickDelete() {
    // console.log('this is del button');
    this.props.sendID(this.props.id);
  }
  handleClickComplete() {
    // console.log('this is complete button');
    this.props.sendCompleted(this.props.id);
  }
  render() {
    return(
      <li className={'list-item' + ' ' + ('key'+this.props.id) + ' ' + ((this.props.completed == true) ? 'yes' : 'no')} >
        <span>{this.props.name}</span>
        <button className='input-btn btn-del' value='del' onClick={this.handleClickDelete}><i className='fa fa-times' aria-hidden='true'></i></button>
        <button className='input-btn btn-completed' value='completed'onClick={this.handleClickComplete}><i className='fa fa-check' aria-hidden='true'></i></button>
      </li>
    )
  }
}