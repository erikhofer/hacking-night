import { Button, FrameHexagon, Table } from "@arwes/core"
import { BlitzPage } from "blitz"
import React from "react"
import Layout from "../core/layouts/Layout"

interface Challenge {
  name: string
  level: number
}

const challenges: Challenge[] = [
  { level: 1, name: "Challenge 1" },
  { level: 2, name: "Challenge 2" },
  { level: 3, name: "Challenge 3" },
  { level: 4, name: "Challenge 4" },
  { level: 5, name: "Challenge 5" },
  { level: 6, name: "Challenge 6" },
]

const teams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const LeaderboardPage: BlitzPage = () => {
  const columnWidths = ["20%", ...teams.map((t) => `${80 / teams.length}%`)]

  const headers = [
    { id: "challenge", data: "Challenge" },
    ...teams.map((t) => ({ id: t, data: "Team " + t })),
  ]

  const dataset = challenges.map((challenge, index) => ({
    id: index,
    columns: [
      { id: "challenge", data: <ChallengeComponent challenge={challenge} /> },
      ...teams.map((t) => ({
        id: t,
        data: <SolvedComponent solved={Math.random() < 0.3} />,
      })),
    ],
  }))

  return (
    <div>
      <Table headers={headers} dataset={dataset} columnWidths={columnWidths} />
    </div>
  )
}

LeaderboardPage.suppressFirstRenderFlicker = true
LeaderboardPage.getLayout = (page) => <Layout title="Leaderboard">{page}</Layout>

export default LeaderboardPage

const ChallengeComponent: React.FC<{ challenge: Challenge }> = (props) => {
  const { level, name } = props.challenge
  return (
    <div style={{ display: "flex", height: 42, alignItems: "center", gap: 16 }}>
      <div style={{ width: 70, textAlign: "center" }}>
        {new Array(level).fill(0).map((_, i) => (
          <>⭐{(level === 4 && i === 1) || (level > 4 && i == 2) ? <br /> : null}</>
        ))}
      </div>
      <div style={{ fontSize: 16 }}>{name}</div>
    </div>
  )
}

const SolvedComponent: React.FC<{ solved: boolean }> = ({ solved }) => {
  return solved ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* @ts-ignore */}
      <FrameHexagon palette="success">✔</FrameHexagon>
    </div>
  ) : null
}
