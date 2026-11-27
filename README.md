# Lumi V5.4 · Ant Design 本地设计稿

日期：2026-11-27  
状态：当前同目录修订为 `54.15`，主页居中与密度修正已实施，待用户视觉与交互评审；实际检查、保护核对与未验证项见 [本轮自审](home-center-review.md)。

用户否定54.14“不对称、更乱、不简洁”后，本轮取消侧栏、底部三栏和大时钟，以最大720px单一居中主轴组织问候、原输入、两条快捷入口及四条紧凑摘要。日期天气收成上方小行；待决定直达通知，当前工作展开原任务／方案／项目入口，GitHub沿用详情Modal，排查展开原证据。工作摘要收短，全名及状态保留在展开内容。最新反馈见 [FEAT-001反馈](../../features/FEAT-001-assistant-tasks/feedback.md)。

54.15实查1440×960前后（输入中心x556→x720）、320×900默认及多行／notes附件、900×600自然滚动、1440px工作台并列、天气Popover、工作Enter展开、方案入口、GitHub Modal及Escape返回焦点。默认Lumi深浅画面已看；其他主题／图片壁纸未在本轮逐项视觉复测。维护构建通过，仅Home.jsx和home-focus.css为本轮源码修改，具体最终保护核对见自审。本轮用户明确授权后浏览器访问正常，旧来源审批限制已解除。

54.14构图及[当时自审](home-light-review.md)作为被否定的历史保留；其功能和响应式检查没有审好整页重心，不代表用户认可。原Ant组件、主题、输入及共享模拟业务继续保护，没有另建V5.5／V6或复制外部参考代码。

此前54.13输入与消息修订继续保护：两态、整体右下语音／发送、紧凑模型Select、分别表达的推理Slider、消息时间直显／日期提示、14px图标及净10px让位。其70项静态检查、触屏模拟及图片优先修复属于 [前轮自审](input-home-review.md)，不自动记为54.15全部复测。

此前54.12恢复蓝灰／石墨／暖金，并提供雾蓝暖光、澄蓝微光、青岚微光同族深浅主题；经典及原六套命名主题、同族明暗保留和图片自适应优先继续保护。该轮667张有效连续截图及其他检查保留在 [54.12历史自审](lumi-theme-review.md)。此前54.11共1,400张背景采样、74张交互截图见 [历史连续截图补审](theme-frame-review.md)，均不代替54.13当前验证。

## 入口与版本关系

最新修订：[54.15主页居中修正](home-center-review.md)。修改前 [54.14局部快照](review/snapshots/54.14-before-center/SNAPSHOT.json)共34文件、2,140,116字节，仅含src／dist／index，不是完整依赖包；[54.12完整备份](../../exchange/outgoing/lumi-v5.4-54.12-backup-20261127/README.md)保持不动。继续同一V5.4目录，V6仅只读参考，不更换代码基础。

此前修订：[54.14主页简化](home-light-review.md)构图已被用户否定，保留当时记录及[54.13局部快照](review/snapshots/54.13-before-home-light/SNAPSHOT.json)，不把该轮技术检查当作视觉通过。

此前修订：[54.13输入、消息操作与主页](input-home-review.md)，其中光球构图已由最新去球决定更新，输入及消息保护边界仍适用。

此前54.12：[Lumi同族主题](lumi-theme-review.md)。主页环境、独立内容面、浮层、环境文字、品牌暖金、交互强调和状态分别映射；默认雾蓝暖光深色。修改前 `54.11` 已留 [源码／产物／入口快照](review/snapshots/54.11-before-lumi-themes/)。

此前修订：[六套主题与环境动效](theme-collection-review.md)。奶油纸感、晴空蓝白、松林夜色、午夜冰蓝、蔚蓝流光、青绿微风和经典原色现收在“其他主题”。背景光影32/38秒循环，支持独立暂停并遵循总动效与系统减少动态。修改前 `54.10` 已留 [源码/产物/入口快照](review/snapshots/54.10-before-theme-collection/)。

此前修订：[自适应配色与聊天贯通](adaptive-color-review.md)。CSS/Ant 深浅主题与图片协调色统一；选择图片后自动分析明暗和主色，也可手动固定深浅。删除聊天内部顶部栏，历史及新建迁至全局导航。该轮缓存标记 `54.10`；修改前 `54.9` 已留 [源码/产物/入口快照](review/snapshots/54.9-before-adaptive-colors/)。以下三图阶段的颜色描述保留为历史过程。

