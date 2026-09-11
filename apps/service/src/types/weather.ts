export type Weather = {
  /** WMO weather interpretation code */
  code: number
  /** 섭씨 기온 */
  temperature: number
}

export type WeatherDescription = {
  label: string
  emoji: string
}
