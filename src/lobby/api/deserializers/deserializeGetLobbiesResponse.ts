import { GetLobbyResponse } from "../responses";

export const deserializeGetLobbiesResponse = (lobbiesResponse: GetLobbyResponse[]) => lobbiesResponse.map(lobbyResponse => ({
  id: lobbyResponse.id,
  owner: lobbyResponse.owner,
  state: lobbyResponse.state,
  users: lobbyResponse.users,
}))