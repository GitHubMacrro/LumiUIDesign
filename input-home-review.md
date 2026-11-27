# V5.4 · 54.13 输入、消息操作与主页修订

日期：2026-11-27（Asia/Shanghai）  
关联：FEAT-001；既有业务输入版本20保持，涉及的模型原生能力表达沿用FEAT-003边界。  
状态：本轮本地原型修改与自审记录；待用户视觉与交互评审。最新消息修正、Edge六主题、320px主页与输入／引用／工作台组合已实查并逐张看清晰图；图片优先路径完成状态与功能检查，图片截图清晰度仍有明确限制。不是用户视觉批准、正式产品验收或真实服务验收。

## 1. 基线与授权

- 本轮继续修改当前`lumi-v5.4/`，从54.12迭代到54.13，没有新建V5.5或V6目录，也没有将参考稿作为代码基础。
- 依据为[输入、消息操作与主页实施交接](../../reviews/lumi-v54-input-home-handoff-20261127.md)。用户已明确授权先备份、再新会话开工；此前“先只读”的临时限制不再适用。
- 修改前完整备份为[54.12版本包](../../exchange/outgoing/lumi-v5.4-54.12-backup-20261127/README.md)。本轮检查了READY及清单概要，备份保持只读，没有重复制作。原备份登记的22,640个原型文件、349,873,487字节和12份文档是备份时的统计；本轮保护检查不等于重新逐文件验证整份备份。
- V5、V5.2、V5.3继续保留；V5.1只作为被否定的历史稿；`UI-design/hark/lumi-v6/`仅用于局部交互与主页构图的只读参考。
- 使用`ui-design`，结合`better-ui`、`better-layout`、`better-accessibility`及多步工作规划方法。开始时实际核对设计MCP：OpenDesign Cloud列出既有项目，但没有当前V5.4完整稿的绑定依据；Ardot文件信息读取成功，其旧简化稿不作为当前完整验收稿。本轮实现与主要交互依据仍为已授权的本地原型，未声称已同步远端完整视觉。

## 2. 本轮实际修改

### 2.1 输入：两态保留，右下操作独立

1. 保留默认收起的两态、双滑杆入口与真实Ant组件。语音／发送操作组从第一行文本布局中解耦，锚定整个输入容器右下；展开参数、多行、附件与引用不会将它留在输入行右上。窄屏不再隐藏语音按钮。
2. 参数区改为允许换行的紧凑分组，独立留出操作组净空；移除输入与参数之间的横线，附件、选择器和参数等控件采用一致的淡悬停背景，并保留选中、焦点与禁用区别。
3. 模型仍为Ant Select，触发器有限宽度，不再吞满剩余网格。搜索、模型／来源全称、标识、不可用状态和“管理模型与来源”保留；下拉内容可比触发器宽，长值仍可查看完整信息。
4. 档位与Token预算均以Ant Slider为主要操作，但两种能力不互换：档位离散停靠，预算按明确的模拟来源范围显示单位和值，来源默认独立于自定预算。固定、不支持及未知能力如实呈现。
5. 当前Sonnet预算范围被显式标注为“本地模拟来源范围；未核验真实提供商”。`1–64,000 Token`、初值`8,192`只属于这份原型样例，不是提供商真实规格或Lumi产品默认。
6. 精确预算编辑使用独立草稿。InputNumber移除会提前夹值的`min/max`，以`onInput`保留原始字符串；`0`、`64001`、空串与`-`不会被悄悄应用为有效预算，也不会自动变为来源默认。无效时显示就近错误、`aria-invalid`及说明关联，并阻止适用的Lumi请求发送；恢复有效整数或切回来源默认后可继续。
7. Agent原生管理模型不受不适用的Lumi预算草稿阻挡；离线Agent、不可用模型与空消息仍各自沿用发送边界。
8. 删除常驻“Enter发送·Shift+Enter换行”文字。实际Enter发送、Shift+Enter换行、组合输入保护保留，并补`keyCode 229`保护；这部分自动检查是事件对象模拟，不冒充真实中文输入法实测。

### 2.2 消息：下沿按需插入图标行

