import * as Deserializers from './deserializers'
import { API_ROOT } from "const"
import { AuthorizeParams } from "game/AuthorizeParams"

export class GameApi {
  public constructor() { }

  public async authorize(params: AuthorizeParams) {
    const response = await fetch(`${API_ROOT}/users/start`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params),
    })
    const responseBody = await response.json()
    return Deserializers.deserializeAuthorize(responseBody)
  }
}