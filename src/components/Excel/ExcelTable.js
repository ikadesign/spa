import React from 'react';

import TableHead from './TableHead';
import TableBody from './TableBody';

export default class ExcelTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick =this.handleClick.bind(this);

    this.state = {
      'headers': [
        'ID', 'Book', 'Author', 'Language', 'Published', 'Sales'
      ],
      'data': [
        {
          'id': '1',
          'Book': 'The Lord of the Rings',
          'Author': 'J. R. R. Tolkien',
          'Language': 'English',
          'Published': '1954–1955',
          'Sales': '150m'
        },
        {
          'id': '2',
          'Book': 'Le Petit Prince (The Little Prince)',
          'Author': 'Antoine de Saint-Exupéry',
          'Language': 'French',
          'Published': '1943',
          'Sales': '140m'
        },
        {
          'id': '3',
          'Book': 'Harry Potter and the Philosophes Stone',
          'Author': 'J. K. Rowling',
          'Language': 'English',
          'Published': '1997',
          'Sales': '107m'
        },
        {
          'id': '4',
          'Book': 'And Then There Were None',
          'Author': 'Agatha Christie',
          'Language': 'English',
          'Published': '1939',
          'Sales': '100m'
        },
        {
          'id': '5',
          'Book': 'Dream of the Red Chamber',
          'Author': 'Cao Xueqin',
          'Language': 'Chinese',
          'Published': '1754–1791',
          'Sales': '100m'
        },
        {
          'id': '6',
          'Book': 'The Hobbit',
          'Author': 'J. R. R. Tolkien',
          'Language': 'English',
          'Published': '1937',
          'Sales': '100m'
        },
        {
          'id': '7',
          'Book': 'She: A History of Adventure',
          'Author': 'H. Rider Haggard',
          'Language': 'English',
          'Published': '1887',
          'Sales': '100m'
        }
      ],
      sortby: 'up',
      thIndex: ''
    };
  };
  handleClick(ev) {
    let column = ev.target.cellIndex;
    const sortData = this.state.data;
    sortData.sort();
    console.log(sortData);
    this.setState({
      data: sortData
    })
  }
  
  render () {
    const headers = this.state.headers;
    const data = this.state.data;
    const order = this.state.order;
    return (
      <table className='excel-table'>
        <thead onClick={this.handleClick}>
          <tr>
            {
              headers.map((title, idx) => (
                <TableHead title={title} order={order} key={idx} thIndex={idx} />
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((datas, idx) => (
              <TableBody datas={datas} key={idx} />
            ))
          }
        </tbody>
      </table>
    );
  };
};
