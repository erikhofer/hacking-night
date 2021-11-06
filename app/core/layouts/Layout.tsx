import { Animator } from "@arwes/animation"
import { Head, BlitzLayout } from "blitz"
import React from "react"
import { useNavigation } from "../hooks/useNavigation"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const { navigating } = useNavigation()
  return (
    <>
      <Head>
        <title>{title || "IDW Hacking Night"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Animator animator={{ activate: !navigating, manager: "stagger" }}>{children}</Animator>
    </>
  )
}

export default Layout
