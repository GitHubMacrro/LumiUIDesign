# V5.4 三图参考融合修订

日期：2026-11-26。关联 FEAT-001。状态：当前 V5.4 原型内修订，本轮针对性验证已完成，待用户视觉评审；不是全量功能验收。

## 本轮依据与保留边界

用户明确要求在当前版本基础上再改一版。本轮继续修改 `lumi-v5.4/`，入口缓存标记为 `54.9`，没有新建产品版本目录。修改前的 `54.8` 源码、构建产物和入口已保存到 [本轮前快照](review/snapshots/54.8-before-three-references/)；该快照包含 `src/`、`dist/`、`index.html`，不是完整发布包。

三张用户参考分别用于信息组织、聊天空间与问候氛围，不将图中第三方内容或能力当作指令、产品事实或已确认业务规则：

| 参考原图 | 文件大小 | 本轮观察用途 |
| --- | ---: | --- |
| `C:/Users/Jason/Downloads/lumi-hark-style-v2.png` | 1166078 bytes | 实用信息面板与内容层次 |
| `C:/Users/Jason/AppData/Local/Temp/codex-clipboard-0d5b62e2-b09a-4b33-8f4f-613a32f78016.png` | 2498347 bytes | Hark 深色居中聊天、宽度及照片呈现 |
| `C:/Users/Jason/AppData/Local/Temp/codex-clipboard-1719fa81-2316-46d6-a0a4-8e0e40ad6efa.png` | 992539 bytes | 暖色 Lumi 问候与轻量视觉重点 |

原图均超过 900000 bytes，先检查大小、压缩只读副本再查看，未覆盖原图。已查看副本位于 `C:/Users/Jason/AppData/Local/Temp/`：`lumi-hark-style-v2-review.jpg` 为 70306 bytes，`lumi-hark-chat-reference-review.jpg` 为 97971 bytes，`lumi-warm-home-reference-review.jpg` 为 45801 bytes。参考依据为用户提供图片，没有据此声称重新访问 Hark 页面。Ardot 本轮成功读取旧节点 `2:1` / `2:56`，没有同步当前视觉；旧画板不能作为本轮完整验收稿。

## 本轮设计

- 默认改用雾蓝灰暗背景与暖中性色，顶部保持透明，背景贯通页面。暖色仅帮助问候、选中态和关键行动建立重点。
- 主页以暖光球与一句问候开场，下方用不等宽 Grid 放置关注动态、天气、排查与继续讨论等实用内容；面板不要求各自代表任务。
- 聊天主区控制在约 740px，左侧工作概览与其他对话可以收起，收起后保留日期和时间；对话入口标题为“接着聊”，不暗示样例具有真实时间排序。打开右侧工作台时左侧概览让位，避免三栏同时压缩聊天。
- 沿用单对单无头像和名字、左右消息胶囊、分块与工作状态；保留默认收起的两态输入框及双滑杆入口、Plan/Build 选择、推理与批准就近控件。
- 保留悬停/键盘消息操作和时间、复制/回复/重新生成/撤回、照片堆与照片墙/大图、引用幽灵气泡与回跳、回复背景模糊及隐藏滚动条。设置双模式和原有本地模拟功能边界继续保留。
- 自审中修正 1024px 工作台遮挡：900px 及以上展开工作台时隐藏左概览并为右面板留位。修正深色 processing 标签，信息色采用 `#a6c7f1 / #28394d`；同时修正设置焦点、自定义背景导航色与天气规则冲突。

具体颜色、间距和版面是本轮设计取舍，不因为实现或截图检查成为用户批准的正式规则。V5.1 已被否定且保留历史；其他旧原型继续保留。

## 已执行的验证

