import { API_ROOT } from 'const/apiRoot'
import * as Deserializers from './deserializers'

export class LobbyApi {

  private jwtToken: string

  public constructor(
    jwtToken: string
  ) {
    this.jwtToken = jwtToken
  }

  public async getLobbies() {
    const response = await fetch(`${API_ROOT}/rooms`, {
      headers: {
        "Authorization": `Bearer ${this.jwtToken}`,
      },
    })
    const responseBody = await response.json()
    return Deserializers.deserializeGetLobbiesResponse(responseBody)
  }

  public async createLobby() {
    const response = await fetch(`${API_ROOT}/rooms`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this.jwtToken}`,
      },
    })
    const responseBody = await response.json()
    return Deserializers.deserializeCreateLobbyResponse(responseBody)
  }

  public async joinLobby(roomId: number) {
    const response = await fetch(`${API_ROOT}/rooms/${roomId}`, {
      headers: {
        "Authorization": `Bearer ${this.jwtToken}`,
      },
    })
    const responseBody = await response.json()
    return Deserializers.deserializeCreateLobbyResponse(responseBody)
  }
}