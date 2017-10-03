import React from 'react';
import ExcelTable from './ExcelTable';

import './excel.scss';

export default class Excel extends React.Component {
  render () {
    return (
      <div className="excel-page">
        <h2 className="excel-title">Excel App</h2>
        <ExcelTable />
      </div>
    );
  };
};
