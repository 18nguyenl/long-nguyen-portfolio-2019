import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { Link } from "gatsby"

const StyledLink = styled(Link)`
    color: #1c1c1c;

    text-decoration: none;

    transition: color 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;

    &:hover {
        color: #5826FF;
    }
`

const hidden = css`
    visibility: hidden;
    opacity: 0;
`

const visible = css`
    visibility: visible;
    opacity: 1;
`

const Navigation = ({ navigationOn }) => {
  return (
    <section
      css={css`
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        background: white;

        display: flex;
        flex-flow: column nowrap;

        justify-content: flex-end;

        ${navigationOn ? visible : hidden}

        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0.1s;

        @media screen and (max-width: 374px) {
                justify-content: center;
        }
      `}
    >
      <Global styles={css`
        ul {
            padding: 0;

            list-style: none;
        }

        li {
            font-size: 3.375rem;
            font-weight: 800;

            @media screen and (max-width: 374px) {
                font-size: 2.75rem;
            }
        }
      `}/>
      <ul
        css={css`
          margin-top: auto;
          margin-bottom: 7.5rem;

          display: flex;
          flex-flow: column nowrap;

          justify-content: flex-end;

          flex: 1;

          @media screen and (max-width: 374px) {
            justify-content: center;
        }
        `}
      >
        <li>
          <StyledLink to="/#about">About</StyledLink>
        </li>
        <li>
          <StyledLink to="/blog">Blog</StyledLink>
        </li>
        <li>
          <StyledLink to="/gallery">Gallery</StyledLink>
        </li>
        <li>
          <StyledLink to="/#contact">Contact</StyledLink>
        </li>
      </ul>
    </section>
  )
}

export default Navigation
