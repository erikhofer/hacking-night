import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSetting = z.object({
  // This accepts type of undefined, but is required at runtime
  key: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetSetting),
  resolver.authorize("ADMIN"),
  async ({ key }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const setting = await db.setting.findFirst({ where: { key } })

    return setting?.value ?? ""
  }
)
