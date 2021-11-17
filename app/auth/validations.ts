import { z } from "zod"

export const Login = z.object({
  password: z.string(),
})