- 助手保留复制／回复／重新生成；用户保留复制／回复／撤回。全部采用图标、Tooltip与可访问名称；复制成功原位转为对勾，重新生成有进行中反馈。
- 操作行改为消息下沿的真实内容行，隐藏时高度为零、不预留空槽；显示时让后续内容短距离让位，不再盖在正文上方。助手左对齐、用户右对齐，按钮区域与消息同属可保持的交互范围。
- 用户在本轮继续反馈图标偏大、显示操作后整体下移容易疲劳。已将桌面图标收至14px、命中区域保留24×24px，操作行总高30px；显示时复用既有消息间距，将普通消息底部margin由24px过渡到4px，净新增让位10px。同一1440×960视口与内容实测：msg5的y保持306.703，后续msg6由507.796到517.796；该组结果说明本次受测普通消息的净位移，不推广为连续块或触屏的统一距离。
- 桌面悬停、键盘可见焦点、Tooltip及生成进行中状态可保持操作行；触屏按需点按／长按，移动、滚动式手势与取消会撤销待触发的长按。触屏单元模拟不等于真实手机滚动验证。
- 指针进入延迟140ms再展开、离开保留180ms，减少扫过时反复让位，也为跨入按钮区域留出时间；键盘焦点路径不依赖等待这段悬停计时。此处的140／180ms是进入／离开保持时间，不是截图采样帧率。
- 操作行展开关闭采用受系统／应用减少动态控制的高度与透明度过渡；针对浏览器滚动锚定干扰，消息滚动容器显式退出自动锚定，避免操作行展开时原消息反向跳移。
- 按最新反馈，时间从时钟图标改为操作行内直接显示`HH:mm`，悬停／聚焦可查看日期Tooltip。有页面内新消息时间戳时显示上海完整日期与时刻；历史样例只有时分或会话时间时，明确标注“未记录日期”或“样例会话时间”，无记录显示“未记录”，不补造逐条日期。
- 320px触屏CDP实查中，首次触摸时间曾因focus与click双触发抵消提示。已将Tooltip保留hover／focus触发，点击时显式`focus({preventScroll:true})`；随后首次触摸能够打开日期，点按其他消息可关闭，滚动后操作行按预期收起。该路径只使用浏览器触屏模拟，不声称真实手机已通过。
- 就近撤回预览及二次确认保留；未知ChangeSet仍阻止完整撤回。照片堆、照片墙、Ant大图、引用胶囊、原文回跳、回复遮罩与隐藏滚动条保持，未将撤回移到会话菜单。

本组修改后的`hover-after-open-1440.jpg`、`time-visible-date-tooltip-1440.jpg`、`time-new-date-1440.jpg`及`message-button-focus-compact.jpg`已按大小要求核对后逐张查看，覆盖紧凑操作、旧记录日期说明、新消息完整日期与键盘按钮焦点。此前38px操作行和时钟图标截图保留为阶段历史，不代表当前效果。

### 2.3 主页：中心聚焦，有主次而不删入口

- 采用按上海时间变化的简短问候、轻量日期与适度光球；不再依赖硬编码姓名。光球仅辅助氛围，待处理与工作状态仍有明确文字和入口。
- 原待处理通知入口与两项当前工作合为轻量摘要带。待办取既有通知记录的`needsAction`，点击仍打开原通知，不在首页直接批准；当前工作仍沿用原对象选取方式，以原派生状态与最近事实补一句有价值摘要。
- 四个原面板全部保留：关注动态、接着聊、持续关注、天气。桌面为不等宽、按内容伸缩的Grid，窄屏单列；DOM与视觉阅读顺序统一为“关注动态→接着聊→持续关注→天气”。不将功能统统塞入“更多”，不机械凑四张等面积卡片。
- GitHub三项更新、正常／离线／未关注、刷新、详情和“带到对话”保留；方案与继续会话保持原入口；排查步骤和依据、逐时天气放入对应Ant Collapse按需展开，摘要本身仍保留变化点或下一步信息。
- 光球初版误用了为环境文字对比提亮的`--canvas-warm`，导致材质偏银白。本轮改为局部`--h54-orb-warm`引用品牌暖色，减少白色、蓝辉光与灰色混合；浅色模式仅进一步提亮该局部材质别名。没有修改主题的文字、表面或环境角色。
- 光球持续内光仅在系统允许、应用总动效开启、既有背景处于running三条件同时成立时启用；背景暂停、图片路径、页面隐藏及减少动态路径保持静态。正式面板默认策略、工作优先级和业务显示规则没有因此冻结。
- 图片回归发现，外观主题卡原处理会覆盖正在生效的自定义图片背景。已在Settings的`choosePreset`中保护当前图片与已选明暗，只记录`styleTheme`作为切回“跟随主题”后的备用主题；就近帮助文案说明此边界，背景动效文案亦明确图片保持静止。这是恢复既有图片优先原则，不增加新的业务默认。

