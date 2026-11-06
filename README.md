# 月下六席 · 狼人杀

一位真人、五位独立 NPC、程序 DM 主持的六人狼人杀，使用独立网页游戏界面，以 DSHCARD 人物卡分发。

## 一键下载

**[下载最新版人物卡（werewolf.dshcard）](https://github.com/flizzywine/dshcard-werewolf/releases/latest/download/werewolf.dshcard)**

[全部版本与更新说明](https://github.com/flizzywine/dshcard-werewolf/releases)

## 使用

1. 安装并更新 [DSH Tavern 的 main 版本](https://github.com/flizzywine/dsh-tavern)。所需的 gameMode API、独立游戏页面与冷启动恢复支持已合入 main（提交 [`04e64012`](https://github.com/flizzywine/dsh-tavern/commit/04e640128cd7333ef65fd7fb41a6b777dcec77c0)）；请更新到该提交或更新版本，旧版及 stable 分支不支持此卡。
2. 导入 `.dshcard`，启用卡内插件，配置本局后台模型。
3. 新开游玩，进入大厅并点击“开始 六人狼人杀”。座位与身份随机分配。
4. 更新卡片：人物卡选择窗口 → 批量管理 → 选中原卡 → 更新 → 上传新版。保留已有会话。

## 玩法

- 2 狼人、1 预言家、3 村民。玩家随机占据一席，其余由 NPC 子代理扮演。
- 领取身份 → 第一晚 → 夜间行动 → 天亮公告 → 首夜死者遗言 → 白天发言 → 投票 → 下一晚或终局。
- 程序控制阶段、合法行动、结算和公告；模型负责 NPC 发言与决策，使用配置的模型服务并产生相应费用。
- 中央展示完整公开记录，侧栏展示身份与私密记录。支持节点回退、存档恢复、终局复盘。

## 舞台视图

启用 DSH Tavern 舞台（需要包含 [舞台借用接口](https://github.com/flizzywine/dsh-tavern/pull/629) 的 main 版本）时，游戏借用舞台演出；舞台接口不可用、舞台关闭、未加载或出错时自动回到上面的网页游戏界面。

- 角色立绘按座位顺序站在舞台上（最多 4 人，优先显示发言者与投票对象）；台词由舞台文本框逐句播放，沿用舞台的自动、跳过、记录与语音。
- 顶部信息条：6 个座位（头像、编号、存活或出局），正在发言的座位高亮；阶段标签显示第几天与倒计时。
- 投票：点选座位，再确认或弃权，票数显示在信息条中；被选中的角色在舞台上高亮并前移。
- 点击自己的身份标签打开私密面板：身份、夜间结果与私人笔记。玩家狼人也可在此查阅队友的密谈与袭击选择。
- 私人怀疑标记（好 / 狼 / ?）只有自己可见，保存在本地游戏数据中，不进入提示词，也不发给 NPC。
- 手机竖屏：座位分两行，投票确认栏固定在底部。
- 舞台借用只存在于内存，不写入故事时间线与舞台持久状态；退出或关闭后故事照常继续，存档不受影响。

## 本地开发

Node.js 22.19 或更新版本，无需第三方依赖。

```sh
npm test
npm run build
```

产物为 `dist/werewolf.dshcard`，可用 `node build.mjs /path/to/werewolf.dshcard` 指定输出位置。

- `plugin/rules.mjs`：规则及 NPC 视角。
- `plugin/client.js`：游戏界面。
- `plugin/index.mjs`：宿主注册入口。
- `build.mjs`：打包脚本。

项目可独立测试、打包，不依赖相邻的酒馆源码目录。推送 `v*` 标签会自动构建并发布 Release，顶部链接始终指向最新版。

## 来源与许可

从 [DSH Tavern](https://github.com/flizzywine/dsh-tavern) 狼人杀示例拆分，来源提交 `03004201f`。打包工具也来自该项目，遵循 AGPL-3.0，见 [LICENSE](LICENSE)。
