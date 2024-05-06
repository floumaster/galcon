import { GetLobbyResponse } from "../responses";

export const deserializeCreateLobbyResponse = (lobbyResponse: GetLobbyResponse) => ({
  id: lobbyResponse.id,
  owner: lobbyResponse.owner,
  state: lobbyResponse.state,
  users: lobbyResponse.users,
})