import { FrameHexagon, Table } from "@arwes/core"
import { BlitzPage, useQuery } from "blitz"
import { Suspense } from "../../core/components/Suspense"
import React, { useEffect, useState } from "react"
import Layout from "../../core/layouts/Layout"
import getLeaderboardData from "../queries/getLeaderboardData"
import type { Challenge } from "../queries/getLeaderboardData"
import { Animator } from "@arwes/animation"
import { position } from "polished"

const LeaderboardPage: BlitzPage = () => (
  <Suspense>
    <Leaderboard />
  </Suspense>
)

const Leaderboard: React.FC = () => {
  const [data] = useQuery(getLeaderboardData, {}, { refetchInterval: 5000 })
  const columnWidths = ["20%", ...data.teams.map((t) => `${80 / data.teams.length}%`)]

  useEffect(() => {
    const max = document.body.scrollHeight - document.documentElement.clientHeight
    // const max = Math.max(
    //   document.body.scrollHeight,
    //   document.body.offsetHeight,
    //   document.documentElement.clientHeight,
    //   document.documentElement.scrollHeight,
    //   document.documentElement.offsetHeight
    // )
    let curr = 0
    let dir = 1
    const interval = setInterval(() => {
      if (curr >= max) {
        dir = -1
      } else if (curr <= 0) {
        dir = 1
      }
      window.scrollTo({ top: curr, behavior: "smooth" })
      curr += dir * 1
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // useEffect(() => {
  //   let timeout
  //   if (!animatorActive) {
  //     timeout = setTimeout(() => setAnimatorActive(true), 1000)
  //   }
  //   return () => clearTimeout(timeout)
  // }, [animatorActive])

  const headers = [
    { id: "challenge", data: "Challenge" },
    ...data.teams.map((team) => ({ id: team.id, data: team.name })),
  ]

  const dataset = data.challenges.map((challenge) => ({
    id: challenge.id,
    columns: [
      { id: "challenge", data: <ChallengeComponent challenge={challenge} key={challenge.id} /> },
      ...data.teams.map((team) => ({
        id: team.id,
        data: (
          <SolvedComponent solved={team.solvedChallengeIds.includes(challenge.id)} key={team.id} />
        ),
      })),
    ],
  }))

  return (
    <div>
      <style>
        {`
        .arwes-table {
          overflow: unset;
        }
        .arwes-table__row--header {
          position: sticky;
          top: 10px;
          opacity: 1 !important;
        }
        `}
      </style>
      <Table
        headers={headers}
        dataset={dataset}
        columnWidths={columnWidths}
        animator={{ animate: false /* With animation, updating the content doesn#t work... */ }}
      />
    </div>
  )
}

LeaderboardPage.suppressFirstRenderFlicker = true
LeaderboardPage.getLayout = (page) => <Layout title="Leaderboard">{page}</Layout>

export default LeaderboardPage

const ChallengeComponent: React.FC<{ challenge: Challenge }> = (props) => {
  const { difficulty, name } = props.challenge
  return (
    <div style={{ display: "flex", height: 42, alignItems: "center", gap: 16 }}>
      <div style={{ width: 70, textAlign: "center" }}>
        {new Array(difficulty).fill(0).map((_, i) => (
          <span key={i}>
            ⭐{(difficulty === 4 && i === 1) || (difficulty > 4 && i == 2) ? <br /> : null}
          </span>
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