import 'server-only'
import { Location } from '@/constants/locations'
import { Weather, WeatherDescription } from '@/types/weather'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * WMO weather interpretation code 를 한국어 표현으로 옮긴다.
 * https://open-meteo.com/en/docs 의 코드 표를 구간으로 묶었다.
 */
export const describeWeather = (code: number): WeatherDescription => {
  if (code === 0) return { label: '맑음', emoji: '☀️' }
  if (code <= 2) return { label: '구름 조금', emoji: '🌤️' }
  if (code === 3) return { label: '흐림', emoji: '☁️' }
  if (code <= 48) return { label: '안개', emoji: '🌫️' }
  if (code <= 57) return { label: '이슬비', emoji: '🌦️' }
  if (code <= 67) return { label: '비', emoji: '🌧️' }
  if (code <= 77) return { label: '눈', emoji: '🌨️' }
  if (code <= 82) return { label: '소나기', emoji: '🌦️' }
  if (code <= 86) return { label: '진눈깨비', emoji: '🌨️' }
  return { label: '뇌우', emoji: '⛈️' }
}

// 외부 API 를 부를 수 없는 환경(오프라인, 네트워크 정책)에서도 개발할 수 있도록
// 좌표에서 결정되는 고정 값을 돌려준다.
const mockWeather = (location: Location): Weather => {
  const seed = Math.round(location.latitude * 100 + location.longitude * 100)
  const codes = [0, 1, 2, 3, 45, 51, 61, 71, 80, 95]
  return {
    code: codes[seed % codes.length],
    temperature: Math.round(((seed % 35) - 5) * 10) / 10,
  }
}

/**
 * 작성 시점의 날씨를 가져온다.
 * 실패하면 null 을 돌려주고, 호출하는 쪽에서 작성을 막는다.
 * (날씨 없이 저장하면 이 서비스의 글로서 의미가 없다)
 */
export const fetchCurrentWeather = async (
  location: Location,
): Promise<Weather | null> => {
  if (process.env.WEATHER_API_MOCKING === 'enabled') {
    return mockWeather(location)
  }

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,weather_code',
    timezone: 'Asia/Seoul',
  })

  try {
    const response = await fetch(`${OPEN_METEO_URL}?${params}`, {
      // 같은 지역이라도 시간이 지나면 날씨가 바뀌므로 짧게만 캐싱한다
      next: { revalidate: 60 },
    })
    if (!response.ok) {
      console.error('[weather] 응답 실패', response.status)
      return null
    }

    const data = await response.json()
    const code = data?.current?.weather_code
    const temperature = data?.current?.temperature_2m
    if (typeof code !== 'number' || typeof temperature !== 'number') {
      console.error('[weather] 예상과 다른 응답', data)
      return null
    }

    return { code, temperature }
  } catch (err) {
    console.error('[weather] 조회에 실패했습니다.', err)
    return null
  }
}
