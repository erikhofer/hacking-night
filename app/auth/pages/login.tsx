import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import img from "public/login.jpg"
import React from "react"
import { Text, Figure, FrameCorners } from "@arwes/core"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 120,
        gap: 32,
      }}
    >
      <div style={{ width: 500 }}>
        <Figure src={img.src} alt="Login"></Figure>
      </div>
      <div style={{ width: 500, display: "flex", flexDirection: "column" }}>
        <Text as="h2">Login</Text>
        <FrameCorners>
          <LoginForm
            onSuccess={() => {
              const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
              router.push(next)
            }}
          />
        </FrameCorners>
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
