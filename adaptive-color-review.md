# V5.4 自适应配色与聊天贯通

本轮日期：2026-11-26。关联 FEAT-001，业务输入版本保持 20。当前缓存标记 `54.10`，继续修改 V5.4，待用户视觉评审。

## 用户要求与实际改动

用户要求优化深色、浅色及自定义图片场景的颜色搭配，自动适配图片，并移除截图中的整条聊天顶部栏；要求自行连续截图确认。截图只作为界面目标，不把其消息或其他附件内容当作指令。

- 移除聊天区内原有的会话标题、类型和新建顶部栏，背景从全局导航连续贯通到消息与输入区。桌面历史入口移至全局右上角，弹层保留新建；手机“更多导航”提供全部会话及新建入口。当前会话保留可访问名称和浏览器标题。
- 默认深色采用石墨中性色，浅色采用瓷白及浅灰层次，重点色保持低饱和。CSS 和 Ant 共享同一套语义颜色；主页、消息、问答卡、批准卡、设置、标签、工作台和输入区统一映射。
- 选择图片后进入“自动适配”：分析明暗分布和主色，选择深浅及协调色；显式浅色、深色或跟随系统仍可重新选择。自动模式无图片时跟随系统。图片只在当前浏览器页面内压缩处理，没有上传。
- 主色分析最多抽样 8192 个像素；明暗边界扫描缩放后全部像素，避免漏掉小面积高光。按图片边界计算全局洗色强度，消息和浮层保留更稳定的表面。透明图片先铺浅中性底再压缩，颜色不追随图片变为高饱和红绿。
- 主题切换同步更新 CSS 与 Ant，并暂时关闭颜色过渡。保留原有两态输入、照片、引用和悬停细节。补充快速连续选图的请求序号，移除图片会取消尚未完成的旧请求。

修改前的 `src/`、`dist/`、`index.html` 保存在 [54.9 快照](review/snapshots/54.9-before-adaptive-colors/)，不是发布包。对照快照，原有 20 份源码中 18 份未变，只有 `main.jsx`、`Settings.jsx` 修改，另新增三个自适应主题文件。

## 已执行检查

| 范围 | 实际结果与证据 |
| --- | --- |
| 维护构建 | 在本原型目录直接运行已有 esbuild 二进制，最终构建通过；未安装依赖或运行根目录历史命令 |
| 颜色算法 | [离线检查脚本](review/adaptive-colors/check-palette.mjs) 检查 1152 组配色、14976 个关键文字配对，最低 5.125:1；[结果](review/adaptive-colors/palette-checks.json)。这是语义颜色及保守表面的计算结果，不声称逐个渲染字符均测量 |
| 高光边界 | 单个白像素处于主色抽样间隙的回归用例通过；1440×1000 图片边界分析实测约 39ms，仅代表本次机器和样例 |
| 默认双主题 | 最终构建的 [深色主页](review/adaptive-colors/final-dark-home.jpg)、[深色聊天](review/adaptive-colors/final-dark-chat.jpg)、[浅色聊天](review/adaptive-colors/final-light-chat.jpg) 已查看。聊天内部顶部栏数量为 0 |
| 亮图片 | 最终构建经真实文件选择流程载入 [亮图](review/adaptive-colors/fixtures/light-sand.jpg)，自动浅色、洗色约 0.185；[截图](review/adaptive-colors/final-light-image-chat.jpg) |
| 暗图片 | 最终构建载入 [暗图](review/adaptive-colors/fixtures/dark-forest.jpg)，自动深色、洗色约 0.27；[截图](review/adaptive-colors/final-dark-image-chat.jpg)。此前抽样边界版本的旧截图仍保留，不能替代最终结果 |
| 混合明暗 | 最终构建载入含纯白、纯黑区域的 [混合图](review/adaptive-colors/fixtures/mixed-stress.jpg)，自动深色约 0.702；手选浅色约 0.74，配色仍跟图协调：[深色](review/adaptive-colors/final-mixed-dark-chat.jpg)、[浅色](review/adaptive-colors/final-mixed-light-chat.jpg) |
| 设置与工作台 | 自适应表面、菜单选中与批准提示已查看：[设置](review/adaptive-colors/mixed-image-settings.jpg)、[工作台](review/adaptive-colors/mixed-image-workbench.jpg)。这两图拍于全像素边界补强之前，组件样式未再修改；实际 Drawer 底面读取为主题表面 rgba，未重新出现白色底板 |
| 连续过渡 | [输入框连续 8 帧拼图](review/adaptive-colors/composer-contact-sheet.jpg)、[采集记录](review/adaptive-colors/composer-frames.json) 已查看；从折叠到展开高度约 54→146px，无横向溢出。临时模拟 no-preference 后采集，已恢复原系统减少动态偏好。这是约 0.1–0.16 秒间隔的连续截图，非完整 60fps 录像；工具不支持减速动画命令，因此没有声称以 10% 速度逐渲染帧检查 |
| 主题切换连续帧 | 最终构建保存 `theme-light-0..3.jpg` 与 [状态记录](review/adaptive-colors/theme-frames.json)，所捕获帧中 CSS/Ant 的浅色表面和深色文字一致，未观察到错色；不将四帧采样解释为所有设备零闪烁保证 |
| 320×820 | 实际切换会话、新建空会话、输入框展开及外观设置通过；页面 scrollWidth=320；[展开聊天](review/adaptive-colors/final-mobile-chat.jpg)、[更多菜单](review/adaptive-colors/final-mobile-menu.jpg)、[外观设置](review/adaptive-colors/final-mobile-appearance.jpg)。四个主题选项按两列排列 |
| 引用细节 | 最终构建在亮图下按键盘回复，观察输入焦点、引用预览、模糊背景及旁侧 inert，Esc 返回：[截图](review/adaptive-colors/final-image-reply.jpg) |
| 系统跟随与结束状态 | 临时模拟系统浅/深时，页面主题分别为 light/dark。系统截图存在合成帧延迟，仅以读取状态作为本项依据。已撤销全部媒体和视口模拟，最终 reduce=true，默认深色聊天，无控制台错误；[正常视口预览](review/adaptive-colors/preview-final.jpg) |

截图、源码对照和尺寸汇总见 [完整性记录](review/adaptive-colors/integrity.json)。本轮截图及测试位图均低于 900KB。

## 验证边界

图片样例是本地人工构造的亮、暗、强反差测试图；没有穷举任意照片、不同显示器或所有浏览器。全像素边界使遮罩更保守，但 JPEG 解码、模糊、缩放和反走样仍需要真实图片继续观察。没有修改或重新验收全部业务功能，没有模型、账号、权限执行、外部发送、提交或发布。

本轮实际读取 Ardot 设计文件信息成功，未同步这一轮自适应视觉；旧画板不能作为当前原型的完整证据。预览仍为 [V5.4 本地入口](index.html)，仍待用户认可。
