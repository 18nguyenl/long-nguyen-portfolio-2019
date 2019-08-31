import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section>
      <div>
        <h1>ENERGETIC</h1>
        <h1>PASSIONATE</h1>
        <h1>ACTIONABLE</h1>
      </div>
    </section>
    <section>
      <h2>INTRO</h2>
      <p>Hi! I’m Long Nguyen, a sophomore front-end developer at the University of Texas, Arlington. I specialize in website, UI/UX design, and graphics development. As a student, I am excited to learn to make some killer apps!</p>
      <p>My skillset for web development include making static sites, implementing CMS’s, and using front-end frameworks like React. For my creative development abilities, I know GLSL, webGL, and openGL for creative graphics programming. I primarily use Figma for my UX Design.</p>
      
      <h2>WORK WITH ME</h2>
      <p>While my official work is with Zeal IT Conslutants, I am available for a project on the side. Feel free to reach out!. I hope we make something cool!</p>

      <a>18nguyenl@gmail.com</a>
      <a>resume</a>
    </section>
    <section>
      <h2>SELECTED WORKS</h2>
    </section>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
