import React from 'react';
import axios from 'axios';

import BlogCategoryItem from './BlogCategoryItem';
import BlogCategoryAdd from './BlogCategoryAdd';

export default class BlogCategory extends React.Component {
  constructor(props) {
    super(props);

    this.handleCategoryManager = this.handleCategoryManager.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this);

    this.state = ({
      categoryList: [],
      editToggle: false,
      addToggle: false,
    });
  }

  componentDidMount() {
    this.getCategory();
  }

  // ajax
  getCategory() {
    const URL = `http://localhost:3003/api/category`;
    
    axios.get(URL)
      .then((res) => {
        const gotItems = res.data;
        this.setState({ 
          categoryList: gotItems,
        }, () => {
          // console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorShows: true,
          errorMessage: err.toString(),
        });
      });
  }

  handleCategoryManager() {
    let newToggle = this.state.manageToggle;

    newToggle = newToggle === true ? (newToggle = false) : (newToggle = true);

    this.setState({
      manageToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }
  
  // ajax
  getCategory() {
    const URL = `http://localhost:3003/api/category`;
    
    axios.get(URL)
      .then((res) => {
        const gotItems = res.data;
        this.setState({ 
          categoryList: gotItems,
        }, () => {
          // console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorShows: true,
          errorMessage: err.toString(),
        });
      });
  }

  writeCategory(category) {
    // console.log(title, content);
    const URL = `http://localhost:3003/api/category`;
    
    axios.post(URL, {
      category: category,
    })
      .then(() => {
        // console.log(res);
        this.getCategory();
        this.props.getCategory();
        // this.handleAddCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCategory(id) {
    // console.log(id);
    const URL = `http://localhost:3003/api/category/${id}`;

    axios.delete(URL)
      .then((res) => {
        // console.log(res);
        this.getCategory();
        this.props.getCategory();
        // this.handleAddCategory();
      });
  }

  updateCategory(id, category) {
    // console.log(id, title, content);
    const URL = `http://localhost:3003/api/category/${id}`;

    axios.put(URL, {
        category: category,
      })
      .then(() => {
        // console.log(res);
        this.getCategory();
        this.props.getCategory();
        // this.handleAddBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete(id) {
    console.log(id);
    this.deleteCategory(id);
  }
  handleEdit(id, category) {
    console.log(id,category);
    this.updateCategory(id, category);
  }
  handleAddToggle(category) {
    console.log(category);
    // writeCategory(category);
  }
  handleCategoryAdd(category) {
    console.log(category);
    this.writeCategory(category);
  }

  render() {
    const { categoryList } = this.state;
    
    return (
      <div>
        <ul className="category-list">
          {
            categoryList.map((categoryList, idx) => (
              <BlogCategoryItem key={idx} categoryList={categoryList} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
            ))
          }
          <BlogCategoryAdd handleCategoryAdd={this.handleCategoryAdd} />
        </ul>
        {/* <button onClick={this.handleCategoryManager}>Manage Category</button> */}
      </div>
    )
  }
}