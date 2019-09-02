/**
* Layout component that queries for data
* with Gatsby's useStaticQuery component
*
* See: https://www.gatsbyjs.org/docs/use-static-query/
*/

import React, {Component} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"

import Header from "./header"
import "./layout.css"

import {Curtains} from 'curtainsjs';

class Layout extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loaded: false,
      curtains: null,
    }
    
    this._planes = null
  }
  
  componentDidMount() {
    let curtains = new Curtains("canvas");

    this.setState({ curtains: curtains }, () => {
      this.props.getCurtains(this.state.curtains);
    });
  }

  render() {
    let curtains = this.state.curtains;
    
    return (
      <div id="page-wrap"
        css={css`
          position: relative;
        `}
      >
        <div id="canvas"></div>
        <div id="content"
          css={css`
            position: relative;

            z-index: 15;
          `}
        >
          <Header />
          <main id={this.props.canvasID} curtains={this.state.curtains}>
            {this.props.children}
          </main>
          <footer>copyright © {new Date().getFullYear()}</footer>
        </div>
      </div>
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
    return (<Layout getCurtains={getCurtains}>{children}</Layout>);
  }
  
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  }
  