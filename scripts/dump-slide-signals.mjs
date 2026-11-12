import fs from 'node:fs'
const items = ['01', '02', '03', '04'].flatMap((n) =>
  JSON.parse(fs.readFileSync(`aws-dea-c01/practice/audit/rebuild-input/slide-${n}.json`, 'utf8')),
)
function clean(t) {
  return String(t || '')
    .replace(/QUESTI0N/gi, 'QUESTION')
    .replace(/W0RKED/gi, 'WORKED')
    .replace(/D0MAIN/gi, 'DOMAIN')
}
const out = []
for (const it of items) {
  const pages = Object.values(it.ocr_pages || {}).map(clean)
  const w = pages.find((p) => /THE SIGNAL/i.test(p)) || ''
  const q = pages.find((p) => /PAUSE\s*AND\s*DECIDE/i.test(p) && !/THE SIGNAL/i.test(p)) || ''
  const sig = ((w.match(/THE SIGNAL\s*([\s\S]*?)(?:\n(?:PRACTICE EXAM|admin@|MONITORING|AUTHENTICATION|ALL DOMAINS)|$)/i) || [])[1] || '')
    .replace(/\s+/g, ' ')
    .trim()
  const afterQ = q.split(/\?/).pop() || ''
  const optBit = afterQ
    .split(/PAUSE/i)[0]
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 400)
  out.push({ id: it.id, src: it.source, sig: sig.slice(0, 220), opts: optBit })
}
fs.writeFileSync('aws-dea-c01/practice/audit/slide-signals.json', JSON.stringify(out, null, 1))
console.log(out.length)
out.slice(0, 8).forEach((x) => console.log(x.id, x.sig.slice(0, 90)))
