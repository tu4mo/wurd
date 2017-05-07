import React, { Component } from 'react'
import Button from '../Button'
import logo from './wurd.png'
import './Header.scss'

class Header extends Component {
  render () {
    return (
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <div className="navbar__item navbar__item--active">
              <a href="#">
                <img alt="Wurd" className="logo" src={logo} title="Wurd" />
              </a>
            </div>
            <div className="navbar__item navbar__item--ml-auto navbar__item--mr">
              <Button>New Post</Button>
            </div>
            <div className="navbar__item">
              <img className="navbar__profile" src="http://placehold.it/40x40" />
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
