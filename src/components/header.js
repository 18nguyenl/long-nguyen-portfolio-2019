// import { Link } from "gatsby"
import { css } from "@emotion/core"
import React, { Component } from "react"

// Components
import BurgerMenu from "./burger_menu"
import Navigation from "./navigation_menu"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationOn: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      navigationOn: !prevState.navigationOn,
    }))
  }

  render() {
    return (
      <header
        css={css`
          position: relative;
          z-index: 1000;

          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          padding: 1.5rem;
          padding-bottom: 0;

          @media only screen and (min-width: 600px) {
            padding: 3rem 4.5rem 0rem 4.5rem;
          }
        `}
      >
        <button
          css={css`
            z-index: 10;
          `}
        >
          Long Nguyen
        </button>
        <nav>
          <BurgerMenu handleClick={this.handleClick}/>
          <Navigation navigationOn={this.state.navigationOn}/>
        </nav>
      </header>
    )
  }
}

export default Header