## 3. 文件范围

| 文件 | 本轮职责 |
| --- | --- |
| [src/Composer.jsx](src/Composer.jsx) | 操作组解耦、模型信息、两类Slider、预算草稿与发送保护、键盘保护 |
| [src/ChatThread.jsx](src/ChatThread.jsx) | 消息操作状态、图标与时间、焦点／触屏路径、照片墙细节保护 |
| [src/Home.jsx](src/Home.jsx) | 问候、轻量待办与工作摘要、四面板重排及就近详情 |
| [src/main.jsx](src/main.jsx) | 新消息／回答／重新生成的页面内时间戳与新增局部样式的加载 |
| [src/Settings.jsx](src/Settings.jsx) | 显式模拟预算范围元数据；图片生效时保护背景／明暗并记录备用主题，补就近说明；不是新增真实提供商能力 |
| [src/composer-polish.css](src/composer-polish.css) | 整体容器右下定位、紧凑选择器、参数净空与窄屏语音 |
| [src/message-actions.css](src/message-actions.css) | 零空槽操作行、图标尺寸、短距离过渡与滚动锚定修正 |
| [src/home-focus.css](src/home-focus.css) | 中心构图、不等宽响应式Grid、局部光球材质与动效约束 |
| [index.html](index.html)、`dist/` | 54.13同轮缓存标记54.13.1及对应维护构建产物 |

构建只使用本原型已有依赖与README维护入口，不在工作区根目录执行历史npm命令，没有安装新组件库。保护检查中的“5处预期修改”指纳入原有源文件基线的5个文件；3份新增CSS、入口缓存标记、产物及本轮文档另行登记，不将它们误计为受保护参考稿被修改。

## 4. 检查矩阵：证据等级与实际范围

