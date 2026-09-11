# 날씨의 속삭임 🌤️

> 날씨 정보를 기반으로 사용자들이 감정, 경험, 생각을 공유하며 서로의 이야기에 귀 기울일 수 있는 공간

<img src="https://github.com/hyunolike/weather-web/assets/61215550/d697f38b-212a-4ea9-8cb5-0fdb216b100d" width=250px />

## 프로젝트 소개

날씨의 속삭임은 "날씨 변화에 따른 다양한 감정과 상황을 익명으로 소통하며 공감대를 형성할 수 있는 커뮤니티"로서, <br/>
날씨라는 보편적이면서도 매일 변하는 주제를 통해 지속적인 컨텐츠 업데이트와 참여를 유도합니다! ☀️
<br/>
<br/>
익명성을 기반으로 하여, 실제 날씨에 대한 솔직한 느낌이나 생각을 공유함으로써 사용자 간의 심리적 안정감을 제공합니다.

## 구조

pnpm workspace 기반 모노레포입니다.

```
apps/
├─ landing/   랜딩페이지 (Next.js 14, Vercel 배포 중)
└─ service/   본 서비스 (Next.js 14 풀스택, 개발 예정)
```

## 로컬 개발

```bash
pnpm install

pnpm dev           # 본 서비스 (:3001)
pnpm dev:landing   # 랜딩페이지 (:3000)

pnpm lint          # 전체 워크스페이스 lint
pnpm typecheck     # 전체 워크스페이스 타입 검사
pnpm build         # 전체 워크스페이스 빌드
```

각 앱의 환경변수는 `apps/*/.env.example` 를 참고해 `.env` 를 만들어 주세요.

## 배포

앱마다 Vercel 프로젝트를 따로 두고, 변경된 앱만 배포되도록 워크플로를 나눴습니다.

| 브랜치    | 환경        |
| --------- | ----------- |
| `release` | production  |
| `develop` | development |
| 그 외     | preview     |

필요한 GitHub Actions 시크릿

| 시크릿                      | 설명                                    |
| --------------------------- | --------------------------------------- |
| `VERCEL_TOKEN`              | 공통                                    |
| `VERCEL_ORG_ID`             | 공통                                    |
| `VERCEL_PROJECT_ID`         | 랜딩 Vercel 프로젝트                    |
| `VERCEL_PROJECT_ID_SERVICE` | 서비스 Vercel 프로젝트 (신규 생성 필요) |

각 Vercel 프로젝트의 **Root Directory** 를 `apps/landing`, `apps/service` 로
설정하고, 서비스 프로젝트에는 `apps/service/.env.example` 의 환경변수를
등록해 주세요.

## 개발자 🧑🏻‍💻

|                           FrontEnd                            |                            BackEnd                            |
| :-----------------------------------------------------------: | :-----------------------------------------------------------: |
| ![](https://avatars.githubusercontent.com/hyunolike?size=100) | ![](https://avatars.githubusercontent.com/hyunolike?size=100) |
|            [장현호](https://github.com/hyunolike)             |            [장현호](https://github.com/hyunolike)             |