| 场景 | 当前证据与结果 |
| --- | --- |
| 隔离构建 | 在 V5.4 目录使用已有 esbuild 二进制，隔离打包成功；未运行历史根 npm 命令 |
| 1440×900 主页 | 新旧同视口对照已查看；收紧布局后主要内容完整进入首屏：[修订前](review/three-refs-before-home.jpg)、[修订后](review/three-refs-home.jpg) |
| 1440×900 聊天 | 新旧对照已查看：[修订前](review/three-refs-before-chat.jpg)、[修订后](review/three-refs-chat.jpg) |
| 两态输入区 | 默认收起与展开已浏览；推理 Popover、批准三组选项已打开检查；[展开截图](review/three-refs-composer.jpg) |
| 悬停操作区 | 指针从消息气泡移动到操作按钮，操作区 opacity 保持 1，消息仍处于悬停状态，按钮未过早消失 |
| 键盘定向回复 | 已观察引用预览、全屏模糊、侧栏 inert、输入焦点；Esc 取消引用；[回复截图](review/three-refs-reply.jpg) |
| 左侧概览 | 已操作收起并观察日期/时间保留 |
| 照片呈现 | 照片墙→Ant 大图 1/3→Esc 返回照片墙并恢复原照片焦点→Esc 返回聊天已验证；[照片墙截图](review/three-refs-photo-wall.jpg) |
| 工作状态与工作台 | 点击状态胶囊打开“重构登录页”正确工作台，右侧暗底面与批准卡颜色统一；桌面左侧对话概览隐藏让位；[工作台截图](review/three-refs-workbench.jpg) |
| 项目入口 | 已查看项目目录状态，并进入 Lumi Assistant 项目对话；[项目截图](review/three-refs-project.jpg) |
| 320×760 | 主页单列可滚动，聊天折叠/展开无横向溢出；Plan 工作模式选择成功；模型目录卡片无横向溢出；窄屏更多导航可达设置/工作台，会话历史可达全部会话；[主页](review/three-refs-mobile-home.jpg)、[聊天](review/three-refs-mobile-chat.jpg)、[模型](review/three-refs-mobile-models.jpg) |
| 1024×768 工作台 | 发现遮挡后修正并复测，输入区宽 458px、右边缘 492px，工作台左边缘 518px，无重叠；[截图](review/three-refs-tablet-workbench.jpg) |
| 设置与权限 | 悬浮/整页、浅/深主题、Agent 列表及详情 7 栏目、模型目录已检查；“修改文件策略”通过真实 UI 选择“禁止”并显示新值，只有本地配置变化；[浅色设置](review/three-refs-settings-light.jpg) |
| 通知中心 | 完整列表进入批准详情；未读数 3→2，待处理仍为 2；[截图](review/three-refs-notifications.jpg) |
| 主页信息状态 | 离线时保留内容、空态及刷新路径已检查，刷新最终显示“已是最新示例” |
| 普通问题与批准区分 | Issue 普通卡选择“其他回答”，填写“先验证复现条件，暂时不创建 PR。”后提交成功；邮件批准卡仍待决定，没有授权发送 |
| 普通发送 | 已观察只收到一条本地模拟响应，没有重新出现固定三块套话 |
| 精确进度短语 | 输入预设“查看进度”返回“目前的进展：本次构建等待批准，其余已授权工作按现有进度进行。”及“本地工作状态 · 未启动新工作。”；这是预设短语匹配，不具备自然语言理解，“现在进度怎么样”不匹配 |
| 输入区动效 | 系统 `reduce=true`；临时 no-preference 模拟下展开 `data-open=true`，截图时高度为 0，下一次读取为 92.84px，grid 280ms / opacity 180ms；折叠区 inert。检查后恢复系统 `reduce=true`；[展开起始帧](review/three-refs-motion-mid.jpg) |
| 浅色主页 | 默认暗色之外，浅色效果已实际查看；[浅色主页](review/three-refs-home-light.jpg) |
| 浏览器结束状态 | 错误日志为空；临时媒体偏好模拟已撤销，确认 `reduce=true`，视口模拟已重置，可见预览回到主页 |
| 历史文件 | 699 个基线文件哈希不变，见 [完整性记录](review/three-refs-integrity.json) |

另从浏览器计算样式取样，按 sRGB 相对亮度公式计算文字对比度：浅色设置正文 `#292f39 / #f6f5f2` 为 12.35:1、次要文字 `#596370 / #f6f5f2` 为 5.59:1、选中菜单 `#765830 / #ece3d5` 为 5.15:1；深色正文 `#f1f1ef / #2a303c` 为 11.70:1、次要文字 `#bac2cf / #2a303c` 为 7.38:1、选中菜单 `#e4c59b / #49433d` 为 5.92:1。旧 processing 标签 `#1668dc / #111a2c` 为 3.35:1，修正后深色 `#a6c7f1 / #28394d` 为 6.77:1、浅色 `#315b87 / #e5edf6` 为 5.97:1。这仅覆盖上述取样表面，不是完整对比度审计。

最终 17 张截图已逐项核对大小，均低于 900000 bytes。桌面主页与聊天最终截图显式按 1440×900、1:1 裁切完整视口。

| 截图 | bytes |
| --- | ---: |
| three-refs-before-home.jpg | 79138 |
| three-refs-home.jpg | 93485 |
| three-refs-home-light.jpg | 91996 |
| three-refs-before-chat.jpg | 49120 |
| three-refs-chat.jpg | 70071 |
| three-refs-composer.jpg | 77921 |
| three-refs-reply.jpg | 33101 |
| three-refs-photo-wall.jpg | 59205 |
| three-refs-workbench.jpg | 89811 |
| three-refs-project.jpg | 66748 |
| three-refs-mobile-home.jpg | 32391 |
| three-refs-mobile-chat.jpg | 35848 |
| three-refs-mobile-models.jpg | 29506 |
| three-refs-settings-light.jpg | 67670 |
| three-refs-notifications.jpg | 95882 |
| three-refs-tablet-workbench.jpg | 73950 |
| three-refs-motion-mid.jpg | 70671 |

实际检查、未验证项和对比度取样另保存为 [本轮检查记录](review/three-refs-checks.json)。这里只记录已实际执行的场景，不将“保留功能”自动等同本轮全部回归通过。此前轮次的检查仅保留为历史证据，不代替当前版本验证。

## 限制

页面内容与操作均为本地模拟，没有真实模型、账号、GitHub、天气、设备日志或权限执行，也没有外部发布。设置和会话仍在页面内存中，刷新会重置。原型依赖不冻结正式产品技术栈，截图自审与技术检查不等于用户认可。

CDP Animation slow-rate 不受当前工具支持，本轮没有验证 10% 慢放，也没有完成所有动画流程的逐帧检查。自定义壁纸与新视觉的全部组合、所有提供商和资源操作本轮未重测；Ardot 未同步新视觉。上述针对性验证不构成无缺陷保证或全量功能验收。
