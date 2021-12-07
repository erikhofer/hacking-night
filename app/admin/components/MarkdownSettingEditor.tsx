import React, { useState } from "react"
import { Setting } from "../../../types"
import TextareaAutosize from "react-textarea-autosize"
import { useNotifications } from "../../core/hooks/useNotifications"
import { Button } from "@arwes/core"
import { Markdown } from "../../core/components/Markdown"
import getSetting from "../queries/getSetting"
import { useQuery, useMutation } from "blitz"
import updateSetting from "../mutations/updateSetting"

export const MarkdownSettingEditor: React.FC<{ settingKey: Setting["key"] }> = ({
  settingKey: key,
}) => {
  const [persistentValue] = useQuery(getSetting, { key })
  const [updateValue] = useMutation(updateSetting)
  const notifications = useNotifications()
  const [value, setValue] = useState(persistentValue)
  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ width: "50%" }}>
        <TextareaAutosize value={value} onChange={(e) => setValue(e.target.value)} />
        {/* Arwes-Button funktioniert hier irgendwie nicht zusammen mit dem Query 🤔 */}
        <button
          onClick={async () => {
            await updateValue({ key, value })
            notifications.sucess("Gespeichert")
          }}
        >
          Speichern
        </button>
      </div>
      <div style={{ width: "50%" }}>
        <Markdown content={value}></Markdown>
      </div>
    </div>
  )
}
