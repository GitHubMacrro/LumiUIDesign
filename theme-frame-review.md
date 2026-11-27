# V5.4 主题连续截图补审

日期：2026-11-27。版本仍为 `54.11`，关联 FEAT-001，业务输入版本不变。本轮回应用户“你有自审过吗？逐帧截图验证”，补足上一轮仅六帧、约 846ms 的动效证据。本轮没有修改原型源码或重新设计，也没有重新打包。

## 结论与证据边界

六套主题各采集约 40 秒，绿色另补采一次，共 **1,400 张实际背景截图、21 张完整联系表**；另有输入框、引用及开关 **74 张截图、7 张联系表**。全部背景采样截图均已通过联系表逐张查看，并对亮暗极值、设置退出和绿色尾段另看全尺寸原图。主审查看深绿、深蓝、奶油及绿色补采的 12 张联系表；独立审查查看蓝色、绿色首轮、雾蓝的 9 张联系表。

采样中未见背景循环白闪、露底、突然出现的颜色接缝或内容位置漂移。消息、输入框与侧栏在放大的亮暗极值帧中保持可读。这个结论限定在下列场景与采样时刻，不代表用户视觉认可或全量功能验收。

**这是连续实时截图采样，不是每个浏览器渲染帧的录像。** 主要组的截图间隔中位数为 171–186ms，约 5 张/秒；不能据此证明 60fps 无掉帧。背景两层分别为 32 / 38 秒，每组时长覆盖两层各至少一个周期；两层组合完整重复周期为 608 秒，本轮没有录完该组合周期。

## 采集范围

同一页、同一份示例消息、1280×720 视口，输入框默认收起。JSON 逐张记录文件名、文件大小、截图调用起始相对时间、调用耗时、背景矩阵、动画状态、正文和输入框矩形。矩阵与矩形在截图调用前读取，二者不视为同一显示帧的同步测量。联系表标签使用截图调用开始时刻，没有补帧或合成中间状态。

| 主题 / 场景 | 截图数 | 采集时长 | 间隔中位数 / 最大值 | 全部联系表 |
| --- | ---: | ---: | ---: | --- |
| 蔚蓝流光 · 浅色 | 193 | 40.031s | 186 / 525ms | [1](review/theme-frame-audit/azure-chat-sheet-01.jpg) · [2](review/theme-frame-audit/azure-chat-sheet-02.jpg) · [3](review/theme-frame-audit/azure-chat-sheet-03.jpg) |
| 青绿微风 · 首轮 | 172 | 41.617s | 185 / 2800ms | [1](review/theme-frame-audit/mint-chat-sheet-01.jpg) · [2](review/theme-frame-audit/mint-chat-sheet-02.jpg) · [3](review/theme-frame-audit/mint-chat-sheet-03.jpg) |
| 松林夜色 · 深色 | 205 | 40.039s | 179.5 / 400ms | [1](review/theme-frame-audit/forest-chat-sheet-01.jpg) · [2](review/theme-frame-audit/forest-chat-sheet-02.jpg) · [3](review/theme-frame-audit/forest-chat-sheet-03.jpg) |
| 午夜冰蓝 · 深色 | 206 | 40.034s | 180 / 303ms | [1](review/theme-frame-audit/midnight-chat-sheet-01.jpg) · [2](review/theme-frame-audit/midnight-chat-sheet-02.jpg) · [3](review/theme-frame-audit/midnight-chat-sheet-03.jpg) |
| 奶油纸感 · 浅色 | 205 | 40.226s | 179 / 379ms | [1](review/theme-frame-audit/cream-chat-sheet-01.jpg) · [2](review/theme-frame-audit/cream-chat-sheet-02.jpg) · [3](review/theme-frame-audit/cream-chat-sheet-03.jpg) |
| 晴空蓝白 · 浅色 | 203 | 40.197s | 180 / 326ms | [1](review/theme-frame-audit/cloud-chat-sheet-01.jpg) · [2](review/theme-frame-audit/cloud-chat-sheet-02.jpg) · [3](review/theme-frame-audit/cloud-chat-sheet-03.jpg) |
| 青绿微风 · 补采 | 216 | 40.154s | 171 / 307ms | [1](review/theme-frame-audit/mint-chat-repeat-sheet-01.jpg) · [2](review/theme-frame-audit/mint-chat-repeat-sheet-02.jpg) · [3](review/theme-frame-audit/mint-chat-repeat-sheet-03.jpg) |

首轮 [统计](review/theme-frame-audit/analysis.json)、绿色补采 [统计](review/theme-frame-audit/repeat-analysis.json)、[汇总断言与清理状态](review/theme-frame-audit/audit-summary.json) 保留实际数据。可先看 [六主题时间对照](review/theme-frame-audit/six-theme-timeline.jpg)，再查上表全部帧。

## 发现与核实

