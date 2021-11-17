import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import { Role } from "types"

const onboardingPassword = "123"
const adminPassword = "456"

export default resolver.pipe(resolver.zod(Login), async ({ password }, ctx) => {
  // ⚠ We deliberately don't use password hashing

  if (password === onboardingPassword) {
    await ctx.session.$create({ userId: "onboarding", role: "ONBOARDING" })
    return
  }

  if (password === adminPassword) {
    await ctx.session.$create({ userId: "admin", role: "ADMIN" })
    return
  }

  const team = await db.team.findFirst({ where: { password } })

  if (team) {
    await ctx.session.$create({ userId: "team" + team.id, role: "TEAM", teamId: team.id })
    return
  }

  throw new AuthenticationError()
})
