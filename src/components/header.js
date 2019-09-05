// import { Link } from "gatsby"
import { css } from "@emotion/core"
import React from "react"

// Components
import BurgerMenu from "./burger_menu"

const Header = () => (
  <header css={css`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    margin: 1.5rem;
    margin-bottom: 0;

    @media only screen and (min-width: 600px) {
      margin: 3rem 4.5rem 0rem 4.5rem;
    }
  `}>
    <button css={css`
      /* color:  */
    `}>Long Nguyen</button>
    <nav>
      <BurgerMenu />
    </nav>
  </header>
)

export default Header