1. **设置退出不是背景闪变。** 松林、午夜、奶油、晴空几组紧接关闭设置后开始截图，首帧捕获到 Ant 面板或灰色遮罩的退出残影。晴空 `000→001` 的像素变化最大；[000 原图](review/theme-frame-audit/cloud-chat-000.jpg) 仍有设置，[001 原图](review/theme-frame-audit/cloud-chat-001.jpg) 已关闭，后续循环没有重复出现。原帧保留，不删除或伪装成稳定背景帧。
2. **绿色首轮采样有缺口，已补采。** 原记录最后一段出现 2.8 秒的截图开始间隔，末次截图调用耗时 3.338 秒；两帧文字边缘清晰度也有差异，仅截图不能确定栅格差异原因。没有把这段判断为流畅证明。另采完整 40 秒，得到 216 张，最大间隔 307ms；补采的三个联系表与亮暗极值全尺寸图均已检查，没有对应的背景突变。
3. **内容没有跟随光影移动。** 七组中，输入框、消息区、末条消息及视口矩形各只有一个取值；输入框始终为 x392 / y627 / 736×54，scrollWidth 始终为 1280。背景矩阵持续变化且页面可见，背景没有误停成静态截图。
4. **暂停与关闭总动效行为不同。** 背景暂停后的 11 个采样点两层均为 paused，矩阵各只有一个取值；恢复后的 7 个采样点均 running 且矩阵继续变化。关闭总动效或系统 reduce 生效后，animation-name 均为 none，回到静止构图，可能一次改变光影位置；没有把它写成任意状态下均保持同一构图。截图未见内容位移、遮挡或闪白。

## 输入框、回复与开关补查

| 检查 | 实际结果 | 全部采样 |
| --- | --- | --- |
| 输入框展开 | 默认 54px，记录到中间高度 119.05px，最终 146.25px；截图没有工具栏越界 | [5 张](review/theme-frame-audit/composer-expand-sheet.jpg) |
| 输入框收起 | 146.25px → 中间 78.575px → 54px；最终回到简洁态 | [8 张](review/theme-frame-audit/composer-collapse-sheet.jpg) |
| 沉浸回复 | 键盘操作回复后焦点为“输入消息”；回复外层 z-index1002，高于遮罩1001，应用 z-index auto / transform none；Esc 返回普通输入 | [8 张](review/theme-frame-audit/reply-focus-sheet.jpg)、[层级数据](review/theme-frame-audit/reply-wrap-state.json) |
| 背景暂停 / 恢复 | 暂停保持矩阵，恢复继续运行 | [暂停12张](review/theme-frame-audit/background-pause-sheet.jpg) · [恢复8张](review/theme-frame-audit/background-resume-sheet.jpg) |
| 总动效关闭 | 移除动画并显示静态构图 | [15 张](review/theme-frame-audit/interface-motion-off-sheet.jpg) |
| 系统减少动态 | 移除动画，显示“系统已开启减少动态，当前显示静态背景” | [18 张](review/theme-frame-audit/system-reduce-sheet.jpg) |

上述短过渡采样能核对中间/结束状态和层级，不足以判断每个 16.7ms 帧的流畅度。键盘聚焦屏幕外开关时，设置正文会滚动以显示该控件，不能把这一操作性滚动当成背景带动内容。

## 完整性与结束状态

- 本轮只新增审查证据与相关文档，29 份源码/产物文件对照采集基线哈希无变化。没有新增依赖、构建、业务规则或真实服务调用。
- 本轮证据目录共 1,504 张位图（含所有原始采样、联系表和结束预览），最大 373,834 字节，均低于 900,000 字节。原图保存和查看前均检查大小。分析脚本仅缩放、排列实际截图及标注时间，没有绘制 UI 或生成中间帧。
- 测试使用独立临时标签页；仅该页临时模拟 no-preference，结束已清除模拟并关闭测试页。本轮未设置视口覆盖。原预览仍为蔚蓝流光 / 浅色，实际系统 reduce=true，仍显示静态背景；见 [保留状态](review/theme-frame-audit/original-preview-preserved.json) 与 [预览截图](review/theme-frame-audit/original-preview-preserved.jpg)。测试页控制台错误记录为 0。

## 尚未验证

- 60fps 完整渲染帧、性能轨迹与 10% 动画慢放；此前 raw CDP 不支持 Animation domain 的限制仍在。
- 608 秒组合重复、后台标签页调度、所有浏览器与设备。本轮是桌面补审，没有将此前 320px 检查重新记成本轮测试。
- 任意自定义图片与所有业务流程的穷举。此前图片与手机版的检查仍按 [上轮报告](theme-collection-review.md) 的实际范围引用。

本轮采用 ui-design / better-ui 的审查方法及独立只读复核。没有远端设计画布写入、外部发送、提交或发布；结果仍为探索稿自审。
