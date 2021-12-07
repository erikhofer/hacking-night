import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSetting = z.object({
  key: z.string(),
  value: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSetting),
  resolver.authorize("ADMIN"),
  async ({ key, ...data }) => {
    const setting = await db.setting.upsert({
      where: { key },
      update: data,
      create: { key, ...data },
    })
    return setting
  }
)
