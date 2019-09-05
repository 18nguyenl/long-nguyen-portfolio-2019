import React, { Component } from "react"
import ReactDOM from "react-dom"
import { StaticQuery, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { css } from "@emotion/core"
import {Curtains} from 'curtainsjs';

import { TweenMax, Expo, Power2, Power3 } from "gsap"

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
  alwaysDraw: true,
  vertexShader: waveVShader, // our vertex shader ID
  fragmentShader: waveFShader, // our framgent shader ID
  uniforms: {
    time: {
      name: "uTime", // uniform name that will be passed to our shaders
      type: "1f", // this means our uniform is a float
      value: 0,
    },
    power: {
      name: "uPower",
      type: "1f",
      value: 0,
    }
  }
};

export default class Image extends Component {
  constructor( props ) {
    super(props);

    this._planes = null;
    this.scroll = this.props.scroll;
  }
  
  componentDidMount() {
    this.registerPlaneElement()
      // if we got our curtains object, create the plane
      this.props.curtains && this.createPlanes(this.props.curtains);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // if we haven't got our curtains object before but got it now, create the plane
    if(!this.props.curtains && nextProps.curtains) {
        this.createPlanes(nextProps.curtains);
        return true 
    } else return false
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
          let planes = this._planes;

          function getScrollInfo () {
            return this.props.scroll;
          }

          let scrollBefore = window.scrollY;
          let scrollY = window.scrollY;
          let deltaY = 0;
          let isAnimating = false;

          if (this._planes) {
            this._planes.onRender(function() {
              scrollY = window.scrollY;
              
              deltaY = scrollY - scrollBefore;
              if (deltaY > 15) {
                deltaY = 15;
              } else if (deltaY < -15)
                deltaY = -15

              scrollBefore = scrollY;

              this.uniforms.time.value++;
              
              TweenMax.to(this.uniforms.power, 0.1, { value: deltaY, ease: Power3.easeInOut, onComplete: () => {
                isAnimating = false;
              }})
              if (!isAnimating) {
                isAnimating = true;
              }

              planes.updatePosition();
            });
          }
      }
  }
  
  // register our plane element ref
  registerPlaneElement(el) {
      // this.planeElement = el;
      this.planeElement = ReactDOM.findDOMNode(this);
  }

  render() {
    return (
      <div
        className="plane"
        css={css`
          margin-bottom: 1.89rem;

          height: 100%;
          max-height: 667px;

          @media only screen and (min-width: 425px) {
            max-height: 1024px;
          }

          ${this.props.ocss}
        `}
      >
        <img
          css={css`
            visibility: hidden;
            object-fit: cover;

            width: 100%;
            height: 100%;
            max-height: 667px;

            @media only screen and (min-width: 425px) {
              max-height: 1024px;
              object-fit: contain;
            }
          `}
          src={`./images/${this.props.src}`}
          data-sampler="uSampler0"
        />
      </div>
    )
  }
} 
