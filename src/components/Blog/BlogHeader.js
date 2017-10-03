import React from 'react';
import axios from 'axios';
import BlogCategorySelector from './BlogCategorySelector';

export default class BlogHeader extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);

    this.state = ({
      title: '',
      content: '',
      category_idx: 0,
      didntSelect: true,
      categoryList: [],
    })
  }
  componentDidMount() { 
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

  handleChangeTitle(ev) {
    let typeTitle = ev.target.value;
    this.setState({
      title: typeTitle,
    }, () => {
      // console.log(typeTitle);
    });
  }

  handleChangeContent(ev) {
    let typeContent = ev.target.value;
    this.setState({
      content: typeContent,
    }, () => {
      // console.log(typeContent);
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { categoryList } = this.props;
    console.log(categoryList)
    let title = this.state.title;
    let content = this.state.content;
    let category_id = categoryList[this.state.category_idx]._id; 
    
    if ( title !== '') {
      // console.log(title, content, category);
      this.setState({
        title: '',
        content: '',
        cateogry_idx: 0, 
      }, () => {
        // console.log(this.state.title, this.state.content);
      });
      this.props.writeBlog(title, content, category_id);
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

  render() {
    const { addToggle, categoryList } = this.props;
    // console.log(categoryList);

    return(
      <div className={'addblog-box ' +((addToggle) ? 'show':'hide')}>
        <form action="submit" onSubmit={this.handleSubmit}>
          <h4>Title:</h4>
          <input type="text" className="input-title" onChange={this.handleChangeTitle} value={this.state.title} required/>
          
          <h4>Category:</h4>
          <BlogCategorySelector categoryList={categoryList} handleCategorySelect={this.handleCategorySelect} />
          
          <h4>Content:</h4>
          <textarea name="" id="" cols="30" rows="10" className="input-content" onChange={this.handleChangeContent} value={this.state.content} ></textarea>
          <button><i className="fa fa-floppy-o" aria-hidden="true"></i> Submit</button>
        </form>
      </div>
    )
  }
}
