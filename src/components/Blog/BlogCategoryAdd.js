import React from 'react';

export default class BlogCategoryAdd extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddToggle = this.handleAddToggle.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);

    this.state = {
      handleCategoryAdd: '',
      addToggle: false,
      category: '',
    }
  }
  handleAddToggle() {
    let newToggle = this.state.addToggle;
    // console.log(newToggle);
    newToggle = (newToggle ? false : true);

    this.setState({
      addToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }

  handleAddSubmit(ev) {
    ev.preventDefault();
    const { category } = this.state;
    if ( category !== '') {
      // console.log(id, category);
      this.setState({
        category: '',
      })
      this.handleAddToggle();
      this.props.handleCategoryAdd(category);
    }
  }

  handleCategoryAdd(ev) {
    let typeContent = ev.target.value;
    // console.log(typeContent);
    this.setState({
      category: typeContent,
    }, () => {
      // console.log(this.state.category);
    })
  }



  render() {
    return (
      <li className="category-item category-add">
        <span>Add Category</span>
        <div className="edit-box">
          <button onClick={this.handleAddToggle}><i className="fa fa-plus" aria-hidden="true"></i></button>
        </div>
        <div className={"edit-input " + ((this.state.addToggle) ? 'show' : 'hide' ) }>
          <form action="submit" onSubmit={this.handleAddSubmit}>
            <input 
              type="text"
              onChange = {this.handleCategoryAdd}
              value = {this.state.category}
              required
            />
          </form>
        </div>
      </li>
    )
  }
}