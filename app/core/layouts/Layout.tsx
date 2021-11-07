import { Animator } from "@arwes/animation"
import { Head, BlitzLayout } from "blitz"
import React from "react"
import { NoSsr } from "../components/NoSsr"
import { useNavigation } from "../hooks/useNavigation"

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  const { navigating } = useNavigation()
  return (
    <>
      <Head>
        <title>{title || "IDW Hacking Night"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NoSsr>
        <Animator animator={{ activate: !navigating, manager: "stagger" }}>{children}</Animator>
      </NoSsr>
    </>
  )
}

export default Layout
