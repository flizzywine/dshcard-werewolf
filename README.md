# 月下六席 · 狼人杀

一位真人、五位独立 NPC、程序 DM 主持的六人狼人杀，使用独立网页游戏界面，以 DSHCARD 人物卡分发。

## 一键下载

**[下载最新版人物卡（werewolf.dshcard）](https://github.com/flizzywine/dshcard-werewolf/releases/latest/download/werewolf.dshcard)**

[全部版本与更新说明](https://github.com/flizzywine/dshcard-werewolf/releases)

## 使用

1. 安装并更新 [DSH Tavern](https://github.com/flizzywine/dsh-tavern)。需要 gameMode API、独立游戏页面与冷启动恢复支持。验证基线为酒馆提交 `03004201f`；这些功能尚未保证已发布到 main，旧版酒馆无法运行此卡。
2. 导入 `.dshcard`，启用卡内插件，配置本局后台模型。
3. 新开游玩，进入大厅并点击“开始 六人狼人杀”。座位与身份随机分配。
4. 更新卡片：人物卡选择窗口 → 批量管理 → 选中原卡 → 更新 → 上传新版。保留已有会话。

## 玩法

- 2 狼人、1 预言家、3 村民。玩家随机占据一席，其余由 NPC 子代理扮演。
- 领取身份 → 第一晚 → 夜间行动 → 天亮公告 → 首夜死者遗言 → 白天发言 → 投票 → 下一晚或终局。
- 程序控制阶段、合法行动、结算和公告；模型负责 NPC 发言与决策，使用配置的模型服务并产生相应费用。
- 中央展示完整公开记录，侧栏展示身份与私密记录。支持节点回退、存档恢复、终局复盘。

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
