import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LongGlitch from '../images/Long Glitch.jpg'

// Color CSS
let glitchYellow = css`
  color: #FFFF40;
`

let glitchBlue = css`
  color: #5826FF;
`

let glitchRed = css`
  color: #FF392F;
`

let glitchWhite = css`
  color: #FFFFFF;
`

let glitchBlack = css`
  color: #1C1C1C;
`

// Typographic styles
let heroHeaderMobile = css`
  position: relative;
  
  font-weight: 900;
  font-size: 2.25rem;
  line-height: 1.2;
`
const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <section css={css`
      height: 100vh;
      max-height: 667px;

      padding: 0;

      background: url("${LongGlitch}") no-repeat;
      background-size: cover;
      background-position-x: 50%;
    `}>
      <div css={css`
        position: absolute;

        top: 17.67rem;

        width: 100%;
        height: 20%;

        overflow-x: hidden;
      `}>
        <h1 css={css`
          ${glitchYellow}
          ${heroHeaderMobile}
          left: -5%;
        `}>ENERGETIC</h1>
        <h1 css={css`
          ${glitchRed}
          ${heroHeaderMobile}
          left: 20%;
        `}>PASSIONATE</h1>
        <h1 css={css`
          ${glitchBlue}
          ${heroHeaderMobile}
          left: 8%;
        `}>ACTIONABLE</h1>
      </div>
    </section>
    <section css={css`
      background: black;
      
      ${glitchWhite}

    `}>
      <h2 css={css`
        ${glitchYellow}
      `}>INTRO</h2>
      <p>Hi! I’m Long Nguyen, a sophomore front-end developer at the University of Texas, Arlington. I specialize in website, UI/UX design, and graphics development. As a student, I am excited to learn to make some killer apps!</p>
      <p>My skillset for web development include making static sites, implementing CMS’s, and using front-end frameworks like React. For my creative development abilities, I know GLSL, webGL, and openGL for creative graphics programming. I primarily use Figma for my UX Design.</p>
      
      <h2>WORK WITH ME</h2>
      <p>While my official work is with Zeal IT Conslutants, I am available for a project on the side. Feel free to reach out!. I hope we make something cool!</p>

      <div>
        <a>18nguyenl@gmail.com</a>
      </div>
      <div>
        <a>resume</a>
      </div>
    </section>
    <section>
      <h2>SELECTED WORKS</h2>
    </section>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
