import { BlitzPage, useSession } from "blitz"
import React from "react"
import { Suspense } from "../core/components/Suspense"
import Layout from "../core/layouts/Layout"

const InfoPage: BlitzPage = () => {
  return (
    <Suspense>
      <Info />
    </Suspense>
  )
}

InfoPage.authenticate = { redirectTo: "/login" }
InfoPage.suppressFirstRenderFlicker = true
InfoPage.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default InfoPage

const Info: React.FC = () => {
  const session = useSession()
  if (session.role === "ONBOARDING") {
    return <OnboardingInfo />
  }
  if (session.role === "TEAM") {
    return <TeamInfo />
  }
  return null
}

const OnboardingInfo: React.FC = () => {
  return <>Onboarding Info</>
}

const TeamInfo: React.FC = () => {
  return <>Team Info</>
}
