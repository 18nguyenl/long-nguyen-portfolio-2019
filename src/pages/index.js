import React, {Component} from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import * as settingCSS from "../components/settings.css"

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCurtain: null,
      scroll: {
        YBefore: 0,
        Y: 0,
        delta: 0,
      },
    }

    this.getCurtains = this.getCurtains.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount = () => {
    window.onscroll = this.handleScroll;
  }

  handleScroll = function() {
    this.setState({
      scroll: {
        YBefore: this.state.scroll.Y,
        Y: window.scrollY,
        delta: window.scrollY - this.state.scroll.YBefore,
      }
    })
  }

  getCurtains (curtains) {
    this.setState({mainCurtain: curtains});
  }
  
  render() {
    // console.log(this.state.scroll.delta)
    return (
      <>
        <div
          css={css`
            /* We're probably going to use a canvas texture to overlay on the current texture for the text */
            display: none;
            position: absolute;
            z-index: 20;

            top: 17.67rem;

            width: 100%;
            height: 20%;

            overflow: hidden;
          `}
        >
          <h1
            css={css`
              ${settingCSS.glitchYellow}
              ${settingCSS.heroHeaderMobile}
            
            left: -5%;

              margin-bottom: 0;
            `}
          >
            ENERGETIC
          </h1>
          <h1
            css={css`
              ${settingCSS.glitchRed}
              ${settingCSS.heroHeaderMobile}
            
            left: 20%;

              margin-bottom: 0;
            `}
          >
            PASSIONATE
          </h1>
          <h1
            css={css`
              ${settingCSS.glitchBlue}
              ${settingCSS.heroHeaderMobile}
            
            left: 8%;

              margin-bottom: 0;
            `}
          >
            ACTIONABLE
          </h1>
        </div>
        <Layout getCurtains={this.getCurtains}>
          <SEO title="Home" />
          <section
            css={css`
              height: auto;
              max-height: 667px;

              padding: 0;

              background: linear-gradient(180deg, transparent 50%, black 50%);

              @media only screen and (min-width: 425px) {
                max-height: 1024px;
              }
            `}
          >
            <Image
              ocss={css`
                margin-bottom: 0px;

                object-fit: cover;
                object-position: 50% auto;
              `}
              src="Long Glitch.jpg"
              curtains={this.state.mainCurtain}
              scroll={this.state.scroll}
            />
          </section>
          <section
            css={css`
              background: black;

              ${settingCSS.glitchWhite}

              padding: 3rem 1.5rem;

              opacity: 1;

              @media only screen and (min-width: 425px) {
                padding: 4.5rem 2.25rem;
              }
            `}
          >
            <h2
              css={css`
                ${settingCSS.glitchYellow}
              `}
            >
              INTRO
            </h2>
            <p>
              Hi! I’m Long Nguyen, a sophomore front-end developer at the
              University of Texas, Arlington. I specialize in website, UI/UX
              design, and graphics development. As a student, I am excited to
              learn to make some killer apps!
            </p>
            <p>
              My skillset for web development include making static sites,
              implementing CMS’s, and using front-end frameworks like React. For
              my creative development abilities, I know GLSL, webGL, and openGL
              for creative graphics programming. I primarily use Figma for my UX
              Design.
            </p>

            <Image
              ocss={css`
                max-height: 770px;
              `}
              src="edgy picture.jpg"
              curtains={this.state.mainCurtain}
              scroll={this.state.scroll}
            />

            <h2
              css={css`
                ${settingCSS.glitchYellow}
              `}
            >
              WORK WITH ME
            </h2>
            <p
              css={css`
                margin-bottom: 1.5rem;
              `}
            >
              While my official work is with Zeal IT Conslutants, I am available
              for a project on the side. Feel free to reach out!. I hope we make
              something cool!
            </p>

            <div>
              <a
                css={css`
                  ${settingCSS.anchor}
                `}
                href="mailto:18nguyenl@gmail.com"
              >
                18nguyenl@gmail.com
              </a>
            </div>
            <div>
              <a
                css={css`
                  ${settingCSS.anchor}
                `}
                href="LongNguyenResume CS.pdf"
                download
              >
                resume
              </a>
            </div>
          </section>
          <section>
            <h2
              css={css`
                ${settingCSS.glitchBlue}

                margin-bottom: 1.5rem;
              `}
            >
              SELECTED WORKS
            </h2>
            {this.props.data.allMdx.edges.map(({ node }) => (
              <h3
                css={css`
                  color: white;
                  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000,
                    -1px 1px 0 #000, 1px 1px 0 #000;
                  transition: color 600ms cubic-bezier(0.115, 0.905, 0.32, 1);

                  &:hover {
                    text-shadow: none;

                    ${settingCSS.glitchRed}
                  }

                   @media only screen and (min-width: 425px) {
                    font-size: 2.25rem;
                  }

                  @media only screen and (min-width: 600px) {
                    font-size: 3.375rem;
                  }

                  @media only screen and (min-width: 1024px) {
                    font-size: 5.06rem;
                  }
                `}
                key={node.id}
              >
                {node.frontmatter.title}
              </h3>
            ))}
          </section>
          <div
            css={css`
              padding: 0 1.5rem;
              margin-bottom: 4.5rem;

              font-weight: 900;
              font-style: normal;
              font-size: 16.25vw;
              line-height: 1;
            `}
          >
            Long
            <br />
            Nguyen
          </div>
        </Layout>
      </>
    )
  }
}

export const pageQuery = graphql`
  query CaseStudies {
    allMdx {
      edges {
        node {
          frontmatter {
            title
          }
          body
          id
        }
      }
    }
    images: allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
      edges {
        node {
          extension
          relativePath
        }
      }
    }
  }
`

export default IndexPage
