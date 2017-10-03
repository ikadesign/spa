import React from 'react';

export default class TableHead extends React.Component {
  render () {
    return (
      <th>
        {this.props.title}
      </th>
    );
  };
};
