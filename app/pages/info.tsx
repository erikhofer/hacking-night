import { BlitzPage } from "blitz"
import React from "react"
import Layout from "../core/layouts/Layout"

const Info: BlitzPage = () => {
  return <p>Das ist die Info</p>
}

Info.suppressFirstRenderFlicker = true
Info.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Info
