import React from 'react';
import axios from 'axios';
import moment from 'moment';

import BlogHeader from './BlogHeader';
import BlogItem from './BlogItem';
import BlogCategory from './BlogCategory';

import './blog.scss';


export default class Blogger extends React.Component {
  constructor(props) {
    super(props);

    this.writeBlog = this.writeBlog.bind(this);
    this.handleAddBlog = this.handleAddBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDataBackup = this.handleDataBackup.bind(this);
    this.handleDataRestore = this.handleDataRestore.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.handleManage = this.handleManage.bind(this);

    this.state = ({
      blogs: [],
      preBlogs: [],
      categoryList: [],
      addToggle: false,
      editToggles: false,
      errorShows: false,
      errorMessage: '',
      manageToggle: false,
    });
  }

  componentDidMount() {
    this.getBlog();
    this.getCategory();
  }

  // ajax category
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

  // ajax blog
  getBlog() {
    const URL = `http://localhost:3003/api/blog`;
    
    axios.get(URL)
      .then((res) => {
        const gotItems = res.data.reverse();
        this.setState({ 
          blogs: gotItems,
        }, () => {
          // console.log(this.state.blogs)
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

  writeBlog(title, content, category_id) {
    // console.log(title, content);
    const URL = `http://localhost:3003/api/blog`;

    // moment format setting
    const serverDate = moment().format('YYYY/MM/DD');
    // console.log(serverDate);

    axios.post(URL, {
      title: title,
      date: serverDate,
      content: content,
      category_id: category_id,
    })
      .then(() => {
        // console.log(res);
        this.getBlog();
        // this.handleAddBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteBlog(id) {
    // console.log(id);
    const URL = `http://localhost:3003/api/blog/${id}`;

    axios.delete(URL)
      .then((res) => {
        // console.log(res);
        this.getBlog();
        // this.handleAddBlog();
      });
  }

  updateBlog(id, title, content, category_id) {
    console.log(id, title, content, category_id, 1);
    const URL = `http://localhost:3003/api/blog/${id}`;

    const serverDate = moment().format('YYYY/MM/DD');

    axios.put(URL, {
        title: title,
        date: serverDate,
        content: content,
        category_id: category_id,
      })
      .then(() => {
        // console.log(res);
        this.getBlog();
        // this.handleAddBlog();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // search blog by title
  handleDataBackup() {
    const preBlogs = this.state.blogs;
    this.setState({
      preBlogs: preBlogs,
    }, () => {
      // console.log(this.state.preBlogs);
    });
  }

  handleDataRestore(ev) {
    const keyword = ev.target.value;
    // console.log(keyword);
    if (!keyword) {
      this.getBlog();
    }
  }
  
  handleSearch(ev) {
    const keyword = ev.target.value.toLowerCase();
    const results = [];
    // console.log(keyword);

    if (!keyword) {
      this.setState({
        blogs: this.state.preBlogs,
      });
      return;
    }
    const blogs = this.state.preBlogs;

    for (let i = 0; i < blogs.length; i += 1) {
      if ((blogs[i].title).indexOf(keyword) !== -1 || (blogs[i].date).indexOf(keyword) !== -1 || (blogs[i].content).indexOf(keyword) !== -1) {
        results.push(blogs[i]);
      }
    }
    // console.log(results);
    this.setState({
      blogs: results,
    });
  }

  // add-box toggle
  handleAddBlog() {
    let newToggle = this.state.addToggle;

    newToggle = newToggle ? false : true;

    this.setState({
      addToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }
  handleManage() {
    let newToggle = this.state.manageToggle;

    newToggle = newToggle ? false : true;

    this.setState({
      manageToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }

  render() {
    const { errorShows, errorMessage, blogs, categoryList, manageToggle } = this.state;
    console.log(blogs);

    return (
      <div className={"blog-page " + ((manageToggle) ? 'manage' : 'no-manage')}>
        
        {/* shows when error */}
        <div className={'error-block ' + ((errorShows) ? 'show' : 'hide') }>
          <h2 className="error-text">{errorMessage}</h2>
        </div>

        <div className="side-bar">
          <div className="edit-blog-toggle" onClick={this.handleManage}>
            
            <button><span>Manage Blog</span><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          </div>
          <div className="blog-search">
            <input
              className="input-search"
              type="text"
              onFocus={this.handleDataBackup}
              onBlur={this.handleDataRestore}
              onChange={this.handleSearch}
              placeholder="Search"
            />
          </div>
          <div className="blog-category">
            <h3>Category</h3>
            <BlogCategory getCategory={this.getCategory} />
          </div>
        </div>
        <div className="blog-list">
          <div className="blog-header">
            <div className="btn-box">
              <button className="btn-add" onClick={this.handleAddBlog}><i className="fa fa-plus" aria-hidden="true"></i> Add Blog</button>
            </div>
            <BlogHeader writeBlog={this.writeBlog} addToggle={this.state.addToggle} categoryList={categoryList} />
          </div>
          {
            blogs.map((blogs) => (
              <BlogItem blogs={blogs} categoryList={categoryList} key={blogs._id} deleteBlog={this.deleteBlog} updateBlog={this.updateBlog} />
            ))
          }
        </div>

      </div>
    );
  }
}

