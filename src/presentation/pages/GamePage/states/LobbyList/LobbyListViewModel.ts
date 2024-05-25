import { makeAutoObservable } from 'mobx';
import { game } from 'game';

export class LobbyListViewModel {

  private _selectedLobbyId = -1;

  public get selectedLobbyId() {
    return this._selectedLobbyId;
  }

  public selectLobbyId(lobyyId: number) {
    this._selectedLobbyId = lobyyId;
  }

  public constructor() {
    game.fetchLobbies();
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public get lobbies() {
    return game.lobbies;
  }

  public createLobby() {
    game.createLobby();
  }

  public joinLobby() {
    game.joinLobby(this._selectedLobbyId);
  }
}