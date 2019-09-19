import { css } from "@emotion/core"
import React, { Component } from "react"

const rotate = css`
  &::before {
      top: 8px;
    transform: rotate(45deg);
  }

  &::after {
    top: 8px;
    transform: rotate(-45deg);
  }

  & {
    background: none;
  }
`

const unRotate = css`
  &::before {
    top: 0;
    transform: rotate(0deg);
  }

  &::after {
      top: 16px;
    transform: rotate(0deg);
  }

  & {
    background: #1c1c1c;
  }
`

class BurgerMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExit: false,
    }
  }
  render() {
    return (
      <button
        onClick={() => {
          this.props.handleClick()

          this.setState(prevState => ({
            isExit: !prevState.isExit,
          }))
        }}
        css={css`
          position: relative;

          z-index: 10;

          vertical-align: center;
        `}
      >
        <div
          css={css`
            background: #1c1c1c;

            width: 27px;
            height: 4.5px;

            margin-top: 7px;

            transition: all 0.4s cubic-bezier(1, 0, 0, 1);

            &::before,
            &::after {
              content: "";

              position: absolute;
              z-index: -1;

              display: block;

              width: 27px;
              height: 4.5px;

              background: black;

              transition: all 0.4s cubic-bezier(1, 0, 0, 1);
            }

            &::before {
              top: 0;
            }

            &::after {
              top: 16px;
            }

            ${this.state.isExit ? rotate : unRotate}
          `}
        ></div>
      </button>
    )
  }
}

export default BurgerMenu
