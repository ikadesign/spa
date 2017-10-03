import React from 'react';
import axios from 'axios';

export default class BlogSingle extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      title: '',
      date: '',
      category_id: '',
      content: '',
      category_name: '',
    })
  }

  componentDidMount() {
    this.getBlog();
  }

  // ajax category
  getCategory() {
    const URL = `http://localhost:3003/api/category`;
    const category_id = this.state.category_id;
    console.log('cc', category_id);

    axios.get(URL)
      .then((res) => {
        const gotItemCategory = res.data;
        console.log('yo', res.data);
        
        for (let i=0;i<gotItemCategory.length;i++) {
          if ( category_id == gotItemCategory[i]._id) {
            this.setState({
              category_name: gotItemCategory[i].category,
            }, () => {
              console.log(this.state);
            })
          }
        }
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
        const blogId = this.props.params.blog_id;
        const gotItems = res.data;
        console.log(blogId);

        for (let i = 0; i < gotItems.length; i += 1) {
          if ( blogId == gotItems[i]._id ) {
            this.setState({ 
              title: gotItems[i].title,
              date: gotItems[i].date,
              category_id: gotItems[i].category_id,
              content: gotItems[i].content,
            }, () => {
              this.getCategory();
            });
          }
        }
        

      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorShows: true,
          errorMessage: err.toString(),
        });
      });
  }

  render() {
    const { title,  date,  category_id,  content, category_name } = this.state;
    console.log(title,  date,  category_id,  content, category_name);

    return (
      <div className="blog-single-page">
        <h2 className="blog-title">{title}</h2>
        <div className="info-box">
          <div className="date-box">
            <i className="fa fa-calendar" aria-hidden="true"></i>
            {date}
          </div>
          <div className="category-box">
            <i className="fa fa-folder-o" aria-hidden="true"></i>
            {category_name}
          </div>
        </div>
        
        <div className="content-box">{content}</div>
      </div>
    )
  }
}