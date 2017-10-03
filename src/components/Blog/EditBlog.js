import React from 'react';
import axios from 'axios';

import BlogCategorySelector from './BlogCategorySelector';

export default class EditBlog extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    
    this.state = ({
      id: '',
      title: '',
      content: '',
      categoryList: [],
      category_idx: 0,
      category_name: '',
    })
  }
  
  handleCategorySelect(selectedIndex) {
    // console.log(selectedIndex, selectedValue);

    this.setState({
      category_idx: selectedIndex,
      didntSelect: false,
    }, () => {
      // console.log(this.state.category_idx, this.state.category_name, this.state.didntSelect);
    });
  }
  handleChangeTitle(ev) {
    let typeTitle = ev.target.value;
    this.setState({
      title: typeTitle,
    }, function() {
      // console.log(typeTitle);
    });
  }

  handleChangeContent(ev) {
    let typeContent = ev.target.value;
    this.setState({
      content: typeContent,
    }, function() {
      // console.log(typeContent);
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    let id = this.state.id;
    let title = this.state.title;
    let content = this.state.content;
    const { categoryList } = this.state;
    let category_id = categoryList[this.state.category_idx]._id; 
    console.log(id, title, content, category_id);
    if ( title !== '') {
      // this.setState({
      //   title: '',
      //   content: '',
      // }, function() {
      //   // console.log(this.state.title, this.state.content);
      // });
      this.props.updateBlogChild(id, title, content, category_id);
    }
  }

  handleCategorySelect(selectedIndex) {
    // console.log(selectedIndex, selectedValue);

    this.setState({
      category_idx: selectedIndex,
      didntSelect: false,
    }, () => {
      // console.log(this.state.category_idx, this.state.category_name, this.state.didntSelect);
    });
  }
  // ajax category
  getCategory() {
    const URL = `http://localhost:3003/api/category`;
    
    axios.get(URL)
      .then((res) => {
        const gotItems = res.data;
        this.setState({ 
          categoryList: gotItems,
          category_idx: '0',
          category_name: gotItems[0].category,
        }, () => {
          console.log(this.state);
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
  componentDidMount() {
    const { blogId, title, content } = this.props;
    console.log(blogId, title, content);

    this.setState({
      id: blogId,
      title: title,
      content: content,
    })
    this.getCategory();

  }
  render() {

    return(
      <form action="submit" onSubmit={this.handleSubmit}>
        <h2>Edit Blog</h2>
        <h4>Title:</h4>
        <input type="text" className="input-title" onChange={this.handleChangeTitle} value={this.state.title} required/>
          
        <h4>Category:</h4>
        <BlogCategorySelector categoryList={this.state.categoryList} handleCategorySelect={this.handleCategorySelect} />
          

        <h4>Content:</h4>
        <textarea name="" id="" cols="30" rows="10" className="input-content" onChange={this.handleChangeContent} value={this.state.content} ></textarea>
        <button>Submit</button>
      </form>
    )
  }
}