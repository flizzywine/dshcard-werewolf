window.__ModuleLoader__.load({ id: 'dsh-card-werewolf', factory: require => {
  const React = require('react'), { createPortal } = require('react-dom'), h = React.createElement
  const css = `
  .public-story{color:#263246;font:15px/1.9 system-ui}.public-story article{padding:18px 20px;margin:12px 0;border-left:3px solid #b69b62;background:#f0eadf;border-radius:0 12px 12px 0}.public-story strong{font-size:12px;color:#635239}.public-story p{white-space:pre-wrap}.identity-reveal{text-align:center;padding:30px 20px;background:#dec38b0b;border:1px solid #dec38b66;border-radius:14px;margin-bottom:20px}.identity-reveal .primary{margin-top:20px}.identity-reveal h2{font:36px/2 serif;color:#dec38b}.spectating,.inspection{padding:16px;border:1px solid #dec38b66;margin-bottom:14px}.seat.speaking{outline:2px solid #dec38b}.target[aria-pressed=true]{background:#dec38b;color:#111a2c}
  :host{display:block;color-scheme:dark}*{box-sizing:border-box}button,textarea{font:inherit}button{cursor:pointer}button:disabled{opacity:.4;cursor:default}
  .game{--gold:#dec38b;--muted:#a7b3c8;color:#eef2fa;background:radial-gradient(ellipse at 30% 0%,#263c56,transparent 60%),#0b1220;font:14px/1.6 system-ui,"Microsoft YaHei",sans-serif;border:1px solid #344153;border-radius:18px;overflow:hidden;container-type:inline-size}
  header{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:22px 28px;border-bottom:1px solid #ffffff18}.brand{display:flex;align-items:center;gap:14px}.sigil{color:var(--gold);font-size:38px}.eyebrow{font-size:10px;letter-spacing:.22em;color:var(--gold)}h1{font-family:Georgia,serif;font-size:24px;font-weight:500;letter-spacing:.1em;margin:0}h2,p{margin:0}.quiet{background:#ffffff08;color:#c3ccda;border:1px solid #ffffff28;border-radius:7px;padding:7px 12px}.quiet:hover{background:#ffffff18}
  .layout{display:grid;grid-template-columns:minmax(0,1fr) 290px}.table{padding:26px;min-width:0}.phase{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;gap:10px}.day{color:var(--muted);font-size:11px;letter-spacing:.12em}.phase b{font-size:18px;color:var(--gold);display:block}.pill{border:1px solid #a08a5a66;border-radius:20px;padding:5px 12px;font-size:11px;color:#b5d6c4;background:#dec38b0b}
  .seats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.seat{position:relative;border:1px solid #ffffff20;border-radius:12px;background:linear-gradient(145deg,#26344baa,#111a2c);padding:15px 10px;text-align:center}.seat.self{border-color:#c9a96e99;background:linear-gradient(145deg,#4a403350,#17243b)}.seat.out{filter:grayscale(1);opacity:.55}.number{position:absolute;top:10px;left:12px;color:#a7b3c8;font:10px monospace}.badge{position:absolute;top:7px;right:10px;color:var(--gold);font-size:9px}.avatar{display:grid;place-items:center;width:58px;height:58px;margin:7px auto 9px;border:1px solid #ffffff30;border-radius:50%;background:radial-gradient(circle at 30% 20%,hsl(var(--hue) 26% 42%),#121b2c);font:27px serif;color:#eee;box-shadow:0 8px 22px #0005}.seat strong{font-size:15px;letter-spacing:.07em}.status{font-size:11px;color:#b1bfd2}.alive{color:#a4ceb8}
  .moon-panel{display:flex;align-items:center;gap:20px;margin:18px 0;padding:20px;border:1px solid #ffffff14;border-radius:12px;background:#080e1c80}.moon{flex:none;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff5d4,#b5b1a1);box-shadow:0 0 35px #dec38b22,inset -16px -7px 0 #152236}.moon-panel small{color:var(--gold);letter-spacing:.15em;font-size:9px}.moon-panel p{font:18px/1.6 Georgia,serif;letter-spacing:.06em}.moon-panel .hint{font:12px/1.7 system-ui;color:var(--muted);letter-spacing:0;margin-top:4px}
  aside{border-left:1px solid #ffffff18;background:#080e19aa;min-width:0}.identity{padding:24px;border-bottom:1px solid #ffffff18}.identity h2{font:28px serif;color:var(--gold);margin:12px 0}.identity p{color:var(--muted);font-size:12px}.identity .team{color:#e0b8af;margin-top:12px;padding:8px 10px;border:1px solid #c5857440;background:#c585740b;border-radius:6px}.records{padding:20px}.tabs{display:flex;gap:14px;border-bottom:1px solid #ffffff18;padding-bottom:10px}.tab{padding:0 0 4px;background:none;border:0;color:#a4b1c5;font-size:12px}.tab.active{color:var(--gold);border-bottom:2px solid var(--gold)}.log{overflow:auto;max-height:320px;scrollbar-width:thin;scrollbar-color:#3b485d transparent;padding-right:4px}.entry{padding:13px 0;border-bottom:1px solid #ffffff10;overflow-wrap:anywhere}.entry small{color:#a1aec2;font-size:10px}.entry p{margin-top:3px;font-size:12px;color:#d9e0ed}.entry.secret p{color:#e6c9c1}.empty{color:var(--muted);font-size:12px;padding-top:20px}
  .action{border:1px solid #dec38b40;background:#121b2c;border-radius:12px;padding:18px}.action-head{display:flex;justify-content:space-between;margin-bottom:10px;font-size:12px;color:var(--gold)}textarea{display:block;width:100%;resize:vertical;min-height:90px;background:#080f1d;color:#edf2fc;border:1px solid #53647d;border-radius:8px;padding:12px;outline:none;line-height:1.6}textarea:focus{border-color:var(--gold)}textarea::placeholder{color:#91a0b5}.action-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px}.note{font-size:11px;color:var(--muted)}.primary{border:1px solid #ead29f;background:linear-gradient(120deg,#e4cea1,#bd9c61);color:#191b22;border-radius:7px;padding:10px 22px;font-weight:650;box-shadow:0 3px 16px #0003}.primary:hover:enabled{filter:brightness(1.12)}.targets{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.target{background:#243047;border:1px solid #718099;color:#e8effa;padding:9px 16px;border-radius:7px}.target:hover:enabled{border-color:var(--gold);color:var(--gold)}.winner{color:var(--gold);font:24px serif;margin-bottom:14px}button:focus-visible,summary:focus-visible{outline:2px solid #e4cea1;outline-offset:3px}
  footer{padding:12px 26px;border-top:1px solid #ffffff18;font-size:11px;color:#a7b3c8}summary{cursor:pointer;color:#c9b68e}details p{padding:12px 0;line-height:1.9}.expanded{position:fixed;inset:12px;z-index:2147483000;overflow:auto}.thinking{animation:pulse 1.8s infinite}@keyframes pulse{50%{opacity:.5}}
  @container(max-width:760px){.layout{grid-template-columns:1fr}aside{border-left:0;border-top:1px solid #ffffff18;display:grid;grid-template-columns:200px 1fr}.identity{border-bottom:0;border-right:1px solid #ffffff18}.log{max-height:200px}header{padding:16px 20px}.table{padding:20px}}
  @container(max-width:460px){header{padding:14px;gap:6px}h1{font-size:18px;letter-spacing:.02em}.sigil{font-size:26px}.brand{gap:8px}.eyebrow{font-size:8px}.table{padding:14px}.seats{gap:8px}.seat{padding:13px 5px}.avatar{width:44px;height:44px;font-size:22px}.seat strong{font-size:13px}.moon-panel{padding:14px;gap:14px}.moon-panel p{font-size:15px}.moon{width:42px;height:42px}aside{display:block}.identity{padding:16px;border-bottom:1px solid #ffffff18}.identity h2{font-size:23px}.records{padding:16px}footer{padding:12px 16px}.primary{padding:9px 14px}.expanded{inset:0;border-radius:0}}
  .page-game{border:0;border-radius:12px;min-height:calc(100vh - 150px)}.page-game .layout{grid-template-columns:minmax(0,1fr) 340px}.page-game .table{padding:14px 24px}.page-game .phase{margin-bottom:10px}.page-game .dm-stage{height:clamp(320px,48vh,640px);max-height:none;margin:12px 0;padding:12px 18px}.page-game .action{padding:12px 18px}.page-game .seats{grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}.page-game .seat{padding:20px 6px 10px}.page-game .avatar{width:44px;height:44px}.page-game .moon-panel{display:none}.dm-stage{margin:18px 0;padding:18px 22px;border:1px solid #bda16c44;border-radius:12px;background:#080e1c99;max-height:300px;overflow:auto}.dm-stage article{margin-top:12px}.dm-stage strong{color:#dec38b;font-size:12px}.dm-stage p{white-space:pre-wrap;line-height:1.8}.page-game .identity-reveal{padding:18px;margin-bottom:18px}.page-game .identity-reveal h2{font-size:30px;line-height:1.6}.page-game .log{max-height:calc(100vh - 420px);min-height:180px}.page-game textarea{min-height:80px}.page-game header{padding:14px 24px}
  @container(max-width:900px){.page-game .layout{grid-template-columns:1fr}.page-game .seats{grid-template-columns:repeat(3,minmax(0,1fr))}.page-game .log{max-height:240px}.dm-stage{max-height:240px}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
  `
  const labels = { identity: '领取你的身份', night: '夜晚进行中', inspection: '你的查验结果', daybreak: '天亮了', 'next-night': '白天结束', 'wolf-talk': '狼队密谈', 'wolf-vote': '狼队行动', seer: '预言家行动', dawn: '天亮', speech: '白天发言', 'last-words': '首夜遗言', vote: '放逐投票', verdict: '投票结算', ended: '终局复盘' }
  function Game({ data, busy, advance, revision, paused, error, resume, foreground, page }) {
    const [target, setTarget] = React.useState(null)
    const attempted = React.useRef(null)
    const [text, setText] = React.useState(''), [expanded, setExpanded] = React.useState(false)
    const [shadow, setShadow] = React.useState(null), host = React.useRef(null), log = React.useRef(null), publicLog = React.useRef(null), followLog = React.useRef(true), followPublic = React.useRef(true)
    React.useLayoutEffect(() => { setShadow(host.current.shadowRoot || host.current.attachShadow({ mode: 'open' })) }, [])
    React.useEffect(() => { followLog.current = true; if (log.current) log.current.scrollTop = log.current.scrollHeight }, [shadow])
    React.useEffect(() => { if (log.current && followLog.current) log.current.scrollTop = log.current.scrollHeight }, [data.history.length, shadow])
    React.useEffect(() => { if (publicLog.current && followPublic.current) publicLog.current.scrollTop = publicLog.current.scrollHeight }, [data.publicHistory.length, shadow])
    const trackScroll = ref => event => { const el = event.currentTarget; ref.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48 }
    React.useEffect(() => { const escape = e => { if (e.key === 'Escape') setExpanded(false) }; document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape) }, [])
    React.useEffect(() => { setTarget(null); setText('') }, [data.phase, data.day, data.action?.kind])
    React.useEffect(() => {
      if (data.action?.kind !== 'auto' || busy || paused || error || attempted.current === revision) return
      const timer = setTimeout(() => { attempted.current = revision; void advance(null) }, data.phase === 'speech' ? 1200 : 300)
      return () => clearTimeout(timer)
    }, [revision, data.action?.kind, busy, paused, error])
    const retry = () => { attempted.current = null; resume(); if (error && data.action?.kind !== 'auto') { if (data.action?.kind === 'speak') void advance({ text }); else if (target !== null) void advance({ target }); else void advance(null) } }
    const secret = ['night', 'wolf-talk', 'wolf-vote', 'seer', 'inspection', 'identity'].includes(data.phase)
    const entries = data.history.filter(e => e.private)
    const button = (label, run, className = 'quiet', disabled = busy) => h('button', { type: 'button', className, disabled, onClick: run }, label)
    const content = h(React.Fragment, null, h('style', null, css),
      !page && !foreground && h('section', { className: 'public-story', 'aria-label': '公共对话', role: 'log' }, data.publicHistory.map((e, i) => h('article', { key: i, className: e.actor === 'dm' ? 'dm-message' : 'player-message' }, h('strong', null, e.actor === 'dm' ? 'DM · 第' + e.day + '天' : e.actor + '号'), h('p', null, e.text)))),
      h('main', { className: 'game' + (page ? ' page-game' : '') + (expanded ? ' expanded' : ''), 'aria-label': '月下六席游戏桌面' },
      h('header', null, h('div', { className: 'brand' }, h('span', { className: 'sigil', 'aria-hidden': true }, '☾'), h('div', null, h('div', { className: 'eyebrow' }, 'THE SIX · MOONLIT COUNCIL'), h('h1', null, '月下六席 · 狼人杀'))), !page && button(expanded ? '收起视图' : '展开视图', () => setExpanded(!expanded), 'quiet', false)),
      h('div', { className: 'layout' }, h('section', { className: 'table' },
        h('div', { className: 'phase' }, h('div', null, h('span', { className: 'day' }, 'ROUND ' + String(data.day).padStart(2, '0') + ' / 第' + data.day + '天'), h('b', null, labels[data.phase])), h('span', { className: 'pill' }, '● ' + data.players.filter(p => p.alive).length + ' / 6 存活')),
        data.phase === 'identity' ? h('section', { className: 'identity-reveal' }, h('p', null, '你是' + data.human + '号 · 你的身份'), h('h2', null, data.self.role), h('p', null, data.self.role === '狼人' ? '每晚与队友商议袭击目标，白天隐藏身份。存活狼人不少于好人时获胜。' : data.self.role === '预言家' ? '每晚查验一名玩家。找出两名狼人，在白天投票放逐他们。' : '你没有夜间技能。观察发言、参与讨论与投票，放逐全部狼人。'), button('我已了解，进入第一晚', () => advance(null), 'primary')) : null,
        data.spectating ? h('p', { className: 'spectating' }, '你已出局，正在观战。其余角色将自动继续，终局揭晓全部身份。') : null,
        h('div', { className: 'seats' }, data.players.map(p => h('article', { key: p.id, className: 'seat' + (p.id === data.human ? ' self' : '') + (!p.alive ? ' out' : '') + (data.currentSpeaker === p.id ? ' speaking' : ''), style: { '--hue': 205 + p.id * 17 } },
          h('span', { className: 'number' }, '0' + p.id), h('span', { className: 'badge' }, p.id === data.human ? 'YOU' : 'NPC'), h('div', { className: 'avatar', 'aria-hidden': true }, String(p.id)), h('strong', null, p.id + '号'), h('div', { className: 'status' + (p.alive ? ' alive' : '') }, p.alive ? '● 存活' : '已出局'), data.revealed ? h('div', { className: 'status' }, data.revealed.find(r => r.id === p.id).role) : null))),
        data.phase !== 'identity' ? h('div', { className: 'moon-panel' }, h('div', { className: 'moon', 'aria-hidden': true }), h('div', null, h('small', null, secret ? 'UNDER THE COVER OF NIGHT' : 'EVERY WORD LEAVES A TRACE'), h('p', null, secret ? '月光之下，各怀秘密。' : '谁的谎言，会留到天明？'), h('p', { className: 'hint' }, secret ? '私密行动仅对有权知情的角色可见。' : '观察发言与投票，在证据中寻找同伴。'))) : null,
        page && h('section', { className: 'dm-stage', 'aria-label': '主持与公开发言', role: 'log', tabIndex: 0, ref: publicLog, onScroll: trackScroll(followPublic) }, h('div', { className: 'eyebrow' }, 'LIVE · 主持与发言'), data.publicHistory.length ? data.publicHistory.map((e,i) => h('article', { key: i }, h('strong', null, e.actor === 'dm' ? 'DM · 主持人' : e.actor + '号'), h('p', null, e.text))) : h('p', null, '欢迎入席。领取身份后，确认进入第一晚。')),
        h('section', { className: 'action', 'aria-label': '行动区域' }, data.winner ? h('h2', { className: 'winner' }, data.winner === '平局' ? '本局平局' : data.winner + '获胜') : null,
          h('div', { className: 'action-head' }, h('span', null, busy ? '正在思考…' : data.action?.kind === 'auto' ? (data.phase === 'speech' ? data.currentSpeaker + '号正在发言' : data.phase === 'night' ? '夜晚进行中，请稍候' : '其他玩家正在行动') : data.action ? '轮到你行动' : '身份已揭晓'), h('span', { className: 'note' }, secret ? '私密频道' : '公共频道')),
          paused || error ? h('div', { role: 'status' }, h('p', null, error ? '行动未完成：' + error : '游戏已暂停'), button(error ? '重试当前行动' : '恢复游戏', retry, 'primary', busy)) : null,
          data.action?.kind === 'auto' ? h('p', { className: 'note thinking', role: 'status' }, data.spectating ? '观战中，其他玩家正在行动…' : data.phase === 'night' ? '你当前无需操作，夜晚结束后 DM 将公布结果。' : data.phase === 'speech' ? '请听其他玩家发言，轮到你时会停下。' : '正在结算，请稍候…') : null,
          data.action?.kind === 'confirm' && data.phase !== 'identity' ? h('div', null,
            data.phase === 'inspection' ? h('p', { className: 'inspection' }, data.history.filter(e => e.private && e.text.startsWith('查验结果')).at(-1)?.text) : null,
            button(({ identity: '我已了解，进入第一晚', inspection: '记住结果，闭眼等待', daybreak: data.pendingLastWords ? (data.currentSpeaker === data.human ? '发表我的遗言' : '听取首夜遗言') : '进入白天讨论', 'next-night': '进入第' + data.day + '晚' })[data.action.gate], () => advance(null), 'primary')) : null,
          data.action?.kind === 'speak' ? h(React.Fragment, null, h('textarea', { value: text, maxLength: 1200, disabled: busy, 'aria-label': '你的发言', placeholder: data.phase === 'last-words' ? '留下你的身份、查验结果和最后建议…' : secret ? '悄声与队友交换你的判断…' : '说出你的观察，让其他人相信你…', onChange: e => setText(e.target.value) }), h('div', { className: 'action-foot' }, h('span', { className: 'note' }, text.length + ' / 1200'), button(secret ? '发送密谈' : data.phase === 'last-words' ? '提交遗言' : '结束发言', async () => { if (await advance({ text }) !== false) setText('') }, 'primary', busy || !text.trim()))) : null,
          data.action?.targets?.length ? h(React.Fragment, null, h('p', { className: 'note' }, { kill: '选择今晚的袭击目标', inspect: '选择要查验的角色', vote: '选择你要放逐的角色' }[data.action.kind]), h('div', { className: 'targets' }, data.action.targets.map(id => h('button', { key: id, type: 'button', className: 'target', disabled: busy, 'aria-pressed': target === id, onClick: () => setTarget(id) }, id + '号')), data.action.abstain ? button('弃票', () => setTarget(0)) : null), target !== null ? h('div', { className: 'action-foot' }, h('p', null, target === 0 ? '本轮弃票' : '已选择 ' + target + '号'), button(({ kill: '确认袭击', inspect: '确认查验', vote: '确认投票' })[data.action.kind], () => advance({ target }), 'primary')) : null) : null)),
        h('aside', null, h('section', { className: 'identity' }, h('div', { className: 'eyebrow' }, 'YOUR SECRET IDENTITY'), h('h2', null, data.self.role), h('p', null, '第 ' + data.human + ' 席 · ' + (data.self.role === '狼人' ? '隐藏你的身份，与你的同伴并肩。' : data.self.role === '预言家' ? '你的查验，是黑夜中唯一的光。' : '你没有技能，但每一票都有力量。')), data.teammates.length ? h('p', { className: 'team' }, '狼队同伴 · ' + data.teammates.filter(id => id !== data.human).map(id => id + '号').join('、')) : null),
          h('section', { className: 'records' }, h('h3', { className: 'eyebrow' }, '私密记录'),
            h('div', { className: 'log', role: 'log', 'aria-label': '私密记录', tabIndex: 0, ref: log, onScroll: trackScroll(followLog) }, entries.length ? entries.map((e, i) => h('div', { className: 'entry' + (e.private ? ' secret' : ''), key: i }, h('small', null, 'DAY ' + String(e.day).padStart(2, '0') + ' · ' + (e.actor === 'dm' ? '主持人' : e.actor + '号') + (e.private ? ' · 私密' : '')), h('p', null, e.text))) : h('p', { className: 'empty' }, '暂无私密记录。查验结果、狼队密谈和你的私人行动会保存在这里。'))))),
      data.review ? h('section', { className: 'records', 'aria-label': '终局复盘' }, h('h2', null, '终局复盘'), data.review.map((e,i) => h('p', {key:i}, '第' + e.day + '天 · ' + (e.actor === 'dm' ? 'DM' : e.actor + '号') + '：' + e.text))) : null,
      h('footer', null, h('details', null, h('summary', null, '本局规则 · 六人标准局'), h('p', null, data.rules)))))
    return h('div', { ref: host, 'data-werewolf-host': '' }, shadow ? createPortal(content, shadow) : null)
  }
  function Lobby({ start, busy }) {
    return h('section', { style: { minHeight: 'calc(100vh - 160px)', display: 'grid', placeContent: 'center', textAlign: 'center', padding: '36px 20px', background: 'radial-gradient(ellipse at 50% 25%,#253c57,transparent 65%)', color: '#eef2fa', fontFamily: 'system-ui' } },
      h('div', { style: { color: '#dec38b', fontSize: 80 } }, '☾'),
      h('p', { style: { letterSpacing: '.3em', color: '#dec38b', fontSize: 11 } }, 'THE SIX · MOONLIT COUNCIL'),
      h('h1', { style: { fontSize: 'clamp(30px,5vw,58px)', letterSpacing: '.12em', fontWeight: 500, margin: '20px 0' } }, '月下六席'),
      h('p', { style: { color: '#b9c5d7', lineHeight: 2 } }, '六个座位，两名狼人。你会相信谁？'),
      h('p', { style: { margin: '28px 0', color: '#dec38b' } }, '2 狼人  /  1 预言家  /  3 村民'),
      h('button', { disabled: busy, onClick: start, style: { margin: '0 auto', padding: '16px 48px', border: '1px solid #efdbb6', borderRadius: 9, background: 'linear-gradient(120deg,#efdcaf,#bd9c61)', color: '#172033', fontSize: 18, fontWeight: 650 } }, busy ? '正在入席…' : '开始 六人狼人杀'),
      h('p', { style: { color: '#9aaac0', marginTop: 26, fontSize: 13, lineHeight: 2 } }, '座位与身份随机分配 · 首夜死者可留遗言', h('br'), '主持自动推进流程，轮到你时停下。进度自动保存。'));
  }
  // Stage lease: the card maps its projection onto the generic StageScene and fills the HUD strip.
  // Card-local client state the scene needs (vote pick → focus, 返回故事 → release), keyed by game.
  const picks = new Map(), returned = new Set()
  let refreshScene = () => {}
  const publicLines = data => data.stage.lines.filter((line, i) => !data.history[i]?.private)
  function scene({ gameId, data }) {
    if (!data?.stage || (data.winner && returned.has(gameId))) return null
    const lines = publicLines(data)
    const seats = data.stage.seats.filter(s => s.alive && !s.self)
    const speaker = seats.find(s => s.speaking), pick = seats.find(s => s.id === picks.get(gameId))
    const recent = [...lines].reverse().map(l => seats.find(s => s.name === l.speaker)).filter(Boolean)
    const chosen = [...new Set([speaker, pick, ...recent, ...seats].filter(Boolean))].slice(0, 4)
    const centre = speaker || pick || chosen[0]
    const ordered = chosen.filter(s => s !== centre).sort((a, b) => a.id - b.id)
    if (centre) ordered.splice(Math.floor(ordered.length / 2), 0, centre)
    const emotion = name => [...lines].reverse().find(l => l.speaker === name)?.emotion || undefined
    return {
      actors: ordered.map(s => ({ name: s.name, emotion: emotion(s.name), focus: s === pick || undefined })),
      lines: lines.map(l => ({ id: String(l.id), speaker: l.speaker || undefined, text: l.text, emotion: l.emotion || undefined })),
    }
  }
  const hudCss = `
  .ww-root{position:absolute;inset:0;pointer-events:none}
  .ww-hud,.ww-bar{position:absolute;pointer-events:auto;color:var(--gal-ui-ink);background:var(--gal-ui-surface);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius);box-shadow:var(--gal-ui-shadow);font:14px/1.4 var(--gal-ui-font)}
  .ww-hud{top:12px;left:50%;transform:translateX(-50%);max-width:calc(100% - 24px);display:flex;flex-wrap:wrap;align-items:center;gap:14px;padding:10px 16px}
  .ww-root *{box-sizing:border-box}.ww-root button,.ww-root textarea,.ww-root input{font:inherit;pointer-events:auto}.ww-root button{cursor:pointer;color:var(--gal-ui-ink);background:var(--gal-ui-surface-2);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius);padding:6px 12px;min-height:36px}.ww-root button:disabled{opacity:.45;cursor:default}.ww-root :focus-visible{outline:2px solid var(--gal-ui-focus);outline-offset:2px}
  .ww-phase{display:flex;flex-direction:column;min-width:96px;white-space:nowrap}.ww-phase b{font-size:18px}.ww-phase small{color:var(--gal-ui-muted)}.ww-clock{font-size:22px;color:var(--gal-ui-accent);font-variant-numeric:tabular-nums}
  .ww-seats{display:flex;gap:8px;margin:0;padding:0;list-style:none}.ww-seats>li{position:relative}.ww-seat{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;width:72px;padding:4px 2px;border:1px solid transparent;border-radius:var(--gal-ui-radius);background:transparent}
  .ww-seat .ww-av{position:relative;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;outline:1px solid var(--gal-ui-line);overflow:hidden;background:var(--gal-ui-surface-2)}.ww-seat .ww-you{color:var(--gal-ui-accent);font-size:20px}
  .ww-no{position:absolute;top:0;left:2px;min-width:20px;padding:0 4px;font-size:12px;line-height:18px;text-align:center;background:var(--gal-ui-surface);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius);z-index:1}
  .ww-nm{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}.ww-st{font-size:11px;color:var(--gal-ui-muted)}
  .ww-seat.speak .ww-av{outline:3px solid var(--gal-ui-accent);box-shadow:0 0 14px var(--gal-ui-accent)}.ww-seat.speak .ww-nm,.ww-seat.me .ww-nm{color:var(--gal-ui-accent)}
  .ww-seat.out .ww-av{opacity:.45;filter:grayscale(1)}.ww-seat.out .ww-nm{color:var(--gal-ui-muted);text-decoration:line-through}
  .ww-root button.ww-seat{min-height:0;padding:4px 2px;border-color:transparent;background:transparent}.ww-root button.ww-seat.pick{border-color:var(--gal-ui-line)}.ww-root button.ww-seat[aria-pressed=true]{border-color:var(--gal-ui-accent);background:var(--gal-ui-surface-2);box-shadow:inset 0 0 0 1px var(--gal-ui-accent)}
  .ww-root .ww-mark{position:absolute;top:0;right:2px;z-index:2;min-width:22px;min-height:22px;padding:0 3px;font-size:12px;line-height:20px;font-weight:700;color:var(--gal-ui-accent);background:var(--gal-ui-surface);border:1px dashed var(--gal-ui-line);border-radius:var(--gal-ui-radius)}.ww-root .ww-mark.empty{opacity:.55;color:var(--gal-ui-muted)}
  .ww-act{display:flex;flex-wrap:wrap;align-items:center;gap:10px}.ww-count,.ww-note{color:var(--gal-ui-muted);font-size:13px}.ww-root .ww-role{padding:4px 10px;white-space:nowrap}
  .ww-root .ww-primary{background:var(--gal-ui-accent);color:var(--gal-ui-accent-ink);border-color:var(--gal-ui-accent);font-weight:700}
  .ww-speak{display:flex;gap:8px;align-items:flex-end;flex:1 1 100%}.ww-root textarea{flex:1;width:100%;min-height:56px;max-height:140px;resize:vertical;padding:8px 10px;color:var(--gal-ui-ink);background:var(--gal-ui-surface-2);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius)}
  .ww-alert{flex:1 1 100%;display:flex;align-items:center;justify-content:space-between;gap:10px}
  .ww-pop{position:absolute;top:calc(100% + 8px);z-index:3;display:flex;flex-direction:column;gap:10px;padding:12px 14px;color:var(--gal-ui-ink);background:var(--gal-ui-surface);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius);box-shadow:var(--gal-ui-shadow)}
  .ww-menu{left:50%;transform:translateX(-50%);width:max-content;max-width:100%}.ww-menu-row{display:flex;gap:6px;align-items:center}.ww-menu-row button{min-width:44px}.ww-menu input{width:4.5em;min-height:36px;padding:4px 8px;color:var(--gal-ui-ink);background:var(--gal-ui-surface-2);border:1px solid var(--gal-ui-line);border-radius:var(--gal-ui-radius)}
  .ww-root .ww-menu button[aria-pressed=true]{border-color:var(--gal-ui-accent);color:var(--gal-ui-accent)}
  .ww-sheet{right:0;width:min(360px,100%);max-height:min(60vh,520px);overflow:auto}.ww-sheet h3{margin:0;font-size:12px;font-weight:600;color:var(--gal-ui-muted)}.ww-sheet-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.ww-sheet-head b{font-size:20px;color:var(--gal-ui-accent)}
  .ww-sheet ul{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}.ww-sheet li,.ww-sheet p{margin:0;font-size:13px;overflow-wrap:anywhere}.ww-sheet textarea{min-height:110px;max-height:240px}
  .ww-phone{top:0;left:0;right:0;transform:none;max-width:none;flex-direction:column;flex-wrap:nowrap;align-items:stretch;gap:6px;padding:6px 8px}
  .ww-phone .ww-row{display:flex;align-items:center;gap:8px;min-width:0}.ww-phone .ww-phase{flex-direction:row;align-items:baseline;gap:8px;min-width:0;flex:1;overflow:hidden}.ww-phone .ww-phase b{font-size:16px}.ww-phone .ww-clock{font-size:18px}
  .ww-phone .ww-seats{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px}.ww-phone .ww-seat{width:100%;min-height:36px;padding:3px 1px}.ww-phone .ww-seat .ww-av{width:36px;height:36px}.ww-phone .ww-nm{font-size:11px}.ww-phone .ww-st{display:none}.ww-phone .ww-no{font-size:10px;line-height:15px;min-width:16px;padding:0 2px}
  .ww-phone .ww-mark{right:0}.ww-phone .ww-sheet{left:0;right:0;width:auto}.ww-phone .ww-menu{left:0;right:0;transform:none;width:auto}
  .ww-bar{left:8px;right:8px;bottom:8px;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;max-height:45%;overflow:auto}.ww-bar .ww-pickinfo{display:flex;align-items:center;gap:8px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ww-bar .ww-pickinfo b{color:var(--gal-ui-accent)}
  `
  const VOTE_SECONDS = 30, MARKS = ['好', '狼', '?']
  // The stage reports its device profile; an upright phone ('mobile-portrait') gets the two-row strip and bottom bar.
  const isPhone = device => device === 'phone' || device === 'mobile-portrait'
  let hostUi = null
  // Private suspicion marks and notes live in the card's own game data (host handler 'notes'), never in game state.
  function useNotes(gameId, generation) {
    const [notes, setNotes] = React.useState(null), [status, setStatus] = React.useState('loading'), [problem, setProblem] = React.useState('')
    const latest = React.useRef(null), timer = React.useRef(null)
    latest.current = notes
    const load = React.useCallback(() => {
      setStatus('loading')
      hostUi.callHost('notes', { gameId, op: 'read' }).then(n => { setNotes({ marks: n?.marks || {}, text: n?.text || '' }); setStatus('ready') }, e => { setProblem(e.message); setStatus('load-error') })
    }, [gameId])
    React.useEffect(() => { load() }, [load, generation])
    const save = patch => hostUi.callHost('notes', { gameId, op: 'save', ...patch }).then(() => setStatus('ready'), e => { setProblem(e.message); setStatus('error') })
    const setMark = (id, mark) => {
      const marks = { ...latest.current.marks }
      if (mark) marks[id] = mark; else delete marks[id]
      setNotes({ ...latest.current, marks }); setStatus('saving'); void save({ marks })
    }
    const flushText = () => { if (!timer.current) return; clearTimeout(timer.current); timer.current = null; void save({ text: latest.current.text }) }
    const setText = text => { setNotes({ ...latest.current, text }); setStatus('saving'); clearTimeout(timer.current); timer.current = setTimeout(() => { timer.current = null; void save({ text }) }, 800) }
    React.useEffect(() => () => { if (timer.current) { clearTimeout(timer.current); void hostUi.callHost('notes', { gameId, op: 'save', text: latest.current.text }) } }, [gameId])
    const retry = () => { if (status === 'load-error') load(); else { setStatus('saving'); void save({ ...latest.current }) } }
    return { notes, status, problem, setMark, setText, flushText, retry }
  }
  function MarkMenu({ seat, mark, pick, close }) {
    const [custom, setCustom] = React.useState(mark && !MARKS.includes(mark) ? mark : '')
    const first = React.useRef(null)
    React.useEffect(() => { first.current?.focus() }, [])
    const done = value => { pick(value); close() }
    return h('div', { className: 'ww-pop ww-menu', role: 'dialog', 'aria-label': seat.id + '号 ' + seat.name + ' · 标记' },
      h('div', { className: 'ww-menu-row' }, MARKS.map((m, i) => h('button', { key: m, ref: i ? null : first, type: 'button', 'aria-pressed': mark === m, onClick: () => done(m) }, m))),
      h('form', { className: 'ww-menu-row', onSubmit: e => { e.preventDefault(); if (custom.trim()) done(custom.trim()) } },
        h('input', { value: custom, maxLength: 2, placeholder: '自定', 'aria-label': '自定义标记，最多2个字', onChange: e => setCustom(e.target.value) }),
        h('button', { type: 'submit', disabled: !custom.trim() }, '标记')),
      h('div', { className: 'ww-menu-row' }, h('button', { type: 'button', disabled: !mark, onClick: () => done(null) }, '清除'), h('button', { type: 'button', onClick: close }, '取消')))
  }
  function Sheet({ data, notes, GameControls, close }) {
    const stage = data.stage, closer = React.useRef(null), results = stage.self.nightResults
    React.useEffect(() => { closer.current?.focus() }, [])
    const saving = { loading: '正在读取笔记…', saving: '保存中…', ready: '已保存', error: '保存失败：' + notes.problem, 'load-error': '笔记读取失败：' + notes.problem }[notes.status]
    const mates = (data.teammates || []).filter(id => id !== data.human)
    return h('div', { className: 'ww-pop ww-sheet', id: 'ww-sheet', role: 'dialog', 'aria-label': '你的私密面板' },
      h('div', { className: 'ww-sheet-head' }, h('div', null, h('h3', null, '你的身份 · ' + data.human + '号'), h('b', null, stage.self.role)), h('button', { ref: closer, type: 'button', onClick: close }, '关闭')),
      mates.length ? h('p', null, '狼队同伴：' + mates.map(id => id + '号 ' + (stage.seats.find(s => s.id === id)?.name || '')).join('、')) : null,
      h('h3', null, '夜间结果'),
      results.length ? h('ul', null, results.map(r => h('li', { key: r.id }, r.text))) : h('p', { className: 'ww-note' }, '暂无夜间结果。'),
      h('h3', null, '私人笔记'),
      notes.notes ? h('textarea', { value: notes.notes.text, maxLength: 20000, 'aria-label': '私人笔记，只有你能看到', placeholder: '记下你的推理，只有你能看到…', onChange: e => notes.setText(e.target.value), onBlur: notes.flushText }) : null,
      h('div', { className: 'ww-menu-row', role: 'status' }, h('span', { className: 'ww-note' }, saving), notes.status === 'error' || notes.status === 'load-error' ? h('button', { type: 'button', onClick: notes.retry }, '重试') : null),
      h('h3', null, '游戏控制'), h('div', { className: 'ww-menu-row' }, h(GameControls)))
  }
  function Hud({ gameId, data, busy, advance, revision, paused, error, resume, read, device, Avatar, GameControls }) {
    const stage = data.stage, action = data.action, mine = action?.targets?.length > 0, phone = isPhone(device)
    const [target, setTargetState] = React.useState(null), [text, setText] = React.useState('')
    const [left, setLeft] = React.useState(VOTE_SECONDS), [open, setOpen] = React.useState(null) // null | 'sheet' | seat id
    const attempted = React.useRef(null), root = React.useRef(null), opener = React.useRef(null)
    const notes = useNotes(gameId, data.phase === 'identity')
    const marks = notes.notes?.marks || {}
    const setTarget = id => { setTargetState(id); if (id) picks.set(gameId, id); else picks.delete(gameId); refreshScene() }
    React.useEffect(() => { setTargetState(null); setText(''); if (picks.delete(gameId)) refreshScene() }, [data.phase, data.day, action?.kind])
    React.useEffect(() => {
      if (action?.kind !== 'auto' || busy || paused || error || read.unread > 1 || attempted.current === revision) return
      const timer = setTimeout(() => { attempted.current = revision; void advance(null) }, 300)
      return () => clearTimeout(timer)
    }, [revision, action?.kind, busy, paused, error, read.unread])
    // The player's vote has 30 s; expiry abstains. The clock holds while busy, paused or failed.
    const voting = stage.vote.open
    React.useEffect(() => { setLeft(VOTE_SECONDS) }, [voting, data.day])
    React.useEffect(() => {
      if (!voting || busy || paused || error) return
      if (left <= 0) { void advance({ target: 0 }); return }
      const timer = setTimeout(() => setLeft(left - 1), 1000)
      return () => clearTimeout(timer)
    }, [voting, left, busy, paused, error])
    // Popovers (sheet, mark menu) close on Escape or a press outside the panel, and hand focus back to their opener.
    const close = React.useCallback(() => { setOpen(null); opener.current?.focus?.() }, [])
    const toggle = (what, event) => { if (open === what) return close(); opener.current = event.currentTarget; setOpen(what) }
    React.useEffect(() => {
      if (open === null) return
      const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close() } }
      const press = e => { if (!root.current?.contains(e.target)) setOpen(null) }
      document.addEventListener('keydown', key, true); document.addEventListener('pointerdown', press, true)
      return () => { document.removeEventListener('keydown', key, true); document.removeEventListener('pointerdown', press, true) }
    }, [open, close])
    const submit = async input => { if (await advance(input) !== false) { setText(''); setTarget(null) } }
    const retry = () => { attempted.current = null; resume(); if (error && action && action.kind !== 'auto') { if (action.kind === 'speak') void advance({ text }); else if (target !== null) void advance({ target }); else void advance(null) } }
    const secret = ['night', 'wolf-talk', 'wolf-vote', 'seer', 'inspection', 'identity'].includes(data.phase)
    const seat = s => {
      const pickable = mine && action.targets.includes(s.id), mark = marks[s.id]
      const label = s.id + '号 ' + (s.self ? '你' : s.name) + (s.alive ? '' : '，已出局') + (mark ? '，标记：' + mark : '')
      const body = [h('span', { key: 'n', className: 'ww-no' }, s.id),
        h('span', { key: 'a', className: 'ww-av' }, s.self ? h('span', { className: 'ww-you' }, '你') : h(Avatar, { name: s.name, size: phone ? 36 : 52 })),
        h('span', { key: 'm', className: 'ww-nm' }, s.self ? '你' : s.name),
        h('span', { key: 's', className: 'ww-st' }, data.revealed ? data.revealed.find(r => r.id === s.id)?.role : s.alive ? (s.speaking ? '发言中' : '存活') : '出局')]
      const className = 'ww-seat' + (s.speaking ? ' speak' : '') + (s.self ? ' me' : '') + (s.alive ? '' : ' out') + (pickable ? ' pick' : '')
      if (s.self) return h('li', { key: s.id }, h('div', { className, 'aria-label': label }, body))
      // Tapping a seat votes when it is a target, otherwise it opens the mark menu; the corner tag always does.
      const markable = notes.notes !== null
      return h('li', { key: s.id },
        h('button', { type: 'button', className, disabled: pickable ? busy : undefined, 'aria-label': label, 'aria-pressed': pickable ? target === s.id : undefined,
          'aria-haspopup': pickable ? undefined : 'dialog', onClick: e => pickable ? setTarget(target === s.id ? null : s.id) : markable && toggle(s.id, e),
          onContextMenu: markable ? e => { e.preventDefault(); toggle(s.id, e) } : undefined }, body),
        mark || (pickable && markable) ? h('button', { type: 'button', className: 'ww-mark' + (mark ? '' : ' empty'), 'aria-label': s.id + '号 标记' + (mark ? '：' + mark : ''), 'aria-haspopup': 'dialog', disabled: !markable, onClick: e => toggle(s.id, e) }, mark || '+') : null)
    }
    const gate = { identity: '我已了解，进入第一晚', inspection: '记住结果，闭眼等待', daybreak: data.pendingLastWords ? (data.currentSpeaker === data.human ? '发表我的遗言' : '听取首夜遗言') : '进入白天讨论', 'next-night': '进入第' + data.day + '晚' }
    const confirm = { kill: '确认袭击', inspect: '确认查验', vote: '确认投票' }
    const status = busy ? '正在思考…' : action?.kind === 'auto' ? (data.spectating ? '观战中' : data.phase === 'speech' ? data.currentSpeaker + '号正在发言' : '其他玩家正在行动') : action ? '轮到你行动' : ''
    const picked = stage.seats.find(s => s.id === target)
    const phase = h('div', { key: 'phase', className: 'ww-phase' }, h('b', null, labels[data.phase]), h('small', null, '第' + data.day + '天' + (status ? ' · ' + status : '')),
      voting ? h('span', { className: 'ww-clock', role: 'timer', 'aria-label': '投票剩余 ' + left + ' 秒' }, '0:' + String(Math.max(left, 0)).padStart(2, '0')) : null)
    const role = h('button', { key: 'role', type: 'button', className: 'ww-role', 'aria-haspopup': 'dialog', 'aria-expanded': open === 'sheet', 'aria-controls': open === 'sheet' ? 'ww-sheet' : undefined, 'aria-label': '你的身份：' + stage.self.role + '，打开私密面板', onClick: e => toggle('sheet', e) }, stage.self.role + ' ▾')
    const seats = h('ul', { key: 'seats', className: 'ww-seats', 'aria-label': '座位' }, stage.seats.map(seat))
    const actions = [
      mine ? h(React.Fragment, { key: 'pick' },
        phone ? h('span', { className: 'ww-pickinfo' }, picked ? [h(Avatar, { key: 'a', name: picked.name, size: 28 }), h('span', { key: 't' }, { kill: '袭击 ', inspect: '查验 ', vote: '投给 ' }[action.kind], h('b', null, picked.id + ' ' + picked.name))] : h('span', { className: 'ww-note' }, { kill: '点选今晚的袭击目标', inspect: '点选要查验的角色', vote: '点选你要放逐的角色' }[action.kind])) : null,
        voting ? h('span', { className: 'ww-count' }, '已投 ' + stage.vote.cast + '/' + stage.vote.total) : phone ? null : h('span', { className: 'ww-note' }, { kill: '选择今晚的袭击目标', inspect: '选择要查验的角色', vote: '' }[action.kind]),
        action.abstain ? h('button', { type: 'button', disabled: busy, onClick: () => submit({ target: 0 }) }, '弃票') : null,
        h('button', { type: 'button', className: 'ww-primary', disabled: busy || !target, onClick: () => submit({ target }) }, phone ? '确认' : confirm[action.kind])) : null,
      action?.kind === 'confirm' ? h(React.Fragment, { key: 'gate' },
        data.phase === 'inspection' ? h('span', { className: 'ww-note' }, stage.self.nightResults.at(-1)?.text) : null,
        h('button', { type: 'button', className: 'ww-primary', disabled: busy, onClick: () => advance(null) }, gate[action.gate])) : null,
      data.winner ? h(React.Fragment, { key: 'end' }, h('b', null, data.winner === '平局' ? '本局平局' : data.winner + '获胜'),
        h('button', { type: 'button', className: 'ww-primary', onClick: () => { returned.add(gameId); refreshScene() } }, '返回故事')) : null]
    const extra = [
      action?.kind === 'speak' ? h('div', { key: 'speak', className: 'ww-speak' },
        h('textarea', { value: text, maxLength: 1200, disabled: busy, 'aria-label': '你的发言', placeholder: data.phase === 'last-words' ? '留下你的身份、查验结果和最后建议…' : secret ? '悄声与队友交换你的判断…' : '说出你的观察，让其他人相信你…', onChange: e => setText(e.target.value), onKeyDown: e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && text.trim() && !busy) void submit({ text }) } }),
        h('button', { type: 'button', className: 'ww-primary', disabled: busy || !text.trim(), onClick: () => submit({ text }) }, secret ? '发送密谈' : data.phase === 'last-words' ? '提交遗言' : '结束发言')) : null,
      paused || error ? h('div', { key: 'alert', className: 'ww-alert', role: 'alert' }, h('span', null, error ? '行动未完成：' + error : '游戏已暂停'),
        h('button', { type: 'button', className: 'ww-primary', disabled: busy, onClick: retry }, error ? '重试当前行动' : '恢复游戏')) : null]
    const openSeat = typeof open === 'number' ? stage.seats.find(s => s.id === open) : null
    const pops = [open === 'sheet' ? h(Sheet, { key: 'sheet', data, notes, GameControls, close }) : null,
      openSeat && notes.notes ? h(MarkMenu, { key: 'menu-' + openSeat.id, seat: openSeat, mark: marks[openSeat.id], pick: value => notes.setMark(openSeat.id, value), close }) : null]
    const live = actions.some(Boolean) || extra.some(Boolean)
    return h('div', { ref: root, className: 'ww-root' }, h('style', null, hudCss),
      phone
        ? h(React.Fragment, null,
          h('div', { className: 'ww-hud ww-phone', role: 'region', 'aria-label': '月下六席 · 狼人杀' }, h('div', { className: 'ww-row' }, phase, role), seats, pops),
          live ? h('div', { className: 'ww-bar', role: 'region', 'aria-label': '行动' }, actions, extra) : null)
        : h('div', { className: 'ww-hud', role: 'region', 'aria-label': '月下六席 · 狼人杀' }, phase, seats, h('div', { className: 'ww-act' }, role, actions), extra, pops))
  }
  return { name: 'dsh-card-werewolf', inject: ['tavernUi'], apply(ctx) {
    hostUi = ctx.tavernUi
    const view = { name: 'six-player', presentation: 'stage', render: Game, lobby: Lobby, stage: { scene, hud: Hud } }
    // scene() is re-read when the host re-renders the game surface; re-registering the same view is the
    // only signal a card has to ask for that after a client-only change (vote pick, 返回故事).
    let dispose = ctx.tavernUi.registerGameModeView(view)
    refreshScene = () => { dispose?.(); dispose = ctx.tavernUi.registerGameModeView(view) }
  } }
} })
