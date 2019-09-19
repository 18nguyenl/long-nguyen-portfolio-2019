/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"

import Header from "./header"
import Navigation from "./navigation_menu"
import "./layout.css"

import { Curtains } from "curtainsjs"
import { lerp } from "../library/MathUtil"
import TweenMax from "gsap"
import { brotliDecompressSync } from "zlib"

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      curtains: null,
    }

    this._planes = null
    this.scrollOptions = {
      damping: 0.1,
      renderByPixels: true,
      thumbMinSize: 0,
    }
    this.cache = []
    this.content = null;
    this.elems = null;
  }

  // Set the document height based on the height of the scrollable elements
  setHeight() {
    document.body.style.height =  this.content.scrollHeight + 'px';
  }

  // Add metadata for each scrolling element
  setCache() {
    this.elems.forEach(elem => {
      const elemCache = {}

      // The actual element
      elemCache.el = elem

      // Starting position
      elemCache.sy = 0

      // Changed position initialized as starting position
      elemCache.dy = elemCache.sy

      // wat
      elemCache.ease = elem.dataset.ease

      // element parallax value
      elemCache.parallax = 1.0

      // Add this to the list of scrolling element objects
      this.cache.push(elemCache)
    })
  }

  // The event handler on when we scroll
  scroll() {
    // Iterate through scrolling element objects and update
    // metadata for the starting position
    this.cache.forEach(el => {
      el.sy = window.scrollY
    })
  }

  // The render loop that animates the lerp scroll
  transformElem() {
    // Iterate through each object w/ index in mind
    this.cache.forEach((elem, i) => {
      // Calculate an ease value based on element index
      // ease will be used in lerp as the progress betweem
      // the two values
      const ease = `0.1${i}`

      // Calculate the element's change in position based
      // on the progress between the starting and changed
      // position
      elem.dy = lerp(elem.dy, elem.sy, ease)

      // Scale the scroll change up
      elem.dy = Math.floor(elem.dy * 100) / 100

      // Set the actual change
      TweenMax.set(elem.el, { y: -elem.dy * .5 })
    })

    // After updating all scrolling element metadata
    // Animate the changes
    window.requestAnimationFrame(this.transformElem.bind(this))
  }

  init() {
    this.setHeight()
    this.setCache()

    window.addEventListener("scroll", this.scroll.bind(this))
    window.requestAnimationFrame(this.transformElem.bind(this))
  }

  componentDidMount() {
    let curtains = new Curtains("canvas")

    this.content = document.querySelector("[data-scroll]")
    this.elems = [...document.querySelectorAll("[data-scroll-content]")]
    this.canvas = document.getElementById("canvas");
    
    this.setState({ curtains: curtains }, () => {
      this.props.getCurtains(this.state.curtains)
    })

    this.init()
  }

  componentDidUpdate() {
    this.setHeight();
  }

  render() {
    return (
      <>
        <div id="page-wrap" data-scroll
          css={css`
            position: fixed;
            left: 0;
            top: 0;
            overflow: hidden;
          `}
        >
          <div id="canvas"></div>
          <div
            data-scroll-content
            id="content"
            css={css`
              position: relative;

              z-index: 16;
            `}
          >
            <Header data-scroll-content />
            <main
              data-scroll-content
              id={this.props.canvasID}
              curtains={this.state.curtains}
            >
              {this.props.children}
            </main>
            <footer data-scroll-content>
              copyright © {new Date().getFullYear()}
            </footer>
          </div>
        </div>
      </>
    )
  }
}

export default ({ children, getCurtains }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return <Layout getCurtains={getCurtains}>{children}</Layout>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
