import React from 'react';
import { Link } from 'react-router';

import EditBlog from './EditBlog';

export default class BlogItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateBlogChild = this.updateBlogChild.bind(this);

    this.state = ({
      editToggle: false,

    })
  }

  handleDelete(ev) {
    const {_id} = this.props.blogs;
    // console.log(_id);
    this.props.deleteBlog(_id);
  }

  handleEdit() {
    let newToggle = this.state.editToggle;

    newToggle = newToggle === true ? (newToggle = false) : (newToggle = true);

    this.setState({
      editToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }

  updateBlogChild(id, title, content, category_id) {
    this.handleEdit();
    this.props.updateBlog(id, title, content, category_id);
  }

  render() {
    const { _id, title, date, content, category_id } = this.props.blogs;
    const categoryList = this.props.categoryList;
    let categoryName = '';
    for ( let i = 0; i<categoryList.length; i += 1) {
      if ( category_id == categoryList[i]._id) {
        console.log(categoryList[i].category);
        categoryName = categoryList[i].category;
      }
    }
    console.log(this.props);
    const { editToggle } = this.state;

    return(
      <div className="blog-item">
        <div className="title-box">
          <Link to={"/blog/" + _id}>
            <span>{title}</span>
          </Link>
          <div className="edit-box">
            <button onClick={this.handleEdit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button onClick={this.handleDelete}><i className="fa fa-times" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className="info-box">
          <div className="date-box">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            {date}
          </div>
          <div className="category-box">
            <i className="fa fa-folder-o" aria-hidden="true"></i>
            {categoryName}
          </div>
        </div>
        <div className="content-box">{content}</div>
        <div className={'update-box ' +((editToggle) ? 'show':'hide')}>
          <EditBlog blogId={_id} title={title} content={content} updateBlogChild={this.updateBlogChild} />
        </div>
      </div>
    )
  }
}