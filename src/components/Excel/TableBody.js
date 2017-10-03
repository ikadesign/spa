import React from 'react';

export default class TableBody extends React.Component {
  render () {
    const { id, Book, Author, Language, Published, Sales } = this.props.datas;
    // console.log( id, Book, Author, Language, Published, Sales );

    return (
      <tr>
        <td>{id}</td>
        <td>{Book}</td>
        <td>{Author}</td>
        <td>{Language}</td>
        <td>{Published}</td>
        <td>{Sales}</td>
      </tr>
    );
  };
};
