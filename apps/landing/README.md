# 날씨의 속삭임 - 랜딩페이지

> 서비스 `날씨의 속삭임` 의 랜딩페이지입니다.

모노레포 전체 안내는 [루트 README](../../README.md) 를 참고해 주세요.

## 스택

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Sass (CSS Modules) · NextUI
· Storybook · MSW

## 시작하기

```bash
pnpm install          # 워크스페이스 루트에서
pnpm dev:landing      # http://localhost:3000

pnpm --filter @weather-web/landing storybook   # 스토리북 (:6006)
pnpm --filter @weather-web/landing mock        # standalone mock 서버 (:9090)
```

`.env.example` 를 참고해 `.env` 를 만들어 주세요.
`NEXT_PUBLIC_API_MOCKING=enabled` 이면 MSW 로 요청을 가로챕니다.

## 구현 메모

- 라우트 그룹 `(default)` + 병렬 라우트 `@modal` + 인터셉팅 라우트 `(.)flow` 로
  모달을 구성합니다. 인터셉팅은 클라이언트 네비게이션에서만 동작하므로,
  `/flow/*` 로 직접 진입하면 인터셉팅 없이 해당 페이지가 렌더링됩니다.
- 브랜드 폰트 `LaundryGothic` 은 KS X 1001 완성형 2,350자만 담고 있고,
  나머지 한글은 폭만 있고 그림이 없는 빈 글리프입니다. 폰트가 "그 글자를
  가졌다" 고 응답해 대체 폰트로 넘어가지 않으므로, 범위 밖 글자를 문구에
  쓰면 화면에서 사라집니다. 사용자가 입력하는 값에는 `font-sans` 를 지정해
  시스템 폰트로 렌더링하고, 소스에 적는 문구는 `pnpm check:font` 로
  검사합니다.
- `MSWComponent` 의 `typeof window !== 'undefined'` 중첩은 그대로 두어야 합니다.
  `msw/browser` 는 node 조건에서 export 되지 않아, 이 분기가 서버 번들에서
  죽은 코드로 제거되어야만 빌드가 통과합니다.

## 배포

`develop` → development, `release` → production, 그 외 브랜치 → preview 로
Vercel 에 배포됩니다. 워크플로는 저장소 루트의
`.github/workflows/landing-*.yml` 에 있습니다.
