import React from 'react'

export default class ChannelItem extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const { url, medium, logo, status, display_name, viewers } = this.props;
    // console.log(url, medium, logo, status, display_name, viewers);

    return(
      <li className='channel-item'>
        <a href={url} target='_blank' title='Check Now!'>
          <div className='thumb-channel'>
            <img src={medium} alt='channel-thumb' />
          </div>
          <div className='info-channel'>
            <div className='author-info'>
              <img src={logo} alt='author-thumb' />
            </div>
            <div className='title-info'>
              <span className='title-info-text'>
                {status}
              </span>
              <div className='author-info-text'>
                {display_name}
              </div>
              <div className='viewer-info-text'>
                <span className='viewer-title'>Viewer</span>: {viewers}
              </div>
            </div>
          </div>
        </a>
      </li>
    )
  }
}