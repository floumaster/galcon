import { LobbyStatus } from "./LobbyStatus"

export interface LobbyProps {
  id: string
  name: string
  status: LobbyStatus
  playersNumber: number
}