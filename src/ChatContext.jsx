import React, {useEffect, useId, useState} from 'react';
import {Button, Tooltip} from 'antd';
import {ArrowRightOutlined, ClockCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined} from '@ant-design/icons';
import {useWorkflowState, workflowActions} from './Workbench';
import {getTaskStatus} from './work-status';
import './chat-context.css';

const dateFormat = new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai', month:'long', day:'numeric'});
const weekdayFormat = new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai', weekday:'long'});
const timeFormat = new Intl.DateTimeFormat('zh-CN', {timeZone:'Asia/Shanghai', hour:'2-digit', minute:'2-digit', hourCycle:'h23'});

function ContextClock(){
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let interval;
    const tick = () => setNow(new Date());
    const timeout = setTimeout(() => {tick(); interval = setInterval(tick, 60000);}, 60000 - Date.now() % 60000);
    return () => {clearTimeout(timeout); clearInterval(interval);};
  }, []);
  return <time className="ref54-context-clock" dateTime={now.toISOString()} aria-label={`上海时间 ${dateFormat.format(now)} ${weekdayFormat.format(now)} ${timeFormat.format(now)}`}>
    <span>{weekdayFormat.format(now).replace('星期','周')}</span>
    <strong>{dateFormat.format(now)}</strong>
    <span className="ref54-context-time">{timeFormat.format(now)}</span>
  </time>;
}

export default function ChatContext({sessionId, sessions = [], collapsed = false, onToggle, onContinue, onOpenWorkbench}){
  const workflow = useWorkflowState();
  const contentId = useId();
  const tasks = workflow.tasks.filter(task => task.session === sessionId);
  const recent = sessions.filter(session => session.id !== sessionId).slice(0,3);
  function openWork(task){
    workflowActions.selectTask(task.id);
    onOpenWorkbench?.(task.status === 'plan' ? 'plan' : 'runs');
  }

  return <aside className={`ref54-context${collapsed ? ' is-collapsed' : ''}`} aria-label="对话侧栏">
    <header className="ref54-context-heading">
      {!collapsed && <span>对话概览</span>}
      <Tooltip title={collapsed ? '展开对话概览' : '收起对话概览'} placement="right">
        <Button type="text" size="small" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} aria-label={collapsed ? '展开对话概览' : '收起对话概览'} aria-expanded={!collapsed} aria-controls={collapsed ? undefined : contentId} onClick={onToggle}/>
      </Tooltip>
    </header>
    {collapsed ? <ContextClock/> : <div className="ref54-context-content" id={contentId}>
      <section className="ref54-context-panel" aria-label="当前对话工作">
        <header className="ref54-context-panel-heading"><ClockCircleOutlined/><h2>当前工作</h2>{tasks.length > 0 && <span>{tasks.length}</span>}</header>
        {tasks.length ? <div className="ref54-context-tasks">{tasks.map(task => {
          const status = getTaskStatus(task, workflow);
          return <button key={task.id} type="button" className="ref54-context-task" onClick={() => openWork(task)} disabled={!onOpenWorkbench} aria-label={`${task.title} · ${status.label}，查看工作详情`}>
            <span className={`ref54-context-state tone-${status.tone}`}><i aria-hidden="true"/>{status.label}</span>
            <span className="ref54-context-task-title"><strong>{task.title}</strong><ArrowRightOutlined/></span>
            <span className="ref54-context-task-detail">{status.detail}</span>
          </button>;
        })}</div> : <div className="ref54-context-empty"><p>暂无关联工作</p><span>这段对话还没有独立工作项。</span></div>}
      </section>
      <section className="ref54-context-panel ref54-context-recent" aria-label="其他对话">
        <header className="ref54-context-panel-heading"><MessageOutlined/><h2>接着聊</h2></header>
        {recent.length ? <nav aria-label="其他对话入口">{recent.map(session => <button key={session.id} type="button" onClick={() => onContinue?.(session.id)} disabled={!onContinue}>
          <span><strong>{session.title}</strong><small>{session.when || '最近'}</small></span><ArrowRightOutlined/>
        </button>)}</nav> : <p className="ref54-context-no-recent">还没有其他对话</p>}
      </section>
      <p className="ref54-context-note">工作状态来自本地模拟</p>
    </div>}
  </aside>;
}
