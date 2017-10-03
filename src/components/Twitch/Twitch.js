import React from 'react'
import './twitch.scss'
import Twitcher from './Twitcher'

export default class Twitch extends React.Component {
  render() {
    return(
      <div className="twitch-page">
        <h2 className="twitch-title">Twitch api</h2>
        <div className="twitch-container">
          <Twitcher />
        </div>
      </div>
    )
  }
}