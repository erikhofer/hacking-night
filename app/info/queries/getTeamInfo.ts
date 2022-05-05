import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(["TEAM", "ADMIN"]), async () => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const setting = await db.setting.findFirst({ where: { key: "TEAM_INFO" } })

  return setting?.value ?? ""
})
