#!/usr/bin/env node
/**
 * 브랜드 폰트(LaundryGothic)가 그리지 못하는 한글이 화면 문구에 들어갔는지 검사한다.
 *
 * 이 폰트는 KS X 1001 완성형 2,350자만 담고 있고, 나머지 음절은 폭만 있고
 * 그림이 없는 빈 글리프다. 폰트가 "그 글자를 가졌다" 고 응답하기 때문에
 * 브라우저가 대체 폰트로 넘어가지 않아, 해당 글자가 화면에서 통째로 사라진다.
 *
 * 사용자가 쓴 글은 시스템 폰트로 보여주므로 검사 대상이 아니고,
 * 소스에 직접 적힌 문구만 검사한다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const coverage = JSON.parse(
  fs.readFileSync(path.join(here, 'laundry-gothic-coverage.json'), 'utf8'),
)

const isSupported = (codePoint) =>
  coverage.ranges.some(([from, to]) => codePoint >= from && codePoint <= to)

const TARGET_DIRS = ['apps/landing/src', 'apps/service/src']
const TARGET_EXT = new Set(['.ts', '.tsx'])
const HANGUL = /[가-힣]/g

/** 주석은 화면에 나오지 않으므로 검사 대상에서 뺀다 */
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return TARGET_EXT.has(path.extname(entry.name)) ? [full] : []
  })

const root = path.join(here, '..')
const problems = []

for (const dir of TARGET_DIRS) {
  const absoluteDir = path.join(root, dir)
  if (!fs.existsSync(absoluteDir)) continue

  for (const file of walk(absoluteDir)) {
    const lines = stripComments(fs.readFileSync(file, 'utf8')).split('\n')
    lines.forEach((line, index) => {
      if (line.trimStart().startsWith('//')) return
      const bad = [...new Set(line.match(HANGUL) ?? [])].filter(
        (ch) => !isSupported(ch.codePointAt(0)),
      )
      if (bad.length > 0) {
        problems.push({
          file: path.relative(root, file),
          line: index + 1,
          chars: bad,
          text: line.trim().slice(0, 80),
        })
      }
    })
  }
}

if (problems.length === 0) {
  console.log(
    `✔ 화면 문구에 ${coverage.font} 가 그리지 못하는 한글이 없습니다. (지원 ${coverage.supportedCount}자)`,
  )
  process.exit(0)
}

console.error(
  `✖ ${coverage.font} 가 그리지 못하는 한글이 ${problems.length}곳에서 발견되었습니다.`,
)
console.error('  이 글자들은 화면에서 보이지 않습니다. 다른 표현으로 바꾸거나')
console.error('  해당 요소에 font-sans 를 지정해 시스템 폰트로 렌더링하세요.\n')
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  [${p.chars.join(' ')}]`)
  console.error(`    ${p.text}`)
}
process.exit(1)
