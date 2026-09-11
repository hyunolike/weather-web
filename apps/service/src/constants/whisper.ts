/** 속삭임 본문 최대 길이 (prisma schema 의 VarChar(500) 과 맞춘다) */
export const MAX_CONTENT_LENGTH = 500

/** 같은 사람이 연달아 도배하는 것을 막는 간격 */
export const WRITE_COOLDOWN_MS = 10 * 1000

/** 목록 한 페이지에 보여줄 속삭임 수 */
export const PAGE_SIZE = 20

/**
 * 자동 임시 숨김 임계치 (서로 다른 사용자의 신고 수).
 * 소규모 커뮤니티 권장값 3건을 따른다. 규모가 커지면 5건으로 올린다.
 */
export const REPORT_HIDE_THRESHOLD = 3

/**
 * 임시조치(숨김) 기간.
 * 정보통신망법 제44조의2 제4항은 임시조치 기간을 30일 이내로 정하고 있다.
 * 이 기간이 지나면 다시 공개되며, 영구 삭제는 운영자 판단으로 처리한다.
 */
export const REPORT_HIDE_DURATION_MS = 30 * 24 * 60 * 60 * 1000
