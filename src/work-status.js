// Presentation of the shared workflow facts. A label never starts or approves work.
export function getTaskStatus(task, snapshot = {}) {
  if (!task) return { label: '暂无工作', tone: 'neutral', detail: '还没有关联的工作', busy: false };
  const lastEvent = task.events?.at(-1)?.replace(/^[^·]*·\s*/, '') || '';
  const status = (label, tone, detail, busy = false) => ({ label, tone, detail: detail || lastEvent, busy });
  if (task.status === 'unknown') return status('待核实', 'warning', lastEvent || '先核对已有执行结果，不自动重跑');
  if (task.status === 'stopping') return status('正在停止', 'active', '停止请求已发出，等待执行端回执', true);
  if (task.status === 'stopped') return status('已停止', 'neutral', '执行端已确认停止，已有进展保留');
  if (task.status === 'cancelled') return status('已取消', 'neutral', '已放弃后续目标，已有记录保留');
  if (task.status === 'partial') return status('部分完成', 'warning', lastEvent || '已有部分成果，其余内容仍待处理');
  if (task.status === 'done') return status('待验证', 'success', '成果已交付，验证结果仍需单独核对');
  if (task.status === 'plan') return task.accepted
    ? status('已认可 · 未执行', 'neutral', `方案 v${task.version} 已认可，尚未开始执行`)
    : status('待讨论', 'waiting', `方案 v${task.version} 已保存，等你确认方向`);
  if (task.id === 'login' && ['running', 'waiting'].includes(task.status)) {
    if (snapshot.approval === 'pending') return status('待你批准', 'waiting', '本次构建等待批准，其余已授权工作按现有进度进行');
    if (snapshot.approval === 'requested') return status('等待回执', 'active', '批准请求已提交，等待模拟执行端回执', true);
    if (snapshot.approval === 'denied') return status('批准未通过', 'warning', '仅这次构建未获批准，已有进展保留');
    if (snapshot.approval === 'unknown') return status('回执待核实', 'warning', '批准回执无法确认，先核对执行状态');
    if (snapshot.approval === 'revoked') return status('授权已撤销', 'warning', '不能继续使用这次构建授权');
    if (snapshot.approval === 'approved') return status('工作中', 'active', '单次构建已获批准，执行结果仍待核验', true);
  }
  if (task.status === 'running') return status('工作中', 'active', lastEvent || '工作正在进行，有新进展会继续回复', true);
  if (task.status === 'waiting') return status('等待中', 'waiting', lastEvent || '正在等待依赖或其他输入');
  return status('状态待核实', 'warning', '还没有可确认的工作状态');
}

export function getProjectTasks(project, snapshot = {}) {
  return project ? (snapshot.tasks || []).filter(task => task.project === project.name) : [];
}

export function getProjectSummary(project, snapshot = {}) {
  const tasks = getProjectTasks(project, snapshot);
  if (!tasks.length) return { label: '暂无工作', tone: 'neutral', count: 0, busy: false, detail: '项目尚无关联工作' };
  const statuses = tasks.map(task => getTaskStatus(task, snapshot));
  const groups = new Map();
  for (const item of statuses) groups.set(item.label, (groups.get(item.label) || 0) + 1);
  const tone = ['warning', 'waiting', 'active', 'success', 'neutral'].find(value => statuses.some(item => item.tone === value));
  return {
    label: [...groups].map(([label, count]) => `${count} 项${label}`).join(' · '),
    tone,
    count: tasks.length,
    busy: statuses.some(item => item.busy),
    detail: tasks.map((task, index) => `${task.title}：${statuses[index].label}`).join('；'),
  };
}
