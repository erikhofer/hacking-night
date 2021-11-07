import { Animator } from "@arwes/animation"
import React, { useEffect, useState } from "react"
import { Text, Button } from "@arwes/core"
import { useNavigation } from "../hooks/useNavigation"
import { NoSsr } from "./NoSsr"

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
        <Button onClick={() => navigateTo("/admin")}>
          <Text>Admin</Text>
        </Button>
      </NoSsr>
    </div>
  )
}
