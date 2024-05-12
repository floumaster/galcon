export type GetLobbyResponse = {
  id: string
  owner: {
    id: string
    username: string
  }
  name: string
  state: string
  users: any[]
  map: {
    planets: {
      id: string
      owner: string | null
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