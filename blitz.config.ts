import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import { join } from "path"
import fs from "fs"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "hacking-night",
      isAuthorized: simpleRolesIsAuthorized,
      createSession: (session) => {
        return getDb().session.create({
          data: { ...session, userId: session.userId },
        })
      },
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config

// https://github.com/blitz-js/blitz/blob/4f868ad2ac4a6a1ea5d476648ae49441efc12b23/nextjs/packages/next/stdlib-server/auth-sessions.ts#L58
const getDb = () => {
  if (!process.env.BLITZ_APP_DIR) {
    throw new Error("Internal Blitz Error: process.env.BLITZ_APP_DIR is not set")
  }
  const projectRoot = process.env.BLITZ_APP_DIR
  let path = join(projectRoot, ".next/server/blitz-db.js")
  if (!fs.existsSync(path)) {
    path = join(projectRoot, ".next/serverless/blitz-db.js")
  }
  // eslint-disable-next-line no-eval -- block webpack from following this module path
  return (0, eval)("require")(path).default
}
