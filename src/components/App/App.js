import React from 'react';
import './app.scss';
import MenuLink from '../MenuLink';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleRwdMenu = this.handleRwdMenu.bind(this);

    this.state = {
      menuToggle: false,
    }
  }
  handleRwdMenu() {
    let newToggle = this.state.menuToggle;

    newToggle = newToggle === true ? (newToggle = false) : (newToggle = true);

    this.setState({
      menuToggle: newToggle,
    }, () => {
      // console.log(newToggle);
    });
  }

  render() {
    return (
      <div>

        <header className="header">
          <h1 className="site-title"><MenuLink to="/"><span>React</span><span className="dot">.</span>practice</MenuLink></h1>
          <ul className={"site-menu " + ((this.state.menuToggle) ? 'show':'hide')} onClick={this.handleRwdMenu}>
            <li><MenuLink to="/about">About</MenuLink></li>
            <li><MenuLink to="/todo">Todo</MenuLink></li>
            <li><MenuLink to="/twitch">Twitch</MenuLink></li>
            <li><MenuLink to="/blog">Blog</MenuLink></li>
          </ul>
          <div className="site-menu-toggle" onClick={this.handleRwdMenu}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </header>

        <main className="main-block">
          {this.props.children}
        </main>

        <footer className="footer">ika.React.practice</footer>
        
      </div>
    );
  }
}
