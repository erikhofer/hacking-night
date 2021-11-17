import React, { useEffect, useState } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import hacker from "public/hacker.jpg"
import { Figure, Text } from "@arwes/core"

const Home: BlitzPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        gap: 32,
      }}
    >
      <div style={{ width: 800 }}>
        <Figure src={hacker.src} alt="Hacker" fluid></Figure>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 32,
          alignItems: "center",
          fontSize: "120%",
        }}
      >
        <Text as="h2">
          <u>Willkommen zur IDW Hacking Night</u>
        </Text>
        <Text as="h3">Sommersemester 2022</Text>
        <Text as="blockquote">Wie hacke ich Online-Systeme?</Text>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
