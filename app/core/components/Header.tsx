import { Animator } from "@arwes/animation"
import React, { useEffect, useState } from "react"
import { Text, Button } from "@arwes/core"

export const Header: React.FC = () => {
  const [activate, setActivate] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setActivate(!activate), activate ? 15000 : 1000)
    return () => clearTimeout(timeout)
  }, [activate])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
      <Animator animator={{ activate, manager: "stagger" }}>
        <Text as="h1" style={{ marginBottom: 0 }}>
          IDW Hacking Night
        </Text>
      </Animator>
      <Button onClick={(event) => console.log(event)}>
        <Text>Leaderboard</Text>
      </Button>
      <Button onClick={(event) => console.log(event)}>
        <Text>Info</Text>
      </Button>
      <Button onClick={(event) => console.log(event)}>
        <Text>Admin</Text>
      </Button>
    </div>
  )
}