| 检查项 | 当前记录 | 证据与边界 |
| --- | --- | --- |
| 修改前备份 | READY／清单概要已检查，保持只读 | 本轮未重新遍历校验备份中22,640份原型副本 |
| 历史稿／只读参考保护 | 1,125个受保护基线项未变，5处预期源码变化，0处越界 | [保护基线](review/input-home-54.13/guardrail-protected-baseline.json)、[检查报告](review/input-home-54.13/final-guardrail-report.json)；不是全部依赖缓存审计 |
| 静态与提取函数模拟 | 最新落盘报告70／70；此前47／50／57项为中间检查规模 | 含键盘、发送保护、预算、日期、触屏逻辑、图片主题保护、紧凑消息与CSS结构；不是70项浏览器或真机测试 |
| 输入两态／右下操作／桌面与320 | Edge最终320px三行＋双附件＋展开及引用组合清晰图已逐张查看；桌面工作台与相同输入组合已查 | 语音／发送距整体容器底部10px，受测组合无横向溢出；截图不是所有设备或连续状态的穷举 |
| 模型与来源 | 紧凑Select、信息与不可用表达已实现并作阶段检查 | 原生Agent边界保留；没有连接真实模型目录或提供商 |
| 两类推理 | 档位与预算分别实现，默认及未知／固定保留 | [档位阶段图](review/input-home-54.13/reasoning-levels-1440.jpg)、[预算阶段图](review/input-home-54.13/budget-slider-1440.jpg) |
| 精确预算无效编辑 | 主agent浏览器实查`0`、`64001`、空串、`-`和有效`9000`，并核对原生Agent不受阻 | [预算浏览器记录](review/input-home-54.13/budget-browser-results.json)保留其中`64001`、空串、`-`、`9000`四组；`0`及原生Agent结果按本轮实查登记，不冒充已包含在该JSON内 |
| 批准偏好 | 本地浮层与应用偏好路径已查 | [320阶段图](review/input-home-54.13/approval-preference-320.jpg)；保存偏好不授予真实权限 |
| 图标／复制／重新生成／时间 | 14px图标／24px桌面命中区域、HH:mm直显与日期Tooltip已实施；最新4张相关图逐张查看 | 新旧时间依据区分，键盘按钮焦点已截图核对；复制为用户主动操作下的本地剪贴板行为，不代表全部浏览器剪贴板兼容 |
| 消息操作连续让位 | 桌面普通消息实测净新增10px，原消息位置不变；紧凑关闭采样有中间高度 | 最终展开8张仅有0／30px两个端点，没有中间高度，不能证明展开过程完整观感；不声称60fps |
| 指针跨区／键盘／触屏 | 桌面保持／焦点已查；320px CDP coarse:true、hover:false实查点按、日期与滚动关闭 | 粗指针操作按钮36px；首次触摸日期已修正并复测，不是真实手机、原生长按或屏幕阅读器验收 |
| 照片／引用／撤回 | 阶段截图覆盖照片墙／大图、回复组合及两类撤回预览 | 未知ChangeSet仍阻止撤回；不是对真实文件执行回滚 |
| 主页入口与响应式 | 入口／DOM顺序复核；Edge320px浅色自动模式及最终重录深色主页、1440深色主页清晰图已逐张查看 | 400／320媒体继承已复核；只有明确记录的视口和状态，不外推至全部缩放／设备 |
| 三套Lumi深浅主题 | 六组Edge清晰终图已逐张查看，保留DOM主题／模式／减少动态状态记录 | 终图为14:45–14:48重新获取的六份单图；旧`themes-final-contact.jpg`不作为终版，不由截图检查推导用户认可 |
| 图片优先／同族明暗保留 | 合成SVG图片在IAB上传后自动适配；选主题仍保留custom／wallpaper及auto或固定light；保护修正已复测 | [最终图片优先记录](review/input-home-54.13/wallpaper-priority-final.json)为状态／功能证据；3张IAB图片图仍模糊，不写清晰视觉通过，Edge上传受权限限制未更改权限 |
| 旧主题 | 原算法与主题文件继续受保护，未被本轮替换 | 没有逐套重做旧主题全量视觉验收，不沿用54.12历史结论冒充本轮通过 |
| 项目／工作台／通知／设置 | 共享模拟状态与既有入口保留；最终320px工作台及1440px工作台／输入组合清晰图已看 | 本轮没有重写23栏目／Agent权限／方案流程；所查组合不等于已逐项重做所有栏目验收 |
| 中文输入法 | Enter／Shift／composition／229事件对象模拟通过 | 未执行真实中文IME组合输入会话，不写成真机输入法通过 |
| 真实服务 | 未接入、未验收 | 无真实模型、账号、邮件、GitHub、天气、数据库、设备日志或权限执行 |

### 静态报告的阶段差异与重测

本轮先有47项检查汇总；预算编辑改为原始字符串草稿后，阶段报告曾为46／47，唯一失败项是“Empty numeric edit does not mutate model config”，错误发生在测试抽取器`assert.ok(handler)`，即未匹配到更新后的处理函数。这一阶段失败没有被当作通过或仅凭推测忽略。

随后适配当前写法并补充原始字符串草稿等检查，14:35（Asia/Shanghai）的报告为50／50；时间直显、紧凑消息与位图等补充后15:33为57／57。图片主题保护与相应处理函数检查继续补充后，16:17的报告为70／70；全部补图后最终复跑仍为70／70，失败项为0，位图统计同步为183张。预算浏览器实查另行确认原始字符串与有效值路径。检查规模变化不代表增加了真机或真实服务证据；本记录不另加未实际运行的断言计数。哈希保护汇总仍为1,125／5／0。

