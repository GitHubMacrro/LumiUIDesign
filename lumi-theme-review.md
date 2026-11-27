# V5.4 Lumi 主题同族修订

日期：2026-11-27。缓存标记 `54.12`，继续使用当前 V5.4 目录；FEAT-001 业务输入版本保持20。用户同意恢复所附54.9蓝灰／石墨／暖金方向，并同族延展深浅、蓝色与绿色，保留现有主题。**方向授权不等于本稿视觉获批。**

## 配色与入口

截图原配色没有被删掉，但54.10自适应算法以内联变量覆盖它，54.11“经典原色”沿用新的石墨／瓷白，不能还原截图。现在将截图的角色关系明确登记为默认可选的 **雾蓝暖光**，另提供 **澄蓝微光、青岚微光**。三套均支持深浅模式；同族切换保留用户已选明暗。入口为“账户菜单 → 外观 → Lumi主题”；窄屏为“更多导航 → 设置 → 设置栏目 → 外观”。

三套主要改变环境背景，内容面板、浮层、输入和消息维持中性。环境文字与面板文字使用不同角色，暖金品牌与交互强调、成功／警告／错误状态分开。主页内容面恢复为独立角色，避免通用面板令牌冲淡层次。浅色使用偏暖内容面与冷灰环境，顶部继续透出背景。

经典原色及此前六套命名主题收在“其他主题 · 7套保留配色”，其算法输出保持；自定义图片仍优先走原图片分析路径。离开Lumi主题时清除专用变量，避免品牌、背景光强或主页表面残留。所有设置仍是本页模拟，没有真实权限执行。

实现集中在 [主题定义](src/theme-presets.js)、[Lumi语义颜色](src/lumi-palette.js)、[主题样式](src/theme-collection.css)。修改前 [54.11快照](review/snapshots/54.11-before-lumi-themes/) 保留源码、产物与入口。本轮仅局部修改主题、默认外观和选择入口；Composer、ChatThread、Home、Projects、Workbench、Notifications及原有模拟状态模块未改。

## 实际页面自审

先核对 [54.9主页](review/three-refs-home.jpg)，再以相同主页结构、示例内容与1440×900视口对照；日期和问候时间随本机时刻变化，不作像素差异断言。

![三套主题深浅对照](review/lumi-themes/lumi-family-overview.jpg)

检查覆盖三套主题的深浅主页、深浅外观设置、绿色聊天／两态输入／推理浮层／回复胶囊／工作台／通知、浅色项目、320×820主页／聊天／展开输入／深浅外观、旧主题切换及本地合成壁纸。最终新预览停留雾蓝暖光深色主页，恢复正常1280×720视口，控制台error记录为空，见 [最终浏览器状态](review/lumi-themes/browser-final.json)。原有预览页未刷新或改写其页面状态。

- [最终主页](review/lumi-themes/lumi-dark-home-final-1440.jpg)、[深色外观](review/lumi-themes/lumi-dark-appearance-final.jpg)、[浅色外观](review/lumi-themes/lumi-light-appearance-final.jpg)。
- [聊天](review/lumi-themes/lumi-green-dark-chat.jpg)、[展开输入](review/lumi-themes/lumi-green-dark-composer.jpg)、[回复与模糊](review/lumi-themes/lumi-green-dark-reply.jpg)、[工作台](review/lumi-themes/lumi-green-dark-workbench.jpg)、[通知](review/lumi-themes/lumi-green-dark-notifications.jpg)、[浅色项目](review/lumi-themes/lumi-light-projects.jpg)。
- [窄屏主页](review/lumi-themes/lumi-dark-mobile-home.jpg)、[窄屏聊天](review/lumi-themes/lumi-dark-mobile-chat.jpg)、[窄屏展开](review/lumi-themes/lumi-dark-mobile-composer.jpg)、[窄屏主题卡](review/lumi-themes/lumi-dark-mobile-appearance-final.jpg)、[窄屏明暗](review/lumi-themes/lumi-light-mobile-appearance-final.jpg)、[测量](review/lumi-themes/mobile-check.json)。页面横向宽度320px，主题卡在20–300px内。
- [旧主题切换](review/lumi-themes/legacy-switch.json)确认Lumi专用变量清除；[合成图片实查](review/lumi-themes/wallpaper-priority.json)确认图片配色优先、无动态背景与残留角色。图片来自已有本地测试素材，不读取个人图片或上传服务。

本轮发现并修正：暖金Logo被更高specificity规则覆盖；背景叠光过亮导致文字趋白；Lumi家族切换强制重置深浅；明暗缩略图仍带旧紫灰／自动适配旧蓝绿色；窄屏主题说明把“暖金”拆行。截图出现设置退出遮罩时不纳入主题对照，等待退出后已重拍。

