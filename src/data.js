export const initialProjects = [
  { id: 'lumi', name: 'Lumi Assistant', meta: '12 段对话 · 本机', path: 'C:/Projects/Lumi',
    git: { branch: 'main', dirty: 3, ahead: 1, behind: 0, commit: '2 小时前' } },
  { id: 'notes', name: '个人知识库', meta: '6 段对话 · 本机', path: 'D:/Workspace/Notes', git: null },
  { id: 'site', name: '个人网站', meta: '4 段对话 · 本机', path: 'C:/Projects/Website',
    git: { branch: 'main', dirty: 0, ahead: 0, behind: 2, commit: '昨天' } }
];
export const initialSessions = [
  {
    id: 's1', title: '整理这周的工作', when: '今天 11:42', project: null,
    messages: [
      { role: 'user', text: '你好，我是 Jason' },
      { role: 'assistant', text: '你好 Jason。M5 还剩三处界面小问题没修，AntDUI 升级评估也在等你点头，今天要我先让 jack-pc 推哪一个？' },
      { role: 'user', text: '先看看 M5 的三处问题' },
      { role: 'assistant', text: '三处都在界面层，改动很小：', list: ['抽屉底部按钮被截半，把安全区补上即可。', '快捷键表在窄屏换行错位，改成两列栅格。', '「清空」按钮的红色偏亮，降到与错误色一致。'], after: '我可以按这个顺序直接改，也可以先只出改动清单给你确认。', shots: [
        { src: 'assets/home.jpg', cap: '主页' },
        { src: 'assets/chat-tools.jpg', cap: '聊天 · 展开' },
        { src: 'assets/projects.jpg', cap: '项目' }
      ] },
      { role: 'user', text: '先只给我改动清单，别动代码。', quote: { index: 3, author: 'Lumi', role: 'assistant', text: '三处都在界面层，改动很小：抽屉底部按钮被截半、快捷键表在窄屏换行错位、「清空」按钮的红色偏亮。' } },
      { role: 'assistant', text: '好，按顺序排好了：', list: ['抽屉底部补安全区。', '快捷键表改两列栅格。', '「清空」降到错误色。'], after: '你点头我再动手。' },
      { role: 'user', text: '第三处那个红色能再淡一点吗？' },
      { role: 'assistant', text: '可以。顺着你最早提的那三处一起收尾：红色降到错误色，其余两处不动。', quote: { index: 2, author: 'Jason', role: 'user', text: '先看看 M5 的三处问题' } },
      { role: 'assistant', text: '改完我会把截图和对比一起放上来。' }
    ]
  },
  { id: 's2', title: '讨论首页布局', when: '今天 10:18', project: null, messages: [
    { role: 'user', text: '主页现在信息有点散，想要更安静。' },
    { role: 'assistant', text: '把日期放到左栏做锚点，面板收成两张卡，输入框始终在底部。这样一屏只有一个视觉重点。' }
  ] },
  { id: 's3', title: 'AntDUI 升级评估', when: '昨天', project: 'lumi', messages: [
    { role: 'user', text: '2.4.19 能直接升吗？' },
    { role: 'assistant', replyRunId:'upgrade-example', text: '先核对组件用法与兼容性。这一轮只做评估，不安装依赖，也不修改项目。' },
    { role: 'assistant', replyRunId:'upgrade-example', text: '示例变更说明已经整理好。需要重点核对三处：抽屉安全区、表格列宽默认值，以及主题令牌的兼容性。' },
    { role: 'assistant', replyRunId:'upgrade-example', text: '方案 v2 · 待讨论', list:['先核对当前用法与变更说明','列出风险、替代写法和回退条件','交付评估报告，保留未验证事项'], after:'这些是方案步骤，不代表已执行或验证通过。' },
    { role: 'assistant', replyRunId:'upgrade-example', text: '方案已保存。你可以先讨论其中一条；认可方案后，是否执行仍单独决定。' }
  ] },
  { id: 's4', title: '本周项目摘要', when: '11月15日', project: 'notes', messages: [] }
];

initialSessions.push({ id: 's5', title: 'Issue 与邮件 · 等你回答', when: '刚刚', project: 'lumi', messages: [
    { role: 'user', text: '帮我看一下 Issue #128，再告诉团队下一步怎么处理。' },
    { role: 'assistant', text: 'Issue 的描述还不够判断根因。先确定这次要推进到哪一步。', decision: { id: 'issue-demo', kind: 'question', title: '这次如何处理 Issue #128？', context: 'GitHub · LumiBot / Lumi · 仅使用示例资料', options: ['分析并给建议', '准备修复方案', '创建草稿 PR'], status: 'waiting', selected: '', custom: '', targetRevision: 0 } },
    { role: 'assistant', text: '已准备一封团队进展邮件的草稿，发送需要单独确认。', decision: { id: 'mail-demo', kind: 'approval', title: '发送这封邮件？', context: 'Microsoft Outlook · 团队演示邮箱', facts: [['收件人', 'team@example.invalid'], ['主题', 'Issue #128 评估进展'], ['附件', '无'], ['范围', '仅本次发送；没有真实服务连接']], options: ['仅本次同意', '返回修改草稿'], status: 'waiting', selected: '', custom: '', targetRevision: 0 } },
    { role: 'assistant', text: '上一次问题的目标已变化，旧选择不能再触发后续工作。', decision: { id: 'old-demo', kind: 'question', title: '旧版修复范围', context: '目标已更新', options: ['只修复当前问题'], status: 'expired', custom: '', selected: '' } }
  ] });

initialSessions[0].messages[2].changeSet={id:'demo-login-change',status:'unknown'};
