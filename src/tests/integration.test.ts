import { game } from './../game/Game';
import {GameEventDistribution} from '../game/api/GameEventDistribution';

// Custom type for the mock socket
type MockSocket = {
  emit: jest.Mock,
  on: jest.Mock,
  trigger: (event: string, data: any) => void,
  disconnect: jest.Mock
};

// Mock GameApi
jest.mock('./../game/api/GameApi', () => {
  return {
    GameApi: jest.fn().mockImplementation(() => {
      return {
        authorize: jest.fn((credentials) => {
          return Promise.resolve({ userId: 'test_user', jwtToken: 'test_jwt' });
        }),
        fetchLobbies: jest.fn(() => {
          return Promise.resolve([{ id: 'lobby1' }, { id: 'lobby2' }]);
        }),
      };
    }),
  };
});

// Mock LobbyApi
jest.mock('./../lobby/api/LobbyApi', () => {
  return {
    LobbyApi: jest.fn().mockImplementation((jwtToken) => {
      return {
        getLobbies: jest.fn(() => {
          return Promise.resolve([{
            id: 1,
            owner: { id: 1, username: 'test_user' },
            name: 'Test Lobby 1',
            state: 'open',
            users: [
              { id: 1, username: 'test_user', color: 'blue', isReady: true },
              { id: 2, username: 'test_user2', color: 'red', isReady: false }
            ],
            map: {
              planets: [
                { id: 1, type: 'planet', coordinate: { x: 0, y: 0 }, owner: 1, production: 5, units: 50, radius: 20 },
                { id: 2, type: 'planet', coordinate: { x: 100, y: 100 }, owner: null, production: 2, units: 20, radius: 15 }
              ],
              settings: { speed: 1, width: 500, height: 500 }
            },
            batches: []
          }, {
            id: 2,
            owner: { id: 2, username: 'test_user2' },
            name: 'Test Lobby 2',
            state: 'closed',
            users: [
              { id: 3, username: 'test_user3', color: 'green', isReady: true },
              { id: 4, username: 'test_user4', color: 'yellow', isReady: false }
            ],
            map: {
              planets: [
                { id: 3, type: 'planet', coordinate: { x: 200, y: 200 }, owner: 3, production: 3, units: 30, radius: 25 },
                { id: 4, type: 'planet', coordinate: { x: 300, y: 300 }, owner: null, production: 1, units: 10, radius: 10 }
              ],
              settings: { speed: 2, width: 1000, height: 1000 }
            },
            batches: []
          }]);
        }),
        createLobby: jest.fn(() => {
          return Promise.resolve({
            id: 1,
            owner: { id: 1, username: 'test_user' },
            name: 'New Test Lobby',
            state: 'open',
            users: [
              { id: 1, username: 'test_user', color: 'blue', isReady: true }
            ],
            map: {
              planets: [
                { id: 1, type: 'planet', coordinate: { x: 0, y: 0 }, owner: 1, production: 5, units: 50, radius: 20 }
              ],
              settings: { speed: 1, width: 500, height: 500 }
            },
            batches: []
          });
        }),
        joinLobby: jest.fn((roomId) => {
          return Promise.resolve({
            id: roomId,
            owner: { id: roomId, username: `owner_${roomId}` },
            name: `Joined Test Lobby ${roomId}`,
            state: 'open',
            users: [
              { id: roomId, username: `owner_${roomId}`, color: 'blue', isReady: true },
              { id: roomId + 1, username: `user_${roomId + 1}`, color: 'red', isReady: false }
            ],
            map: {
              planets: [
                { id: 1, type: 'planet', coordinate: { x: 0, y: 0 }, owner: roomId, production: 5, units: 50, radius: 20 }
              ],
              settings: { speed: 1, width: 500, height: 500 }
            },
            batches: []
          });
        }),
      };
    }),
  };
});

// Mock GameEventDistribution
jest.mock('./../game/api/GameEventDistribution', () => {
  return {
    GameEventDistribution: jest.fn().mockImplementation(() => {
      const handlers: { [key: string]: (data: any) => void } = {};
      const socket: MockSocket = {
        emit: jest.fn(),
        on: jest.fn((event: string, handler: (data: any) => void) => {
          handlers[event] = handler;
        }),
        trigger: (event: string, data: any) => {
          if (handlers[event]) {
            handlers[event](data);
          }
        },
        disconnect: jest.fn()
      };
      return {
        socket,
      };
    }),
  };
});

describe('Integration Test', () => {
  let socket: MockSocket;

  beforeEach(() => {
    game.setState('initial');
    game.setUserId('test_user');
    game.currentPlayerName = '';
    game.lobbies.length = 0;

    // Initialize the mock socket with the trigger method
    const handlers: { [key: string]: (data: any) => void } = {};
    socket = {
      emit: jest.fn(),
      on: jest.fn((event: string, handler: (data: any) => void) => {
        handlers[event] = handler;
      }),
      trigger: (event: string, data: any) => {
        if (handlers[event]) {
          handlers[event](data);
        }
      },
      disconnect: jest.fn()
    };

    // Ensure gameEventDistribution is set
    game.gameEventDistribution = {
      socket
    } as unknown as GameEventDistribution;
  });

  test('User authorization and lobby interactions', async () => {
    // Authorize user
    await game.authorize('testUser');
    expect(game.userId).toBe('test_user');
    expect(game.currentPlayerName).toBe('testUser');

    // Fetch lobbies
    await game.fetchLobbies();
    expect(game.state).toBe('lobbyList');
    expect(game.lobbies.length).toBeGreaterThan(0);

    // Create a new lobby
    await game.createLobby();
    expect(game.lobbies).toContainEqual(
      expect.objectContaining({ id: 1, name: 'New Test Lobby' })
    );

    // Join a lobby
    await game.joinLobby(1);
    expect(game.lobbyOwner).toBe('test_user');
    expect(game.state).toBe('pending');

    // Simulate RoomUserLeave event
    socket.trigger('RoomUserLeave', { user: { id: 1 } });
    expect(game.players.length).toBeLessThan(3);

    // Simulate UserReadinessChange event
    socket.trigger('UserReadinessChange', { userId: 1, isReady: true });
    expect(game.players.find(player => player.id === 1)?.isReady).toBe(true);

    // Simulate PlanetsStateChange event
    socket.trigger('PlanetsStateChange', { planets: [{ id: 1, units: 50 }] });
    expect(game.planets.find(planet => planet.id === 1)?.units).toBe(50);

    // Simulate PlanetOccupiedEvent event
    socket.trigger('PlanetOccupiedEvent', { planetId: 1, newOwnerId: 1 });
    expect(game.planets.find(planet => planet.id === 1)?.owner).toBe(1);

    // Simulate BatchCollisionEvent event
    socket.trigger('BatchCollisionEvent', { batchId: 1, planetId: 1, newPlanetUnits: 50 });
    expect(game.planets.find(planet => planet.id === 1)?.units).toBe(50);

    // Simulate disconnect event
    socket.trigger('disconnect', {});
  });
});