此前修订：[三图参考融合](three-reference-review.md)。用户明确要求就在当前版本基础上再改一版，因此继续使用 `lumi-v5.4/`，该轮入口缓存标记为 `54.9`。当时默认雾蓝灰暗背景搭配暖中性色与透明顶部；主页用暖光球问候和不等宽实用信息面板；聊天约 740px，左工作概览/其他对话可收起，右工作台打开时让位。既有输入、消息、照片、引用、隐藏滚动条和本地模拟边界保留。该轮针对性验证已完成，不代表当前全量功能验收。

修改前 `54.8` 的 `src/`、`dist/`、`index.html` 已保存在 [本轮前快照](review/snapshots/54.8-before-three-references/)，不是完整发布包。三张原图均先检查大小、压缩副本后查看，来源和观察依据集中记录在上述修订说明。

此前修订：[壁纸可读性与消息间距](wallpaper-spacing-review.md)，修正壁纸洗色覆盖、面板底面及机械三块回复；其局部复测为该轮历史证据。

此前修订：[分块消息与项目工作状态](blocks-status-review.md)。按用户明确要求去掉单对单聊天作者头像与名字，以左右圆润气泡区分，逐块保留复制、回复、时间、普通助手重新生成与用户撤回。队列归属、回看新消息提示、撤回取消及项目状态机制继续保留；生成中的小胶囊不代表工作完成。该记录中的固定三块及对应数量断言是历史实现，阶段消息样例仍保留。

此前三图轮次 Ardot 成功读取旧简化画板 `2:1` / `2:56`，没有同步三图融合后的视觉。本轮配色修订读取文件信息成功，未同步自适应视觉。当前交互依据本地原型。正式状态枚举及分块调度时机尚未确定，不改变正式业务规则，没有真实模型调用或对外动作。

此前修订：[既有细节恢复](detail-restoration-review.md)。用户指出双滑杆入口、悬停动作/时间、照片/引用效果和隐藏滚动条丢失，这属于组件替换回归。该轮恢复原 V5 双滑杆入口与默认两态输入；消息动作和时间悬停或键盘聚焦时显示、触屏常显，普通助手可重新生成、用户可撤回；恢复错位照片堆、照片墙与 Ant 大图预览、引用幽灵气泡与回跳、沉浸回复模糊；隐藏滚动条但保留滚动，保留连续背景与 Ant。桌面、320px 截图和交互的实际验证以该记录为准，没有真实模型调用或对外动作，仍待用户认可。

