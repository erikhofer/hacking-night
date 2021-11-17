import { Animator } from "@arwes/animation"
import React, { useEffect, useState } from "react"
import { Text, Button } from "@arwes/core"
import { useNavigation } from "../hooks/useNavigation"
import { NoSsr } from "./NoSsr"
import logout from "../../auth/mutations/logout"
import { useMutation, useSession } from "blitz"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

export const Header: React.FC = () => {
  const [activate, setActivate] = useState(true)
  const { navigateTo } = useNavigation()

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), activate ? 15000 : 1000)
    return () => clearTimeout(timeout)
  }, [activate])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
      <NoSsr>
        <Animator animator={{ activate, manager: "stagger" }}>
          <Text as="h1" style={{ marginBottom: 0 }}>
            IDW Hacking Night
          </Text>
        </Animator>
        <Button onClick={() => navigateTo("/")}>
          <Text>Home</Text>
        </Button>
        <Button onClick={() => navigateTo("/leaderboard")}>
          <Text>Leaderboard</Text>
        </Button>
        <Button onClick={() => navigateTo("/info")}>
          <Text>Info</Text>
        </Button>
        <UserInfo />
      </NoSsr>
    </div>
  )
}

const UserInfo: React.FC = () => {
  const { navigateTo } = useNavigation()
  const session = useSession()
  const [logoutMutation] = useMutation(logout)

  if (session.isLoading) return null

  if (session.userId) {
    return (
      <>
        {session.role === "ADMIN" ? (
          <Button onClick={() => navigateTo("/admin")}>
            <Text>Admin</Text>
          </Button>
        ) : null}
        <div style={{ flexGrow: 1 }}></div>
        <FontAwesomeIcon icon={faUserCircle} size="2x" />
        <Text style={{ marginBottom: 0 }}>{session.userId}</Text>
        <Button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          <Text>Logout</Text>
        </Button>
      </>
    )
  } else {
    return (
      <>
        <div style={{ flexGrow: 1 }}></div>
        <Button onClick={() => navigateTo("/login")}>
          <Text>Login</Text>
        </Button>
      </>
    )
  }
}
