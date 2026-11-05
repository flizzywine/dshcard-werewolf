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
    const cast = (card.character_book?.entries || []).flatMap(entry => {
      const match = /^\[cast\](.+)$/.exec(entry.comment || entry.name || '')
      return match && match[1].trim() ? [{ name: match[1].trim(), content: entry.content || '' }] : []
    })
    const state = createState(input, choose, cast)
    const data = await ctx.tavern.readGameData({ gameId }) || {}
    await ctx.tavern.saveGameData({ gameId, data: { ...data, nonce: state.nonce,
      notes: { ...data.notes, [state.nonce]: { marks: {}, text: '' } } } })
    return { state }
  } })
  ctx.tavern.handle('notes', async ({ gameId, op, marks, text }) => {
    const data = await ctx.tavern.readGameData({ gameId })
    if (!data?.nonce) throw new Error('请先开始游戏')
    const current = data.notes[data.nonce]
    if (op === 'read') return current
    if (op !== 'save') throw new Error('未知笔记操作')
    if (marks !== undefined && (!marks || Array.isArray(marks) || typeof marks !== 'object' ||
      Object.entries(marks).some(([id, tag]) => !/^[1-6]$/.test(id) || typeof tag !== 'string' || tag.length > 40))) throw new Error('标记需要座位号和最多40字的标签')
    if (text !== undefined && (typeof text !== 'string' || text.length > 20000)) throw new Error('笔记最多20000字')
    const next = { marks: marks ?? current.marks, text: text ?? current.text }
    await ctx.tavern.saveGameData({ gameId, data: { ...data, notes: { ...data.notes, [data.nonce]: next } } })
    return next
  })
}