设计守则：组件替换不能自行删减这些既有细节。原 V5 的沉浸回复模糊在 V5.2/V5.3 被样式覆盖隐藏，本轮按当前反馈恢复 V5 效果，并非 V5.3 原先已生效。此前全页自审未发现或保护上述细节；[Ardot 上轮简化画板](https://ardot.tencent.com/file/751484136655673) 不包含本轮恢复内容，不作为当前完整验收稿。

此前修订：[连续背景与输入框](surface-review.md)。修复双焦点、贯通顶部背景，并优化展开工具分组；相关 Ardot 画板为该轮探索记录。

本地预览：[http://127.0.0.1:53152/lumi-v5.4/](http://127.0.0.1:53152/lumi-v5.4/)。该地址依赖本机现有静态预览服务持续运行，服务根目录为 `UI-design/prew/`。

V5.4 延续 V5.3 的主页、对话、项目与按需工作台关系，按照用户本轮明确要求引入真实 Ant Design 组件，重新整理视觉层次、组件职责和交互反馈。此前“不安装组件库”的约束属于 V5.3 历史阶段，本轮授权只覆盖这份独立设计原型。

V5、V5.2、V5.3 留作历史对照。V5.1 已被用户否定，继续保留历史文件，不是本稿设计或代码基础。技术检查与自审不等于用户认可设计。

## 独立依赖与文件

本目录使用实际安装的 **Ant Design 6.7.2、React / React DOM 19.3.1、@ant-design/icons 6.3.4、esbuild 0.28.2**。版本见 [package.json](package.json) 与 [package-lock.json](package-lock.json)。组件从 `antd` 导入，经本地打包后加载，不依赖在线 CDN。

这些依赖只用于 `UI-design/prew/lumi-v5.4/` 的设计验证，不是 Lumi 产品前端框架、宿主运行时或正式依赖版本的技术决定。工作区根目录没有因此建立应用构建；不在根目录执行历史 npm 命令。

| 文件 | 职责 |
| --- | --- |
| [index.html](index.html) | 静态预览入口，加载 `dist/app.js` 与 `dist/app.css` |
| [src/main.jsx](src/main.jsx) | 应用外壳、导航、主题、搜索、设置展示方式和会话状态 |
| [src/Home.jsx](src/Home.jsx) | 单一居中主轴、原输入插槽、日期天气小行、紧凑摘要与按需详情 |
| [src/ChatThread.jsx](src/ChatThread.jsx) | 消息、引用、附件、图片预览、可操作回答卡片 |
| [src/Composer.jsx](src/Composer.jsx) | 默认收起的两态输入框、模型/Agent/模式选择、推理与批准偏好 |
| [src/composer-polish.css](src/composer-polish.css)、[src/message-actions.css](src/message-actions.css) | 54.13输入定位／模型宽度与消息操作行的保护样式 |
| [src/home-focus.css](src/home-focus.css) | 54.15主页居中共边、紧凑摘要及容器响应式 |
| [src/Projects.jsx](src/Projects.jsx) | 项目目录、项目上下文与专项聊天 |
| [src/Workbench.jsx](src/Workbench.jsx) | 任务、方案、运行、浏览器、设备、成果、定时工作及共享模拟状态 |
| [src/Notifications.jsx](src/Notifications.jsx) | 完整通知列表、详情、未读与待处理、批准和通知重试 |
| [src/Settings.jsx](src/Settings.jsx) | 设置栏目、对象目录与详情、模型来源、资源分配、权限和运行配置 |
| [src/adaptive-colors.js](src/adaptive-colors.js) | 图片分析、主题决策与 CSS/Ant 同源语义颜色 |
| [src/lumi-palette.js](src/lumi-palette.js) | Lumi同族环境／内容角色、背景边界与CSS/Ant颜色 |
| [src/adaptive-theme.css](src/adaptive-theme.css)、[src/adaptive-layout.css](src/adaptive-layout.css) | 组件颜色映射、聊天贯通及主题选项适配 |
| [src/theme-presets.js](src/theme-presets.js)、[src/ThemeBackdrop.jsx](src/ThemeBackdrop.jsx)、[src/theme-collection.css](src/theme-collection.css) | 六套独立主题、背景层、动态暂停及选择卡 |
| [src/data.js](src/data.js) | 虚构会话及项目样例 |
| [build.mjs](build.mjs) | 与本目录打包参数对应的维护脚本 |

## 页面与组件职责

以 Ant 原生组件承担输入、选择、反馈和浮层行为，页面构图、面板内容、视觉令牌和模拟状态仍由原型代码组织。

| 页面/交互 | 使用的 Ant 组件 | 布局与职责 |
| --- | --- | --- |
| 主页 | Button、Collapse、Modal、Popover、Tag、Alert、Empty、Dropdown | 问候／原输入／摘要共用居中主轴，日期天气小行；工作与证据按需展开，窄屏保持同一阅读顺序 |
| 聊天 | Card、Radio、Input、Button、Dropdown、Image.PreviewGroup | 无作者头像/名字的左右消息块，逐块保留操作和时间；正文、引用、回答与动作批准分层；“其他回答”保留自由输入 |
| 输入区 | Input.TextArea、Select、Slider、InputNumber、Popover、Radio、Tag | 两态默认收起；Plan/Build用选择器；档位／预算分别以Slider为主，预算精确输入保留独立无效草稿；批准偏好就近选择 |
| 项目 | Card、Form、Input、Button、Tag | 项目目录聚合工作状态，项目聊天就近查看每项工作；项目路径只作为示例标识 |
| 工作台 | Drawer、Tabs、Segmented、Steps、Descriptions、Collapse | 按需展开运行、浏览器、本机和成果；方案认可与开始执行分别操作 |
| 通知中心 | Drawer、Segmented、Badge、Tag、Empty | 完整列表与同面板详情；未读和待处理分别呈现，标读不代替批准或恢复失败 |
| 设置 | Menu、Segmented、Select、Switch、Form、Card、Table、Descriptions | 保留“悬浮 / 整页”；普通偏好用设置行，对象目录用卡片，详情采用栏目加表单 |
| 危险或关键确认 | Popconfirm、Modal、Alert | Modal 留给设置悬浮模式、搜索及有完整范围说明的关键流程，不承包普通参数选值 |

## 功能输入覆盖

本表表示存在相关设计界面或模拟路径，不表示实现、验收或冻结完整业务规格。权威业务输入仍为 [功能总表](../../../docs/product/functional-map.md) 及其引用的需求正文。

| 功能编号 | 本稿对应界面 |
| --- | --- |
| FEAT-001 对话、意图与任务 | 主页、聊天、项目聊天、普通问题与动作批准卡片、方案/执行、撤回范围和成果 |
| FEAT-002 Agent 接入与协作 | Agent 卡片、启用与连接状态、左侧栏目详情、运行时/路径/启动器/原生模型/资源/权限 |
| FEAT-003 模型、来源与用量 | 角色模型、聚合模型目录、提供商和账号引用、模拟拉取/连接检查/逐模型检查、示例用量 |
| FEAT-004 记忆与上下文 | 记忆候选、上下文说明、知识库目录、资料分配范围与状态 |
| FEAT-005 浏览器自动化与接管 | 浏览器设置、工作台预览、接管/交回/重新观察、私密输入遮挡、访问与下载样例 |
| FEAT-006 工具与扩展 | Skills、Plugins、MCP 目录及详情、候选审阅、版本和分配范围 |
| FEAT-007 搜索与信息获取 | 搜索偏好、示例来源说明、成果证据与来源受限提示 |
| FEAT-008 定时工作与主动通知 | 定时提醒/工作、创建与编辑、启停和运行状态、通知列表/详情/重试 |
| FEAT-009 部署、运行与数据 | Core 与设备、登录和配对区分、在线/离线、数据和恢复隔离模拟 |

## 模拟边界

- 页面内容、任务进展、GitHub 动态、天气、崩溃线索、模型目录与用量都是虚构样例。问候语使用本机时间，其他内容不代表实时事实或实际测量。
- 普通发送只追加本页模拟消息及一条简短预设回复；预设的明确进度问法且会话关联已有任务时，返回交付时读取的本地工作状态。阶段样例与队列机制继续保留，生成提示不证明工作完成。切页后队列归属原会话，撤回取消该消息后续块；不调用模型、工具或 Agent。附件菜单加入样例引用，不读取真实附件文件或项目目录。
- 添加/编辑提供商、测试连接、拉取目录、逐模型检查、Agent 连接、知识库同步、插件更新和账号授权只改变页面状态，不发起真实连接、安装、下载、扫描或索引。
- GitHub、Microsoft/Google 邮箱等账号以虚构引用或掩码展示，不读取真实 Cookie、Key、密码或登录态。连接状态不自动授予发送、提交、发布或管理权限。
- 资源保留“共享给全部 Agent / 指定 Agent / 不分配”的分配表达；资源分配与实际动作权限分别管理。可编辑的权限与批准偏好只产生示例配置，不授予本机或外部系统执行权。
- 工作台中的构建、终端命令、停止回执、成果、浏览器接管、私密输入、定时触发和通知投递都是模拟。重试通知不重跑工作；重连不自动重跑未知结果；恢复隔离不会恢复旧任务或旧浏览器控制。
- 设置、会话、附件草稿、任务和通知保存在页面内存中。附件按会话/项目范围保留；刷新页面会重置，不写入正式数据库。模拟备份、恢复、导入和文件撤回不访问用户真实数据。
- 点击“复制消息”会按用户操作请求写入剪贴板；图片预览读取本原型静态资源。“自定义背景”会读取用户主动选择的图片，在浏览器内压缩并暂存为本页背景，不上传。以上是本地界面行为，不接入真实模型、账号、邮件、GitHub、数据库或权限执行。
- 本稿不会提交代码、推送仓库、发送邮件、发布站点或对外传输原型中输入的配置内容。

## 预览与维护构建

**查看效果直接使用现有 `dist/`，不需要再次安装依赖或构建。** `index.html`、`dist/` 和本地资源由现有静态预览服务提供。不要将根目录历史 npm 命令当作本稿入口。

只有修改 `src/` 后需要更新预览产物时，才在本原型目录执行维护构建。当前沙盒中 `node build.mjs` 曾因 esbuild 子进程启动返回 `spawn EPERM`；该限制不是 JSX 语法错误。Windows 可直接调用已安装的 esbuild 二进制：

```powershell
Set-Location -LiteralPath 'C:\CodexProject\dotnet\Project\LumiBot\Lumi\UI-design\prew\lumi-v5.4'
& '.\node_modules\@esbuild\win32-x64\esbuild.exe' 'src/main.jsx' --bundle --outdir=dist --entry-names=app --minify --legal-comments=linked '--define:process.env.NODE_ENV="production"' --target=chrome110
```

以上为本轮实际使用并通过的打包命令。若当前执行环境仍拦截该二进制，应按工具实际权限处理；不要将受阻构建记为通过。构建后刷新预览，检查 `dist/app.js`、`dist/app.css` 及浏览器实际结果。

依赖锁与构建脚本只覆盖本独立原型。维护时保留历史设计目录；截图导出后先检查文件大小，单张位图不超过900,000字节。最新修正与验证见 [home-center-review.md](home-center-review.md)，此前各轮范围由 [review.md](review.md) 索引，历史检查不代替当前版本验证。
