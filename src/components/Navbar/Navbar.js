import React, { Component } from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: false
    }
  }

  handleShowMenu(event) {
    event.preventDefault();
    this.setState({
      menuState: this.state.menuState === false,
    });
  }

  render() {
    const data = this.props.data.edges[0].node.frontmatter;

    const menuClass = this.state.menuState ? 'open' : 'close';
    const activeState = menuClass === 'open' ? 'active' : 'inactive';

    return (
      <header className="site-header">  
        <div className="container navbar-container">
      <nav className="navbar">
        <div className="site-brand">
        <CustomLink 
          linkURL="/" 
          linkType="internal" 
          className="site-logo"
        >
          <span>The Light Tree</span>
        </CustomLink>
        </div>
          <a 
          href="/" 
          className={`navbar-btn ${activeState} `}
          onClick={e => this.handleShowMenu(e)}
        >
          <span/>
        </a>
        <div className={`navbar-wrapper ${menuClass}`}>
          {data.menuItems.length > 0 && (
            <ul className="navbar-menu">
              {data.menuItems.map(menuItem => (
                <li key={menuItem.linkURL} className="navbar-menuItem">
                  <CustomLink
                    linkType={menuItem.linkType}
                    linkURL={menuItem.linkURL}
                    className="navbar-menuLink"
                  >
                    {menuItem.label}
                  </CustomLink>
                </li>
              ))}
            </ul>
          )}
          { data.socialLinks.length > 0 && (
            <ul className="social-icons">
              {data.socialLinks.map(socialitems => (
                <li key={socialitems.linkURL} className="social-icons--item">
                  <a 
                    href={socialitems.linkURL}
                    aria-label={socialitems.label}
                    className="icon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`icon icon-${socialitems.type} `} />
                    <span>{socialitems.hiddenText}</span>
                  </a>
                </li>
              ))}
            </ul>
            )
          }
        </div>
      </nav>
    </div>
      </header>
    );
  }

}

