/**
* Layout component that queries for data
* with Gatsby's useStaticQuery component
*
* See: https://www.gatsbyjs.org/docs/use-static-query/
*/

import React, {Component} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

import {Curtains} from 'curtainsjs';

// let planeElement = document.getElementsByClassName("plane")

// let planes = Array.from(planeElement).map((e) => {
//     curtains.addPlane(e, planeParams);
// })

// // if our plane has been successfully created
// if(planes[0]) {
//     planes[0].onRender(function() {
//     // use the onRender method of our plane fired at each requestAnimationFrame call
//     planes[0].uniforms.time.value++; // update our time uniform value
//     });
// }

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
    this.setState({ curtains: curtains });
    this.props.getCurtains(curtains);
  }
  
  render() {
    let curtains = this.state.curtains;
    
    return (
      <>
      {/* <div id="canvas"></div> */}
      <Header />
      <main id={this.props.canvasID} curtains={curtains}>{this.props.children}</main>
      <footer>copyright © {new Date().getFullYear()}</footer>
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
    return (<Layout getCurtains={getCurtains}>{children}</Layout>);
  }
  
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  }
  