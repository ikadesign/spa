import React from 'react'
import axios from 'axios'

import ChannelItem from './ChannelItem'

import './twitch.scss'

export default class Twitcher extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      items: []
    }
  }

  componentDidMount() {
    const clientID = 'q76w73hhqbti678iemb94j43sro4kh'
    const limit = 15
    let gameType = 'Overwatch'
    let channelOffset = 0;
    let URL = `https://api.twitch.tv/kraken/streams/?client_id=${clientID}&game=${gameType}&offset=${channelOffset}&limit=${limit}`
    
    axios.get(URL)
      .then(res => {
        const gotItems = res.data.streams;
        this.setState({ 
          items: gotItems 
        }, function() {
          // console.log(this.state.items)
        });
      });  
  }

  render() {
    const items = this.state.items;
    return(
      <ul className='channel-list'>
        {
          items.map((items, idx) => (
            <ChannelItem key={idx} url={items.channel.url} medium={items.preview.medium} logo={items.channel.logo} status={items.channel.status} display_name={items.channel.display_name} viewers={items.viewers} />
          ))
        }
      </ul>
    )
  }
}