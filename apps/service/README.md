# 날씨의 속삭임 - 서비스

> 날씨 기반 익명 커뮤니티 본 서비스입니다.

## 스택

Next.js 14 (App Router) · TypeScript · Tailwind CSS · NextUI · Prisma (PostgreSQL)

백엔드는 별도 서버 없이 Next.js 풀스택(server actions + prisma)으로 구성합니다.

## 시작하기

```bash
cp .env.example .env   # POSTGRES_* 값을 채워주세요
pnpm prisma-migrate    # 마이그레이션 생성 및 적용
pnpm dev               # http://localhost:3001
```

## 진행 상황

아직 스켈레톤 단계입니다. 다음 항목이 정해져야 본격적인 개발을 시작할 수 있습니다.

- [ ] 날씨 API 선정
- [ ] 익명 인증 방식 결정
- [ ] 글/공감 데이터 모델 확정 (`prisma/schema.prisma` 의 임시 모델 교체)
