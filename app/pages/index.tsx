import React from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import hacker from "public/hacker.jpg"
import { Figure, Text } from "@arwes/core"

const Home: BlitzPage = () => {
  return (
    <div style={{ display: "flex", gap: 64 }}>
      <div style={{ width: 800 }}>
        <Figure src={hacker.src} alt="Hacker" fluid>
          Hacking (Symbolbild)
        </Figure>
      </div>
      <div>
        <Text as="h2" blink>
          Willkommen zur IDW Hacking Night
        </Text>
        <br />
        <Text as="h3" blink>
          Sommersemester 2022
        </Text>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
