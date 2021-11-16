import { Button, Table } from "@arwes/core"
import { BlitzPage, useQuery } from "blitz"
import React, { useState } from "react"
import { Suspense } from "../../core/components/Suspense"
import { Markdown } from "../../core/components/Markdown"
import Layout from "../../core/layouts/Layout"
import getTeams from "../queries/getTeams"
import TextareaAutosize from "react-textarea-autosize"
import { useNotifications } from "../../core/hooks/useNotifications"

const teamTableHeaders = [
  { id: "name", data: "Name" },
  { id: "password", data: "Passwort" },
  { id: "juiceShopUrl", data: "Juice Shop" },
  { id: "actions", data: "Aktionen" },
]

const TeamsTable: React.FC = () => {
  const [{ teams }] = useQuery(getTeams, {})
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null)

  const dataset = teams.map((team) =>
    team.id == editingTeamId
      ? {
          id: team.id,
          columns: [
            { id: "name", data: <input value={team.name} /> },
            { id: "password", data: <input value={team.password} /> },
            { id: "juiceShopUrl", data: <input value={team.juiceShopUrl} /> },
            {
              id: "actions",
              data: (
                <>
                  <Button onClick={() => setEditingTeamId(null)}>Abbrechen</Button>
                  <Button>Speichern</Button>
                </>
              ),
            },
          ],
        }
      : {
          id: team.id,
          columns: [
            { id: "name", data: team.name },
            { id: "password", data: team.password },
            { id: "juiceShopUrl", data: team.juiceShopUrl },
            {
              id: "actions",
              data: editingTeamId ? null : (
                <>
                  <Button>Löschen</Button>
                  <Button onClick={() => setEditingTeamId(team.id)}>Bearbeiten</Button>
                </>
              ),
            },
          ],
        }
  )

  return <Table headers={teamTableHeaders} dataset={dataset} />
}

const InfoSection: React.FC = () => {
  const notifications = useNotifications()
  const [info, setInfo] = useState(
    "# Das ist ein Test\nJa *lol* ey\n https://github.com/remarkjs/react-markdown"
  )
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ width: "50%" }}>
        <TextareaAutosize value={info} onChange={(e) => setInfo(e.target.value)} />
        <Button palette="success" onClick={() => notifications.sucess("Info gespeichert")}>
          Speichern
        </Button>
      </div>
      <div style={{ width: "50%" }}>
        <Markdown content={info}></Markdown>
      </div>
    </div>
  )
}

const AdminPage: BlitzPage = () => {
  return (
    <>
      <h2>Teams</h2>
      <Suspense>
        <TeamsTable />
      </Suspense>
      <h2>Info</h2>
      <Suspense>
        <InfoSection />
      </Suspense>
    </>
  )
}

AdminPage.suppressFirstRenderFlicker = true
AdminPage.getLayout = (page) => <Layout title="Admin">{page}</Layout>

export default AdminPage