独立静态审查认为三组深浅属于同族，建议保留当前主页、两态输入、回复与隐藏滚动条。还指出两个既有信息表达问题：工作台“待批准”与执行记录的主次可以更明确，通知待批准项可增加显式“查看批准”动作。这两项未在主题轮次重定义或更改流程，保留为后续局部审查建议；当前任务状态本身保留多维区分。

## 连续截图与动效

新三套深色主题各采集约40秒，共 **667张有效截图、11张完整联系表**，逐张通过联系表查看，并放大亮暗极值。主审查看雾蓝216帧，独立审查查看澄蓝231帧与青岚220帧。采样所见未发现白闪、露底、明显色跳或正文／输入位置变化；矩阵持续变化，内容矩形各只有一个值。

| 场景 | 有效帧 | 时长 | 间隔中位／最大 | 联系表 |
|---|---:|---:|---:|---|
| 雾蓝暖光·深色 | 216 | 40.052s | 175／322ms | [1](review/lumi-themes/lumi-dark-motion-sheet-01.jpg) · [2](review/lumi-themes/lumi-dark-motion-sheet-02.jpg) · [3](review/lumi-themes/lumi-dark-motion-sheet-03.jpg) |
| 澄蓝微光·深色 | 231 | 40.018s | 160.5／299ms | [1](review/lumi-themes/lumi-blue-dark-motion-sheet-01.jpg) · [2](review/lumi-themes/lumi-blue-dark-motion-sheet-02.jpg) · [3](review/lumi-themes/lumi-blue-dark-motion-sheet-03.jpg) · [4](review/lumi-themes/lumi-blue-dark-motion-sheet-04.jpg) |
| 青岚微光·深色·补采 | 220 | 40.043s | 167／323ms | [1](review/lumi-themes/lumi-green-dark-motion-verified-sheet-01.jpg) · [2](review/lumi-themes/lumi-green-dark-motion-verified-sheet-02.jpg) · [3](review/lumi-themes/lumi-green-dark-motion-verified-sheet-03.jpg) · [4](review/lumi-themes/lumi-green-dark-motion-verified-sheet-04.jpg) |

一组原拟绿色采样的209帧实际仍记录为蓝色，已从绿色与有效总数中排除，原始文件保留；确认选中绿色后重采。结果与排除说明见 [统计](review/lumi-themes/motion-analysis.json)，不以文件名代替真实状态。逐帧JSON记录截图调用起始时间、耗时、实际主题、矩阵与内容矩形；DOM读数在截图前读取，不视为同一渲染帧同步测量。

这是约5–6张/秒的连续实时截图采样，**不是60fps渲染帧录像**。覆盖两层32／38秒各一个周期，未覆盖608秒的组合重复周期；没有10%慢放，也没有为浅色另录完整周期。不能据此证明全部设备／浏览器无掉帧。

背景开关暂停后两层均paused，开启后running；总动效关闭后animation-name为none。系统原本 `prefers-reduced-motion:reduce` 为true，临时模拟正常动效完成后已清除媒体模拟并恢复静态偏好，见 [开关记录](review/lumi-themes/motion-controls.json)。没有修改系统设置。背景光强有意收敛，避免干扰长时间阅读。

## 技术与完整性检查

在本原型目录使用已安装esbuild二进制构建成功，不执行根npm或安装依赖。[检查脚本](review/lumi-themes/check-themes.mjs)及[结果](review/lumi-themes/theme-checks.json)覆盖80组主题／明暗／背景、10,136个声明角色对比，最低4.8:1；Lumi背景计算包含渐变alpha区间、家族天气层和摘要半透明表面，**不是每个实际DOM文字的完整可访问性审计**。

另核对32组既有外观、56组旧预设完整输出保持、80组图片优先、36组同族切换保留明暗，未知主题回退通过。原V5／V5.2／V5.3共699文件哈希核对，以及源码范围、图片上限和文档链接检查见 [完整性记录](review/lumi-themes/integrity.json)。单张位图均先检查大小再读取，控制在900,000字节内。

使用ui-design、theme-factory、better-colors、better-ui及独立审查工作流。本轮Ardot只读`fetch_file_info`成功，没有同步本轮视觉；当前交互依据本地HTML原型。没有真实模型、账号、天气、邮件或GitHub数据，没有外部发送、权限执行、提交或发布。技术检查与独立审查不代表用户视觉认可、正式产品实现或全量功能验收。
