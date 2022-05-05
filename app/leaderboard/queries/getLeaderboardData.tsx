import { resolver } from "blitz"
import db from "db"

export interface Challenge {
  id: number
  name: string
  difficulty: number
}

export interface Team {
  id: number
  name: string
  solvedChallengeIds: number[]
}

export interface LeaderboardData {
  challenges: Challenge[]
  teams: Team[]
}

export default resolver.pipe(resolver.authorize(["ADMIN"]), async () => {
  const teamsFromDb = await db.team.findMany()

  let challenges: Challenge[] = []
  const teams: Team[] = []

  for (const teamFromDb of teamsFromDb) {
    let challengesData
    try {
      challengesData = await fetch(teamFromDb.juiceShopUrl + "/api/Challenges")
        .then((r) => r.json())
        .then((r) => r.data)
    } catch {
      continue
    }

    if (challenges.length === 0) {
      challenges = challengesData.map(({ id, name, difficulty }) => ({ id, name, difficulty }))
    }

    const solvedChallengeIds = challengesData.filter((c) => c.solved).map(({ id }) => id)

    // if (solvedChallengeIds.length > 0) {
    teams.push({
      id: teamFromDb.id,
      name: teamFromDb.name,
      solvedChallengeIds,
    })
    // }
  }

  const allSolvedChallengeIds = new Set(teams.flatMap((t) => t.solvedChallengeIds))
  challenges = challenges
    .filter((c) => allSolvedChallengeIds.has(c.id))
    .sort((a, b) => b.difficulty - a.difficulty)

  const data: LeaderboardData = {
    challenges,
    teams,
  }

  return data
})
