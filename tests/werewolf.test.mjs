import test from 'node:test'
import assert from 'node:assert/strict'
import { createState, actionFor, perspective, project, accept, resolve, gameMode } from '../plugin/rules.mjs'

function state() {
  const s = createState({ seat: 6 })
  s.players.forEach((p, i) => { p.role = ['wolf', 'wolf', 'seer', 'villager', 'villager', 'villager'][i] })
  s.queue = [1, 2]; s.gate = null; return s
}
test('first-night seer gives last words with identity and inspection before living players speak', async () => {
  const s = state(); s.phase = 'dawn'; s.queue = []; s.victim = 3;
  s.log.push({ day: 1, actor: 3, to: 3, text: '查验结果：1号是狼人。' });
  resolve(s);
  assert.equal(s.phase, 'last-words');
  assert.equal(s.players[2].alive, false);
  await gameMode.advance({ state: s, input: null });
  await gameMode.advance({ state: s, agent: async request => {
    const context = JSON.parse(request.prompt);
    assert.equal(context.self.role, '预言家');
    assert.match(JSON.stringify(context.history), /1号是狼人/);
    assert.equal(context.action.kind, 'speak');
    return { text: JSON.stringify({ text: '我是预言家，1号查杀。' }) };
  } });
  assert.equal(s.phase, 'speech');
  assert.equal(actionFor(s).actor, 1);
  assert.ok(!s.queue.includes(3));
  assert.match(gameMode.foreground({ data: project(s) }), /我是预言家，1号查杀/);
});

test('human first-night victim can submit last words once before spectating', async () => {
  const s = state(); s.human = 3; s.phase = 'dawn'; s.queue = []; s.victim = 3;
  resolve(s);
  assert.equal(project(s).action.kind, 'confirm');
  await gameMode.advance({ state: s, input: null });
  assert.equal(project(s).action.kind, 'speak');
  assert.equal(project(s).spectating, false);
  await gameMode.advance({ state: s, input: { text: '我的遗言。' } });
  assert.equal(project(s).spectating, true);
  assert.equal(project(s).action.kind, 'auto');
});

test('default human seat is randomized while explicit seats remain supported', () => {
  for (let seat = 1; seat <= 6; seat++) {
    assert.equal(createState({}, (min, max) => max ? seat : 0).human, seat);
    assert.equal(createState({ seat }).human, seat);
  }
});
test('hidden roles, wolf chat and inspection never enter a villager view', () => {
  const s = state()
  accept(s, { text: '秘密狼队标记' }); accept(s, { text: '袭击3号' })
  accept(s, { target: 3 }); accept(s, { target: 3 }); accept(s, { target: 1 })
  assert.match(JSON.stringify(perspective(s, 1)), /秘密狼队标记/)
  const villager = JSON.stringify(perspective(s, 4))
  assert.doesNotMatch(villager, /秘密狼队标记|查验结果|袭击3号/)
  assert.match(JSON.stringify(perspective(s, 3)), /查验结果/)
  assert.equal(project(s).action.actor, 'auto')
  resolve(s)
  assert.equal(s.players[2].alive, false)
  assert.equal(s.phase, 'last-words')
  assert.equal(actionFor(s).gate, 'daybreak')
})

