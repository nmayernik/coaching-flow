const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const source = fs.readFileSync(require('node:path').join(__dirname, '../lib/teamsNamingStudy.ts'), 'utf8')
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
const sandbox = { exports: {}, Date, Math, Set, JSON }
vm.runInNewContext(output, sandbox)
const { createStudySession, parseStudySession, getExampleBooking } = sandbox.exports
function parse(value) { return parseStudySession(JSON.stringify(value)) }
for (const id of ['A', 'B', 'C', 'D', 'E', 'F']) {
  const session = createStudySession(id)
  assert.equal(session.assignedVariant, id)
  assert.equal(session.comparisonOrder.length, 6)
  assert.equal(new Set(session.comparisonOrder).size, 6)
  assert.deepEqual(JSON.parse(JSON.stringify(parse(session))), JSON.parse(JSON.stringify(session)))
  const withBooking = { ...session, booking: getExampleBooking() }
  assert.deepEqual(JSON.parse(JSON.stringify(parse(withBooking))), JSON.parse(JSON.stringify(withBooking)))
}
const session = createStudySession('A')
assert.equal(parseStudySession(null), null)
assert.equal(parseStudySession('{broken'), null)
assert.equal(parse({ ...session, assignedVariant: 'Z' }), null)
assert.equal(parse({ ...session, comparisonOrder: ['A','A','C','D','E','F'] }), null)
assert.equal(parse({ ...session, createdAt: Date.now() - 73 * 60 * 60 * 1000 }), null)
assert.equal(parse({ ...session, createdAt: Date.now() + 120_000 }), null)
assert.equal(parse({ ...session, booking: { selectedStudent: null } }), null)
// A fixed random stream produces shuffled-first B and independently assigned A.
const originalRandom = Math.random
try {
  Math.random = () => 0
  const randomSession = createStudySession()
  assert.equal(randomSession.assignedVariant, 'A')
  assert.equal(randomSession.comparisonOrder[0], 'B')
} finally { Math.random = originalRandom }
console.log('Teams naming session checks passed: assignment, independent order, persistence, invalid/expired state, fictional booking.')
