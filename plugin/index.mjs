import { randomInt } from 'node:crypto'
import { gameMode, createState } from './rules.mjs'
export const name = 'dsh-card-werewolf'
export const inject = ['tavern']
export function apply(ctx, { choose = randomInt } = {}) {
  if (ctx.tavern.capabilities?.gameMode !== 1) throw new Error('六人狼人杀需要支持 gameMode 的新版 DSH Tavern')
  for (let index = 0; index < 6; index++) {
    ctx.tavern.member({ name: 'npc-' + (index + 1), title: (index + 1) + '号' })
  }
  ctx.tavern.gameMode({ ...gameMode, async create({ gameId, input }) {
    const card = await ctx.tavern.getCard({ gameId })
    const cast = (card?.character_book?.entries || []).flatMap(entry => {
      const match = /^\[cast\](.+)$/.exec(entry.comment || entry.name || '')
      return match && match[1].trim() ? [{ name: match[1].trim(), content: entry.content || '' }] : []
    })
    return { state: createState(input, choose, cast) }
  } })
  const pendingSaves = new Map()
  ctx.tavern.handle('dsh-card-werewolf:notes', async ({ gameId, matchId, op, marks, text }) => {
    if (matchId !== 'legacy' && (typeof matchId !== 'string' || !/^[0-9a-f-]{36}$/.test(matchId))) throw new Error('无效的对局编号')
    const read = async () => await ctx.tavern.readGameData({ gameId }) || {}
    const notesFor = data => data.notes?.[matchId] ?? { marks: {}, text: '' }
    if (op === 'read') {
      await pendingSaves.get(gameId)?.catch(() => {})
      return notesFor(await read())
    }
    if (op !== 'save') throw new Error('未知笔记操作')
    if (marks !== undefined && (!marks || Array.isArray(marks) || typeof marks !== 'object' ||
      Object.entries(marks).some(([id, tag]) => !/^[1-6]$/.test(id) || typeof tag !== 'string' || tag.length > 40))) throw new Error('标记需要座位号和最多40字的标签')
    if (text !== undefined && (typeof text !== 'string' || text.length > 20000)) throw new Error('笔记最多20000字')
    const save = (pendingSaves.get(gameId) || Promise.resolve()).catch(() => {}).then(async () => {
      const data = await read()
      const current = notesFor(data)
      const next = { marks: marks ?? current.marks, text: text ?? current.text }
      await ctx.tavern.saveGameData({ gameId, data: { ...data, notes: { ...data.notes, [matchId]: next } } })
      return next
    })
    pendingSaves.set(gameId, save)
    try {
      return await save
    } finally {
      if (pendingSaves.get(gameId) === save) pendingSaves.delete(gameId)
    }
  })
}
