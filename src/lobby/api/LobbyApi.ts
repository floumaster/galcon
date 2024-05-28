import { API_ROOT } from 'const/apiRoot'
import fetch from 'node-fetch'
import * as Deserializers from './deserializers'
import { GetLobbyResponse } from './responses';

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
    const responseBody = await response.json() as GetLobbyResponse[]
    return Deserializers.deserializeGetLobbiesResponse(responseBody)
  }

  public async createLobby() {
    const response = await fetch(`${API_ROOT}/rooms`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this.jwtToken}`,
      },
    })
    const responseBody = await response.json() as GetLobbyResponse
    return Deserializers.deserializeCreateLobbyResponse(responseBody)
  }

  public async joinLobby(roomId: number) {
    const response = await fetch(`${API_ROOT}/rooms/${roomId}`, {
      headers: {
        "Authorization": `Bearer ${this.jwtToken}`,
      },
    })
    const responseBody = await response.json() as GetLobbyResponse
    return Deserializers.deserializeCreateLobbyResponse(responseBody)
  }
}