import React from 'react';

export default class BlogCategorySelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = ({
      selectedIndex: '',
      selectedValue: '',
      didntSelect: true,
    })
  }
  componentDidMount() {
  }

  handleSelect(ev) {
    const { categoryList } = this.props;
    const selectedIndex = ev.target.selectedIndex;
    const selectedValue = ev.target.value;

    this.setState({
      selectedIndex: selectedIndex,
      selectedValue: selectedValue,
    },() => {
      this.props.handleCategorySelect(this.state.selectedIndex);
    })

    

    // for ( let i = 0; i < categoryList.length; i += 1) {
    //   if (categoryList[i].category === selectedItem ) {
    //     return categoryList[i]._id
    //   }
    // }
  }
  render() {
    const { categoryList } = this.props;
    console.log(categoryList, 2);
    
    return (
      <select className="input-select" onChange={this.handleSelect}>
        {
          categoryList.map((categoryList, idx) => (
            <option key={idx} value={categoryList.category}>{categoryList.category}</option>
          ))
        }
      </select>
    )
  }
  
}