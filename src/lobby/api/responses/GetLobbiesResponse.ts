export type GetLobbyResponse = {
  id: number
  owner: {
    id: number
    username: string
  }
  name: string
  state: string
  users: any[]
  map: {
    planets: {
      id: number
      owner: number | null
      production: number
      units: number
      x: number
      y: number
      radius: number
    }[]
    settings: {
      planetCoun: number
      speed: number
      width: number
      height: number
      maxPlanetRadius: number
      minPlanetProduction: number
      maxPlanetProduction: number
      distanceOffset: number
    }
  }
  batches: any[]
}