## 5. 连续采样记录及不能证明的事项

早期原始数据在[motion目录](review/input-home-54.13/motion/)，紧凑消息采样为证据根目录的`compact-motion-open.json`、`compact-motion-close.json`及最终`compact-final-open.json`。本轮不是录制60fps完整视频，也没有验证每个渲染帧；截图后端存在输出延迟与旧帧风险，几何数据和截图观感必须分开判断。原始记录没有自动绑定到最终源码哈希，后续修改也不会使旧采样自动成为当前证据。

| 组别 | 样本与实际间隔 | 可观察结果及限制 |
| --- | --- | --- |
| 桌面`composer-close` | 12张，跨度2,716ms；119–493ms，平均246.9ms | 该组工具区高度均为0，只能证明关闭稳态与右下位置，不能作为关闭过程连续性证据 |
| 桌面`composer-open` | 12张，跨度2,212ms；141–392ms，平均201.1ms | 该组已经全部位于展开高度，不能冒充拍到了展开中间帧 |
| 桌面`composer-direct-close` | 10张，跨度2,416ms；100–1,068ms，平均268.4ms | 记录工具区约84.84→12.42→0的中间高度；操作组bottom保持951。首间隔较大，仍不是完整高帧率过程 |
| `composer-mobile` | 24张，跨度1,785ms；53–224ms，平均77.6ms | 包含多行输入下展开与关闭中间高度；操作组bottom保持756，输入容器bottom保持766。只能证明该段本地模拟样本 |
| 历史`message-normal` | 25张，跨度3,400ms；89–186ms，平均141.7ms | 这是缩小图标／复用间距之前的38px行：0→约35.14→38，再回0，原消息top保持615.59。仅保留为本轮早期历史，不能代表当前30px紧凑行 |
| 最新`compact-motion-open` | 12张，跨度1,912ms；128–355ms，平均173.8ms；记录playbackRate为1 | 全部采到操作行30px、margin4px的展开稳态，没有中间高度，不能证明展开过渡已经被拍到 |
| 最新`compact-motion-close` | 10张，跨度1,319ms；134–165ms，平均146.6ms；记录playbackRate为1 | 操作行30→1.14→0，margin4→23.236→24；原消息top保持166.703，下一条377.797→约368.172→367.797，净收回10px。可证明这一采样段有关闭中间状态，不是逐帧或全设备验证 |
| 最终`compact-final-open` | 8张，跨度962ms；105–184ms，平均137.43ms；记录playbackRate为1 | 前2张为0px／margin24px，后6张为30px／margin4px；msg5保持306.703，msg6从507.797到517.797。只采到两个端点、未采到中间高度，不作连续展开观感或60fps证明 |

桌面输入JSON含不同采样组之间的长停顿；不能将整个JSON首尾跨度当作同一条连续动画计算帧率。联系表是有限样本的审图工具，不是60fps证明。本轮尝试10%慢放时，当前CDP能力不支持所需操作，因此没有完成10%慢放验证；上述最新紧凑采样仍是playbackRate为1的普通速度，不将其称为慢放。

## 6. 最终组合检查、图片优先及截图限制

