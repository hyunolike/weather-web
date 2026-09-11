export type Location = {
  code: string
  name: string
  latitude: number
  longitude: number
}

// 브라우저 위치 권한 없이도 바로 쓸 수 있도록 주요 도시 좌표를 고정해 둔다.
// 정밀 위치(geolocation) 기반 조회는 이후에 선택 항목으로 추가한다.
export const LOCATIONS: Location[] = [
  { code: 'seoul', name: '서울', latitude: 37.5665, longitude: 126.978 },
  { code: 'busan', name: '부산', latitude: 35.1796, longitude: 129.0756 },
  { code: 'daegu', name: '대구', latitude: 35.8714, longitude: 128.6014 },
  { code: 'incheon', name: '인천', latitude: 37.4563, longitude: 126.7052 },
  { code: 'gwangju', name: '광주', latitude: 35.1595, longitude: 126.8526 },
  { code: 'daejeon', name: '대전', latitude: 36.3504, longitude: 127.3845 },
  { code: 'ulsan', name: '울산', latitude: 35.5384, longitude: 129.3114 },
  { code: 'gangneung', name: '강릉', latitude: 37.7519, longitude: 128.8761 },
  { code: 'jeju', name: '제주', latitude: 33.4996, longitude: 126.5312 },
]

export const DEFAULT_LOCATION_CODE = 'seoul'

export const findLocation = (code: string): Location | undefined =>
  LOCATIONS.find((location) => location.code === code)
