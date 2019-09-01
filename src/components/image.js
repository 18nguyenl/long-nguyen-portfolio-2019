import React, { Component } from "react"
import ReactDOM from "react-dom"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import {Curtains} from 'curtainsjs';

import waveVShader from "../shaders/wave.vert"
import waveFShader from "../shaders/wave.frag"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

// default plane params
const planeParams = {
  widthSegments: 20,
  heightSegments: 20,
  vertexShader: waveVShader, // our vertex shader ID
  fragmentShader: waveFShader, // our framgent shader ID
  uniforms: {
    time: {
      name: "uTime", // uniform name that will be passed to our shaders
      type: "1f", // this means our uniform is a float
      value: 0,
    },
  }
};

function renderImage(file, ref) {
  return (
  <>
    <Img 
    className="plane"
    css={css`
      margin-bottom: 1.89rem;
    `}
    ref={ref}
    fluid={file.node.childImageSharp.fluid}
    />
  </>
  )
}

let FluidImage = React.forwardRef((props, ref) => {
  return <StaticQuery
    query={graphql`
      query {
      images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
      edges {
        node {
          extension
          relativePath
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    }
    `}
    render={({ images }) => renderImage(images.edges.find(image => image.node.relativePath === props.src), ref)}
  />
})

export default class Image extends Component {
  constructor( props ) {
    super(props);

    this.ref = React.createRef();

    this._planes = null;
  }
  
  componentDidMount() {
    this.registerPlaneElement()
      // if we got our curtains object, create the plane
      this.props.curtains && this.createPlanes(this.props.curtains);
  }
  
  componentWillUpdate(nextProps, nextState) {
    // if we haven't got our curtains object before but got it now, create the plane
    if(!this.props.curtains && nextProps.curtains) {
        this.createPlanes(nextProps.curtains);
    }
  }

  
  componentWillUnmount() {
      // remove the plane before unmounting component
      if(this.props.curtains && this._planes) {
          this.props.curtains.removePlane(this._planes);
          this._planes = null;
      }
  }
  
  createPlanes(curtains) {
      // create our plane
      if(curtains) {
          this._planes = curtains.addPlane(this.planeElement, planeParams);

          this._planes.onRender(function() {
              this.uniforms.time.value++;
          });
      }
  }
  
  // register our plane element ref
  registerPlaneElement(el) {
      // this.planeElement = el;
      this.planeElement = ReactDOM.findDOMNode(this);
  }

  render() {
    return (
    <FluidImage
      className="plane"
      ref={this.ref}
      src={this.props.src}
    />
    )
  }
} 
