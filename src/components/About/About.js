import React from 'react'
import './about.scss'

export default class About extends React.Component {
  render() {
    return(
      <div className="about-page">
        <h2>About this portfolio</h2>
        <p><span className="first-char">R</span>ecord React Reading and Practice apps</p>
      </div>
    )
  }
}