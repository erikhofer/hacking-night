import { Notyf } from "notyf"
import { useEffect } from "react"

let notyf: Notyf

export function useNotifications() {
  useEffect(() => {
    // Intanz kann erst im Client erstellt werden
    if (!notyf) notyf = new Notyf({ position: { x: "center", y: "bottom" } })
  })
  return {
    sucess: (message: string) => {
      notyf.success(message)
    },
    error: (message: string) => {
      notyf.error(message)
    },
  }
}
