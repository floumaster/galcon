import { SpaceBrigade, SpaceBrigadeProps } from './SpaceBrigade';

global.requestAnimationFrame = jest.fn((callback) => setTimeout(callback, 16));
global.cancelAnimationFrame = jest.fn(clearTimeout);

describe('SpaceBrigade', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2021-01-01T00:00:00Z').getTime());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('calculates the correct distance between two points', () => {
    const spaceBrigade = new SpaceBrigade({
      fromCoordinate: { x: 0, y: 0 },
      toCoordinate: { x: 3, y: 4 }
    } as SpaceBrigadeProps);

    const distance = spaceBrigade['getDistance'](
      { x: 0, y: 0 },
      { x: 3, y: 4 }
    );

    expect(distance).toBe(5);
  });

  it('initializes and starts movement correctly', () => {
    const mockFn = jest.fn();
    global.requestAnimationFrame = mockFn;
      new SpaceBrigade({
          fromCoordinate: { x: 0, y: 0 },
          toCoordinate: { x: 10, y: 0 }
      } as SpaceBrigadeProps);
      expect(mockFn).toHaveBeenCalled();
  });
});