test('player journey reveals identity before night and pauses on private inspection result', async () => {
  const s = createState({ seat: 3 })
  s.players.forEach((p, i) => { p.role = ['wolf', 'wolf', 'seer', 'villager', 'villager', 'villager'][i] })
  const agent = async request => {
    if (request.id === 'dm') return { text: '天亮了，请听公告。' }
    const a = JSON.parse(request.prompt).action
    return { text: JSON.stringify(a.kind === 'speak' ? { text: '狼队秘密' } : { target: 4 }) }
  }
  assert.equal(project(s).phase, 'identity')
  assert.deepEqual(project(s).publicHistory, [])
  await gameMode.advance({ state: s, input: null, agent })
  assert.equal(project(s).phase, 'night')
  assert.equal(project(s).action.kind, 'auto')
  while (project(s).action.kind === 'auto') await gameMode.advance({ state: s, input: null, agent })
  assert.equal(project(s).action.kind, 'inspect')
  await gameMode.advance({ state: s, input: { target: 1 }, agent })
  assert.equal(project(s).phase, 'inspection')
  assert.match(JSON.stringify(project(s).history), /1号是狼人/)
  assert.doesNotMatch(JSON.stringify(project(s).publicHistory), /查验结果|狼队秘密/)
  await gameMode.advance({ state: s, input: null, agent })
  await gameMode.advance({ state: s, input: null, agent })
  assert.equal(project(s).phase, 'daybreak')
  assert.match(JSON.stringify(project(s).publicHistory), /4号昨夜出局/)
  await gameMode.advance({ state: s, input: null, agent })
  assert.equal(project(s).currentSpeaker, 4)
  await gameMode.advance({ state: s, input: null, agent })
  assert.equal(project(s).currentSpeaker, 1)
})

test('dead players spectate through phase gates without manual decisions', () => {
  const s = state(); s.players[5].alive = false; s.gate = 'daybreak'
  assert.equal(project(s).spectating, true)
  assert.equal(project(s).action.kind, 'auto')
})
test('illegal target does not advance; tie vote exiles nobody; votes remain private until resolution', () => {
  const s = state(); s.phase = 'vote'; s.queue = [1, 2, 3, 4, 5, 6]; s.index = 0
  assert.throws(() => accept(s, { target: 1 }), /合法/)
  assert.equal(s.index, 0)
  for (const target of [2, 1, 2, 1, 0, 0]) accept(s, { target })
  assert.doesNotMatch(JSON.stringify(perspective(s, 6)), /投票结果/)
  resolve(s)
  assert.equal(s.players.filter(p => p.alive).length, 6)
  assert.equal(s.day, 2)
})
test('a complete six-player game uses models only for NPC decisions, never DM rules', async () => {
  const s = state(), requests = []
  const agent = async request => {
    requests.push(request)
    if (request.id === 'dm') return { text: '请继续下一阶段。' }
    const input = JSON.parse(request.prompt), action = input.action
    return { text: JSON.stringify(action.kind === 'speak' ? { text: '我会仔细观察投票。', memory: '关注公开信息' } : { target: action.targets[0] }) }
  }
  for (let steps = 0; steps < 100 && s.phase !== 'ended'; steps++) {
    const a = actionFor(s)
    const input = a.actor === s.human && a.kind !== 'confirm' ? a.kind === 'speak' ? { text: '我是好人。' } : { target: a.targets[0] } : null
    await gameMode.advance({ state: s, input, agent })
  }
  assert.ok(s.winner)
  assert.equal(requests.some(r => r.id === 'dm'), false)
  assert.ok(requests.some(r => r.id.startsWith('npc-')))
  for (const r of requests.filter(r => r.id === 'dm')) assert.doesNotMatch(r.prompt, /查验结果|狼队标记/)
  assert.equal(project(s).revealed.length, 6)
})

async function host(entries = []) {
  const { apply } = await import('../plugin/index.mjs')
  let mode, handler, saved
  apply({ tavern: { capabilities: { gameMode: 1 }, member() {},
    gameMode(value) { mode = value }, handle(name, fn) { assert.equal(name, 'notes'); handler = fn },
    async getCard({ gameId }) { assert.equal(gameId, 'game'); return { character_book: { entries } } },
    async readGameData() { return structuredClone(saved ?? null) },
    async saveGameData({ data }) { saved = structuredClone(data) },
  } }, { choose: () => 0 })
  const { state } = await mode.create({ gameId: 'game', input: { seat: 6 } })
  return { state, notes: args => handler({ gameId: 'game', ...args }) }
}

