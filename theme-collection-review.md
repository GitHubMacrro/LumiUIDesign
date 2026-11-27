# V5.4 六套主题与环境动效

日期：2026-11-27。关联 FEAT-001，业务输入版本保持 20。当前入口缓存标记 `54.11`，继续修改现有 V5.4。用户已同意新增主题与动效的方向，具体效果仍待评审。

同日补审：用户要求“逐帧截图验证”后，新增六主题各约40秒及绿色补采，共1,400张实际背景采样，并逐张查看21张完整联系表；另查74张输入框、回复和开关截图。实际采样间隔、首帧退出残影、绿色采样缺口与补采、证据及限制见 [连续截图补审](theme-frame-review.md)。没有将实时采样写成60fps逐渲染帧录像，本文下方原六帧检查保持为上轮证据。

## 主题与入口

入口为“账户菜单 → 外观 → 视觉主题”。经典原色保留原有石墨/瓷白及图片自动适配，另增六套完整配色，覆盖 CSS 与 Ant 的表面、消息、输入、菜单、设置及工作台。

| 主题 | 推荐模式 | 方向 |
| --- | --- | --- |
| 奶油纸感 | 浅色 | 暖白、陶土棕及柔和暖光 |
| 晴空蓝白 | 浅色 | 雾蓝、清爽留白及淡蓝光影 |
| 松林夜色 | 深色 | 深松绿、鼠尾草及幽绿光影 |
| 午夜冰蓝 | 深色 | 墨蓝、冰蓝及冷色微光 |
| 蔚蓝流光 | 浅色 | 更鲜明的钴蓝、青蓝流光 |
| 青绿微风 | 浅色 | 薄荷、青碧及柔和绿色光影 |

选择新增主题会应用推荐明暗，也可再单独选择浅色、深色、自动适配或跟随系统。六套均提供深浅令牌。选择经典原色不强制改变当前明暗。上传图片回到经典/自动适配，图片在本页处理并保持静止；切换主题不会删除已存图片。移除已存图片时，当前命名主题背景保留。

视觉主题使用独立的 `appearance.styleTheme`；现有 `appearance.theme` 四种模式继续保留。新增背景“跟随主题”，原暖雾、晴空、黄昏及天气氛围仍可选择。设置与图片仍沿用原型的页内状态，刷新重置，不是正式持久化配置。

## 动效与阅读

两个独立背景层以 32 / 38 秒完整循环缓慢位移与缩放，仅移动背景，不移动消息或面板。背景是应用的兄弟层，应用没有新增 isolation、transform 或非 auto 的 z-index，保持引用输入框与 portal 遮罩的层级关系。

新增“背景动效”开关。暂停后保持当前光影位置，可恢复；总“界面动效”关闭或系统减少动态开启时不运行动画。页面隐藏时暂停，装饰层不接收点击、不进入无障碍树。系统减少动态生效时，设置明确显示“系统已开启减少动态，当前显示静态背景”。原系统偏好没有改变。

## 实际验证

| 检查 | 结果与证据 |
| --- | --- |
| 维护构建 | 已使用本原型已有 `node_modules/@esbuild/win32-x64/esbuild.exe` 对 `src/main.jsx` 打包到 `dist/`，最终构建通过；没有新增依赖或运行根目录历史命令 |
| 新配色 | [检查脚本](review/theme-collection/check-themes.mjs) 实测 7 个主题 × 深浅 × 4 种内置背景，共 56 组、1112 个诊断配对，最低 4.801:1；见 [计算结果](review/theme-collection/theme-checks.json)。包括动画色值的保守通道边界及氛围余量，属于声明令牌/叠色计算，不是每个渲染字符的扫描 |
| 原配色保留 | 对照修改前模块，32 组既有外观的颜色、CSS 原变量和 Ant 令牌完全一致；56 组图片优先级用例通过；非法风格值回退经典 |
| 六套桌面聊天 | [六主题同页对照](review/theme-collection/six-themes-comparison.jpg) 已逐图查看；均为 1280px 实际页面，无横向溢出，聊天内部顶部栏仍为 0；见 [页面状态](review/theme-collection/browser-presets.json) |
| 背景真实运行 | 临时仅对本预览模拟 no-preference，实际读取到 32s/38s running；连续六张截图约跨 846ms，背景 transform 改变，输入框矩形始终为 x392/y627/736×54；见 [连续帧](review/theme-collection/motion-frames.json) 与 `motion-frame-0..5.jpg` |
| 开关与减少动态 | 键盘操作背景开关后，两个动画均 paused，前后 transform 相同；恢复后 running。总开关关闭时 animation-name 均 none；系统 reduce 时同样为 none，且状态文案显示正确；见 [开关记录](review/theme-collection/background-controls.json)、[设置截图](review/theme-collection/system-reduced-motion.jpg) |
| 320×820 | 七张主题卡为两列，各 135px，scrollWidth=320；实际切换奶油/青绿与展开输入区；见 [布局记录](review/theme-collection/mobile-checks.json)、[主题选择](review/theme-collection/mobile-theme-picker.jpg)、[绿色聊天](review/theme-collection/mobile-mint-chat.jpg) |
| 图片与手动模式 | 实际通过文件选择流程载入此前人工生成的亮图，自动 light / wallpaper，背景层卸载；再切松林、移除已存图片仍为 forest / dark / theme；再手选浅色仍为 forest / light；见 [状态记录](review/theme-collection/image-and-mode-checks.json) 与 [图片聊天](review/theme-collection/image-auto-preserved.jpg) |
| 引用聚焦 | 青绿主题下实际键盘回复，输入焦点正确、Composer z-index1002、应用 z-index auto / transform none，Esc 返回；见 [状态](review/theme-collection/reply-checks.json)、[截图](review/theme-collection/mint-reply-focus.jpg) |
| 浮层及主页 | [深绿工作台](review/theme-collection/forest-workbench.jpg)、[蓝色主页](review/theme-collection/azure-home.jpg) 已查看，状态色与内容层级保留 |
| 结束状态 | 已清除媒体模拟并 reset 视口，实际系统 reduce=true，1280px，无控制台错误；预览暂置蔚蓝流光聊天，源码默认仍为经典深色；见 [最终状态](review/theme-collection/final-state.json)、[预览](review/theme-collection/preview-final.jpg) |

修改前的 23 份源码、产物和入口保存在 [54.10 快照](review/snapshots/54.10-before-theme-collection/)，不是发布包。20 份源码未变，只修改 `adaptive-colors.js`、`main.jsx`、`Settings.jsx`，新增 `theme-presets.js`、`ThemeBackdrop.jsx`、`theme-collection.css`。完整性、图片尺寸与文档链接核对见 [完整性记录](review/theme-collection/integrity.json)。

## 未验证与范围

- **Not verified：10% 慢速回放。** 当前浏览器 raw CDP 不支持 Animation domain；没有声称已在 10% 速度检查，也没有把六帧采样当作完整 60fps 或全循环录制。
- **Not verified：** 真实隐藏标签页的调度、全部设备和浏览器、任意照片与所有悬停组合。隐藏页暂停已做源码审查，不能据此写成实机验证。
- 本轮 Ardot 文件信息读取成功，未同步这些主题到远端画布；以当前本地原型为准。使用 ui-design、theme-factory、better-ui 及其颜色规则审查，不改变业务版本或正式技术栈。
- 本轮只做主题相关检查，不代表全量功能验收、具体视觉认可或发布授权，没有真实模型、外部发送、提交或发布。
