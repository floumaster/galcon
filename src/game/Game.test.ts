import { game } from './Game';
//import { GameApi } from './api/GameApi';

jest.mock('./api/GameApi', () => {
    return {
        GameApi: jest.fn().mockImplementation(() => {
            return {
                authorize: jest.fn((credentials) => {
                    console.log(credentials);
                    return Promise.resolve({ userId: 'test_user' });
                }),
                fetchLobbies: jest.fn(() => {
                    return Promise.resolve([{ id: 'lobby1' }, { id: 'lobby2' }]);
                }),
            };
        }),
    };
});

describe('Game', () => {
    beforeEach(() => {
        game.setState('initial');
        game.setUserId('');
        game.currentPlayerName = '';
        //game.lobbies = [];
    });

    test('should initialize with initial state', () => {
        expect(game.state).toBe('initial');
    });

    test('should authorize user and set userJWt and currentPlayerName', async () => {
        await game.authorize('testUser');
        expect(game.userId).toBe('test_user');
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

    // More tests here
});