1. 首份`before-home-1440.jpg`出现后端裁切，只能作为问题诊断保留；有效完整桌面基线改用`before-home-full-1440.jpg`。不要将两者当作相同画幅的直接前后对照。
2. `after-home-1440.jpg`是早期实现截图，早于暖金材质修正；`after-home-320.jpg`含临时toast，不作为最终干净评审图。文件名含`final`本身也不能替代源码时点和清晰度核对。
3. 本轮内嵌截图在缩放、DPR与切换主题后出现模糊或疑似旧帧。`clarity-*`、`fresh-home-clarity.jpg`等为诊断证据，不是新的产品效果。部分主题截图相似不能据此判定主题相同，也不能以DOM已改变反过来证明画面已更新。
4. 六组Lumi深浅已改用Edge重新获取清晰终图并逐张查看：`theme-lumi-light.jpg`、`theme-lumi-blue-light.jpg`、`theme-lumi-teal-light.jpg`及对应三张dark图，最新文件时间为14:45–14:48；`final-home-1440.jpg`亦为清晰主页证据。这里的teal文件名对应产品的`lumi-green`青岚微光，不是新增主题。`themes-final-contact.jpg`早于这组六份终图，仍含旧帧／旧输出，不作为终版联系表。DOM状态JSON可辅助核对，不能替代实看清晰图。
5. Edge最终320px图已先查大小后逐张查看清晰画面：`final-home-320.jpg`先检查过浅色自动模式，最终重录为默认深色主页；`final-composer-multiline-attachments-320.jpg`为三行文字、notes／screen两个示例附件和展开参数；`final-reply-multiline-attachments-320.jpg`增加引用组合；`final-workbench-320.jpg`覆盖窄屏工作台。`final-workbench-composer-1440.jpg`覆盖桌面工作台与相同多行／附件输入。受测输入组合无横向溢出，语音／发送距整体容器底边10px。`final-home-1440.jpg`最后重录为清晰深色主页，不用早期模糊同名输出替代。最终320重录时曾返回项目页旧输出，已重新观察DOM与清晰截图并覆盖为正确主页，旧输出不作为主页证据。
6. 触屏使用Edge原始CDP模拟320px、coarse:true、hover:false：点按msg6展开36px按钮；修正后的首次点按时间显示日期，`final-touch-time-320.jpg`已逐张查看。点按其他消息后原日期关闭，随后滚动位置731→626，展开操作列表为`[]`。记录见[touch-date-final.json](review/input-home-54.13/touch-date-final.json)；该JSON保留首次触摸状态，其余点击／滚动事实按本轮实际操作记录，不伪称完整JSON轨迹或真实设备结果。
7. 自定义图片使用合成SVG，经IAB选择后状态为custom背景／wallpaper配色／自动深色，固定light时仍保留图片。发现主题卡会覆盖图片后，修正`choosePreset`在图片生效时保护background和theme，只更新备用styleTheme。复测[wallpaper-priority-final.json](review/input-home-54.13/wallpaper-priority-final.json)：自动模式选澄蓝后仍为custom／wallpaper，auto=true；固定浅色选青岚后仍为light／custom／wallpaper。就近文案解释主题在切回“跟随主题”后生效。
8. 上述图片路径只有功能与状态验证：`final-wallpaper-auto-1440.jpg`、`wallpaper-cdp-clarity.jpg`、`wallpaper-light-state-iab.jpg`三张IAB截图仍模糊；检查时未见CSS filter，DPR为1，不能由此宣称图片视觉清晰通过。Edge文件上传受当前权限限制，没有修改权限来完成该步骤；保留这个视觉验证缺口。
9. 临时IAB与Edge的媒体模拟均已清除、视口override已reset，Edge触屏模拟关闭、缓存禁用恢复；各测试页reload后恢复默认无图片、雾蓝暖光深色主页。实际系统减少动态仍为true，没有更改系统设置。原内嵌预览已刷新至`dist/app.js?v=54.13.1`并保留为交付页；Edge受测状态同为theme／preset:lumi／dark、motion:reduced、pointer coarse:false。
10. 截图读取前先检查大小，项目上限为单张900,000字节。最终[位图／动效摘要](review/input-home-54.13/bitmap-motion-evidence-summary.json)统计183张，最大`clarity-check.png`为582,204字节，0张超限。137／167／171张是中间快照。大小统计本身不证明全部截图已逐张审图；本轮新联系表`themes-final-contact-verified.jpg`、`compact-close-contact-final.jpg`、`responsive-final-contact.jpg`均先查大小并实看，不用旧`themes-final-contact.jpg`替代。

## 7. 证据索引

所有路径均相对当前原型，目录为[review/input-home-54.13/](review/input-home-54.13/)。早期图、诊断图和最终证据的用途应按上一节区分。

