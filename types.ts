import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { Team } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "TEAM" | "ONBOARDING"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: string
      teamId?: Team["id"]
      role: Role
    }
  }
}
