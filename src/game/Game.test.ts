import {game} from './Game';
//import { GameApi } from './api/GameApi';

jest.mock('./api/GameApi', () => {
    return {
        GameApi: jest.fn().mockImplementation(() => {
            return {
                authorize: jest.fn((credentials) => {
                    console.log(credentials);
                    return Promise.resolve({userId: 'test_user'});
                }),
                fetchLobbies: jest.fn(() => {
                    return Promise.resolve([{id: 1}, {id: 2}]);
                }),
            };
        }),
    };
});

// Mock LobbyApi
jest.mock('./../lobby/api/LobbyApi', () => {
    return {
        LobbyApi: jest.fn().mockImplementation((jwtToken) => {
            console.log(jwtToken);
            return {
                getLobbies: jest.fn(() => {
                    return Promise.resolve([{
                        id: 1,
                        owner: {id: 1, username: 'test_user'},
                        name: 'Test Lobby 1',
                        state: 'open',
                        users: [
                            {id: 1, username: 'test_user', color: 'blue', isReady: true},
                            {id: 2, username: 'test_user2', color: 'red', isReady: false}
                        ],
                        map: {
                            planets: [
                                {
                                    id: 1,
                                    type: 'planet',
                                    coordinate: {x: 0, y: 0},
                                    owner: 1,
                                    production: 5,
                                    units: 50,
                                    radius: 20
                                },
                                {
                                    id: 2,
                                    type: 'planet',
                                    coordinate: {x: 100, y: 100},
                                    owner: null,
                                    production: 2,
                                    units: 20,
                                    radius: 15
                                }
                            ],
                            settings: {speed: 1, width: 500, height: 500}
                        },
                        batches: []
                    }, {
                        id: 2,
                        owner: {id: 2, username: 'test_user2'},
                        name: 'Test Lobby 2',
                        state: 'closed',
                        users: [
                            {id: 3, username: 'test_user3', color: 'green', isReady: true},
                            {id: 4, username: 'test_user4', color: 'yellow', isReady: false}
                        ],
                        map: {
                            planets: [
                                {
                                    id: 3,
                                    type: 'planet',
                                    coordinate: {x: 200, y: 200},
                                    owner: 3,
                                    production: 3,
                                    units: 30,
                                    radius: 25
                                },
                                {
                                    id: 4,
                                    type: 'planet',
                                    coordinate: {x: 300, y: 300},
                                    owner: null,
                                    production: 1,
                                    units: 10,
                                    radius: 10
                                }
                            ],
                            settings: {speed: 2, width: 1000, height: 1000}
                        },
                        batches: []
                    }]);
                }),
                createLobby: jest.fn(() => {
                    return Promise.resolve({
                        id: 1,
                        owner: {id: 1, username: 'test_user'},
                        name: 'New Test Lobby',
                        state: 'open',
                        users: [
                            {id: 1, username: 'test_user', color: 'blue', isReady: true}
                        ],
                        map: {
                            planets: [
                                {
                                    id: 1,
                                    type: 'planet',
                                    coordinate: {x: 0, y: 0},
                                    owner: 1,
                                    production: 5,
                                    units: 50,
                                    radius: 20
                                }
                            ],
                            settings: {speed: 1, width: 500, height: 500}
                        },
                        batches: []
                    });
                }),
                joinLobby: jest.fn((roomId) => {
                    return Promise.resolve({
                        id: roomId,
                        owner: {id: roomId, username: `owner_${roomId}`},
                        name: `Joined Test Lobby ${roomId}`,
                        state: 'open',
                        users: [
                            {id: roomId, username: `owner_${roomId}`, color: 'blue', isReady: true},
                            {id: roomId + 1, username: `user_${roomId + 1}`, color: 'red', isReady: false}
                        ],
                        map: {
                            planets: [
                                {
                                    id: 1,
                                    type: 'planet',
                                    coordinate: {x: 0, y: 0},
                                    owner: roomId,
                                    production: 5,
                                    units: 50,
                                    radius: 20
                                }
                            ],
                            settings: {speed: 1, width: 500, height: 500}
                        },
                        batches: []
                    });
                }),
            };
        }),
    };
});

// Mock GameEventDistribution
jest.mock('./api/GameEventDistribution', () => {
    return {
        GameEventDistribution: jest.fn().mockImplementation(() => {
            const handlers: { [key: string]: (data: any) => void } = {};
            const socket = {
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


describe('Game', () => {
    let socket: any;

    beforeEach(() => {
        game.setState('initial');
        game.setUserId('');
        game.currentPlayerName = '';
        //game.lobbies = [];

        socket = game.gameEventDistribution?.socket;
    });

    test('should initialize with initial state', () => {
        expect(game.state).toBe('initial');
    });

    test('should authorize user and set userJWt and currentPlayerName', async () => {
        await game.authorize('testUser');
        expect(game.currentPlayerName).toBe('testUser');
    });

    test('should fetch lobbies and update state', async () => {
        await game.authorize('testUser');
        await game.fetchLobbies();
        expect(game.state).toBe('lobbyList');
        expect(game.lobbies.length).toBeGreaterThan(0);
    });

    test('should handle onGameStart', () => {
        game.onGameStart();
        expect(game.state).toBe('inProgress');
    });

    test('should handle user readiness state change', () => {
        const userId = 1;
        game.onUserChangeReadinessState(userId, true);
    });

    test('should authorize, fetch lobbies and update state', async () => {
        await game.authorize('testUser');
        await game.authorize('testUser');
        expect(game.state).toBe('lobbyList');
        expect(game.lobbies.length).toBeGreaterThan(0);
    });

    test('should get lobbies via game object', async () => {
        await game.authorize('testUser');
        await game.fetchLobbies();
        expect(game.lobbies).toEqual([
            expect.objectContaining({id: 1, name: 'Test Lobby 1'}),
            expect.objectContaining({id: 2, name: 'Test Lobby 2'}),
        ]);
    });

    test('should create a new lobby via game object', async () => {
        await game.authorize('testUser');
        await game.createLobby();
        expect(game.lobbies).toContainEqual(
            expect.objectContaining({id: 1, name: 'New Test Lobby'})
        );
    });

    test('should join a lobby via game object', async () => {
        await game.authorize('testUser');
        await game.fetchLobbies();
        await game.joinLobby(1);
        expect(game.lobbyOwner).toBe('test_user');
        expect(game.state).toBe('pending');
    });

    // Socket tests
    test('should handle RoomUserLeave event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('RoomUserLeave', {user: {id: 1}});

        expect(game.players.find(player => player.id === 1)).toBeUndefined();
    });

    test('should handle UserReadinessChange event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('UserReadinessChange', {userId: 1, isReady: true});

        expect(game.players.find(player => player.id === 1)?.isReady).toBe(true);
    });

    test('should handle PlanetsStateChange event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('PlanetsStateChange', {planets: [{id: 1, units: 100}]});

        expect(game.planets.find(planet => planet.id === 1)?.units).toBe(100);
    });

    test('should handle PlanetOccupiedEvent event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('PlanetOccupiedEvent', {planetId: 1, newOwnerId: 2});

        expect(game.planets.find(planet => planet.id === 1)?.owner).toBe(2);
    });

    test('should handle BatchCollisionEvent event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('BatchCollisionEvent', {batchId: 1, planetId: 1, newPlanetUnits: 100});

        expect(game.planets.find(planet => planet.id === 1)?.units).toBe(100);
    });

    test('should handle disconnect event', async () => {
        await game.authorize('testUser');
        await game.joinLobby(1);

        socket?.trigger('disconnect', {});
    });

    // More tests here
});
