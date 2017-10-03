import React from 'react';

export default class BlogCategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleEditToggle = this.handleEditToggle.bind(this);
    
    this.state = ({
      category: '',
      id: '',
      editToggle: false,
    });
  }

  componentDidMount() {
    const { category, _id } = this.props.categoryList;
    // console.log(blogId, title, content);
    this.setState({
      category: category,
      id: _id,
    })
  }

  handleDelete() {
    const id = this.props.categoryList._id;
    this.props.handleDelete(id);
  }

  handleEditToggle() {
    console.log(this.state.editToggle);
    let newToggle = this.state.editToggle;

    newToggle = (newToggle ? (newToggle = false) : (newToggle = true));
    this.setState({
      editToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }
  
  handleCategoryEdit(ev) {
    let typeContent = ev.target.value;
    // console.log(typeContent);
    this.setState({
      category: typeContent,
    }, () => {
      console.log(this.state.category);
    })
  }

  handleEditSubmit(ev) {
    ev.preventDefault();
    const { id, category } = this.state;
    // console.log(id, category);
    this.handleEditToggle();
    this.props.handleEdit(id, category);
    
  }
  render() {
    const { category, _id } = this.props.categoryList;

    return (
      <li className="category-item">
        <span>{category}</span>
        <div className="edit-box">
          <button onClick={this.handleEditToggle}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          <button onClick={this.handleDelete}><i className="fa fa-times" aria-hidden="true"></i></button>
        </div>
        <div className={"edit-input " + ((this.state.editToggle) ? 'show' : 'hide' ) }>
          <form action="submit" onSubmit={this.handleEditSubmit}>
            <input 
              type="text"
              onChange = {this.handleCategoryEdit}
              value = {this.state.category}
            />
          </form>
        </div>
      </li>
    )
  }
}