test('create draws five distinct cast names from seven with injectable choose; empty cast keeps numbers', async () => {
  const entries = Array.from({ length: 7 }, (_, i) => ({ comment: '[cast]角色' + i, content: '人物设定' + i }))
  const { state: s } = await host(entries)
  assert.deepEqual(s.players.slice(0, 5).map(p => p.name), entries.slice(0, 5).map(e => e.comment.slice(6)))
  assert.equal(new Set(s.players.slice(0, 5).map(p => p.name)).size, 5)
  assert.equal(s.players[0].personality, '人物设定0')
  const empty = await host()
  assert.deepEqual(empty.state.players.map(p => p.name), ['1号', '2号', '3号', '4号', '5号', '6号'])
})

test('stage keeps stable log indices and agent emotion, using character persona', async () => {
  const s = state(); s.players[0].name = '角色甲'; s.players[0].personality = '严肃的侦探'
  s.phase = 'speech'; s.queue = [1, 2]; s.index = 0
  s.log.push({ to: 'wolves', actor: 1, text: '秘密', day: 1 })
  await gameMode.advance({ state: s, agent: async request => {
    const p = JSON.parse(request.prompt)
    assert.equal(p.self.name, '角色甲'); assert.equal(p.self.personality, '严肃的侦探')
    assert.match(request.system, /扮演.*emotion/)
    return { text: JSON.stringify({ text: '公开发言', emotion: '怀疑', memory: '私人记忆' }) }
  } })
  const first = project(s).stage.lines
  assert.deepEqual(first, [{ id: 1, speaker: '角色甲', text: '公开发言', emotion: '怀疑' }])
  await gameMode.advance({ state: s, agent: async () => ({ text: '{"text":"第二句","emotion":"平静"}' }) })
  assert.deepEqual(project(s).stage.lines.slice(0, 1), first)
})

test('player projection excludes other private logs, roles and memories before the end', () => {
  const s = state()
  s.players.forEach((p, i) => { p.memory = 'secret-memory-' + i })
  s.log.push({ to: 'wolves', text: 'wolf-secret', actor: 1, day: 1 },
    { to: 3, text: 'seer-secret', actor: 3, day: 1 }, { to: 6, text: 'own-result', actor: 6, day: 1 })
  const view = project(s), text = JSON.stringify(view)
  assert.doesNotMatch(text, /wolf-secret|seer-secret|secret-memory-[0-4]|"role":"狼人"|"role":"预言家"/)
  assert.equal(view.stage.self.nightResults[0].text, 'own-result')
  assert.ok(view.stage.seats.every(p => !('role' in p)))
  s.human = 3
  assert.match(JSON.stringify(project(s)), /seer-secret/)
  assert.doesNotMatch(JSON.stringify(project(s)), /wolf-secret/)
})

test('notes save independently of game state and reset under a new game nonce', async () => {
  const a = await host(), before = JSON.stringify(a.state)
  assert.deepEqual(await a.notes({ op: 'read' }), { marks: {}, text: '' })
  assert.deepEqual(await a.notes({ op: 'save', marks: { 1: '狼?' }, text: 'private-note' }), { marks: { 1: '狼?' }, text: 'private-note' })
  assert.deepEqual(await a.notes({ op: 'save', text: 'updated' }), { marks: { 1: '狼?' }, text: 'updated' })
  assert.equal((await a.notes({ op: 'read' })).text, 'updated')
  assert.equal(JSON.stringify(a.state), before)
  await assert.rejects(a.notes({ op: 'save', marks: { 7: 'bad' } }))
  const b = await host()
  assert.notEqual(a.state.nonce, b.state.nonce)
  assert.deepEqual(await b.notes({ op: 'read' }), { marks: {}, text: '' })
})

test('day 30 tie ends in a draw and stage vote exposes counts not choices', () => {
  const s = state(); s.day = 30; s.phase = 'vote'; s.queue = [1, 2, 3, 4, 5, 6]; s.index = 0
  for (const target of [2, 1, 2, 1, 0]) accept(s, { target })
  assert.deepEqual(project(s).stage.vote, { open: true, cast: 5, total: 6, targets: [1, 2, 3, 4, 5] })
  accept(s, { target: 0 }); resolve(s)
  assert.equal(s.phase, 'ended'); assert.equal(s.winner, '平局')
})