| 主题 | 主要文件 |
| --- | --- |
| 完整桌面／窄屏基线 | `before-home-full-1440.jpg`、`before-chat-1440.jpg`、`before-composer-expanded-1440.jpg`、`before-home-320.jpg`、`before-chat-320.jpg`、`before-composer-expanded-320.jpg` |
| 输入阶段图 | `after-composer-expanded-final-1440.jpg`、`after-composer-expanded-320.jpg`、`composer-attachments-320.jpg`、`reply-expanded-attachments-320.jpg` |
| 最终主页／窄屏与工作台组合 | `final-home-1440.jpg`、`final-home-320.jpg`、`final-composer-multiline-attachments-320.jpg`、`final-reply-multiline-attachments-320.jpg`、`final-workbench-320.jpg`、`final-workbench-composer-1440.jpg`；清晰图已按本轮记录逐张查看 |
| 推理与批准 | `budget-slider-1440.jpg`、`reasoning-levels-1440.jpg`、`approval-preference-320.jpg`、`budget-browser-results.json` |
| 最新紧凑消息／时间／焦点 | `hover-after-open-1440.jpg`、`hover-after-closed-1440.jpg`、`time-visible-date-tooltip-1440.jpg`、`time-new-date-1440.jpg`、`message-button-focus-compact.jpg`、`final-time-keyboard-focus-1440.jpg`；关键图已逐张查看，最终键盘时间焦点可直接弹出日期，复制对勾与跨区保持另作实际操作检查 |
| 早期消息动作图（阶段历史） | `message-hover-anchor-fixed-1440.jpg`、`message-copied-1440.jpg`、`message-regenerating-1440.jpg`、`message-time-1440.jpg`、`message-time-new-1440.jpg`；不要误作当前图标／时间样式 |
| 引用、照片与撤回 | `reply-expanded-1440.jpg`、`photo-wall-open-1440.jpg`、`ant-image-preview-1440.jpg`、`ant-preview-native.jpg`、`withdraw-blocked-1440.jpg`、`withdraw-preview-1440.jpg` |
| 动效原始数据 | 最终`compact-final-open.json`、紧凑`compact-motion-open.json`／`compact-motion-close.json`及同名序列图；早期`motion/composer-frames.json`、`motion/composer-mobile-frames.json`、历史38px消息行`motion/message-frames.json`及联系表 |
| 最终触屏模拟 | `final-touch-time-320.jpg`、`touch-date-final.json`；CDP模拟而非真实手机 |
| 图片优先功能／状态与视觉缺口 | `wallpaper-priority-final.json`；`final-wallpaper-auto-1440.jpg`、`wallpaper-cdp-clarity.jpg`、`wallpaper-light-state-iab.jpg`只作模糊诊断和状态证据，不作清晰视觉通过图 |
| 保护与静态检查 | `guardrail-protected-baseline.json`、`final-guardrail-check.mjs`、`final-guardrail-report.json` |
| 六主题清晰终图与状态 | 14:45–14:48的`theme-lumi-light/dark.jpg`、`theme-lumi-blue-light/dark.jpg`、`theme-lumi-teal-light/dark.jpg`及`final-home-1440.jpg`；状态见`theme-browser-results.json`，文件大小快照见`bitmap-motion-evidence-summary.json` |
| 截图诊断／旧联系表 | `clarity-*`、`fresh-home-clarity.jpg`、`themes-final-contact.jpg`；不作为最终六主题画面 |

## 8. 不变的业务与验收边界

- 普通回答不是动作批准；方案认可不是开始执行；通知标读不是处理待办；通知重试不重跑工作。
- 会话／项目草稿、逐块队列归属与撤回取消边界保留。消息、项目、工作台、通知继续共享同一份页面内模拟事实，不新增真实后台。
- 本轮没有读取秘密、真实附件或设备日志，没有真实模型、账号、邮件、GitHub、天气或数据库接入，没有提交、推送、发布或执行权限变更。
- 静态声明、提取函数模拟、本地浏览器、截图采样与真机／真实服务分别登记。未做真实手机、系统IME、屏幕阅读器、Safari／Firefox或全量200%缩放兼容验收。
- 三套Lumi主题及旧主题、图片自适应优先、同族明暗保留、应用／背景／系统减少动态均是本轮保护边界；最终观感仍需真实清晰画面和用户评审，不因自审记录或检查计数而视为获批。
