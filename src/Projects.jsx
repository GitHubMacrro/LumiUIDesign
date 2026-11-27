import React,{useState} from 'react';
import {App,Button,Card,Form,Input,Tag,Tooltip} from 'antd';
import {ArrowLeftOutlined,ArrowRightOutlined,ArrowUpOutlined,BranchesOutlined,DownOutlined,FolderOutlined,PlusOutlined} from '@ant-design/icons';
import Composer from './Composer';
import ChatThread from './ChatThread';
import {useWorkflowState,workflowActions} from './Workbench';
import {getProjectSummary,getProjectTasks,getTaskStatus} from './work-status';
import './project-status.css';

function StatusPill({status}){
 return <span className={`p54-status-pill tone-${status.tone}`} title={status.detail}><span className={`p54-status-mark ${status.busy?'is-busy':''}`} aria-hidden="true"/>{status.label}</span>;
}

export default function Projects({showToolPill=true,projects,onAdd,selected,onSelect,sessions,onContinue,draft,onDraft,config,onConfig,onOpenSettings,onOpenWorkbench,projectMessages,onRegenerate,onSend,replyActivities={}}){
 const [adding,setAdding]=useState(false),{message}=App.useApp(),[reply,setReply]=useState(null),project=projects.find(p=>p.id===selected);
 const workflow=useWorkflowState(),tasks=getProjectTasks(project,workflow);
 const session=project?{id:`project-${project.id}`,title:project.name,messages:projectMessages[project.id]||[{role:'assistant',text:`这里是「${project.name}」的项目对话。目录、分支与已分配的资料会跟随这段对话。`}]}:null;
 function openWork(task){workflowActions.selectTask(task.id);onOpenWorkbench(task.status==='plan'?'plan':'runs');}
 function selectProject(id){onSelect(id);setAdding(false);setReply(null);}

 return <div className={`p54-layout ${project||adding?'has-project':''}`}>
  <aside className="p54-sidebar">
   <div className="p54-sidebar-title"><h1>项目</h1><Tooltip title="新建项目"><Button type="text" icon={<PlusOutlined/>} aria-label="新建项目" onClick={()=>setAdding(true)}/></Tooltip></div>
   <p>把对话与工作放在一起</p>
   <div className="p54-project-list">{projects.map(p=>{const summary=getProjectSummary(p,workflow);return <button key={p.id} className={p.id===selected?'selected':''} onClick={()=>selectProject(p.id)}>
    <span className="p54-folder"><FolderOutlined/></span>
    <span className="p54-project-copy"><strong>{p.name}</strong><span className="p54-project-summary"><StatusPill status={summary}/></span><small>{p.git?`${p.git.branch} · ${p.git.dirty?'有待核对改动':'工作区干净'}`:'知识与参考资料'}</small></span>
    {p.git?.dirty>0&&<Tag>{p.git.dirty}</Tag>}
   </button>;})}</div>
   <div className="p54-side-note">项目路径为示例<br/>选择目录不会授予执行权限</div>
  </aside>
  <section className="p54-main">
   {adding?<div className="p54-create">
    <Button type="text" icon={<ArrowLeftOutlined/>} onClick={()=>setAdding(false)}>返回项目</Button><h2>新的工作空间</h2><p>一个项目，收纳相关对话、资料与进展。</p>
    <Form layout="vertical" onFinish={v=>{const p={...v,id:`project-${Date.now()}`,git:null,meta:'新项目 · 示例'};onAdd(p);selectProject(p.id);message.success('已添加本页示例项目，未访问实际目录');}}>
     <Form.Item name="name" label="项目名称" rules={[{required:true,whitespace:true,message:'请输入项目名称'}]}><Input placeholder="例如：个人网站"/></Form.Item>
     <Form.Item name="path" label="工作目录（示例）" rules={[{required:true,message:'填写一个示例路径'}]}><Input placeholder="C:/Demo/Project"/></Form.Item>
     <Button type="primary" htmlType="submit">创建示例项目</Button>
    </Form>
   </div>:project?<>
    <header className="p54-project-head"><div><Button type="text" className="p54-back" icon={<ArrowLeftOutlined/>} aria-label="返回项目目录" onClick={()=>onSelect(null)}/><span className="p54-folder"><FolderOutlined/></span><div><h1>{project.name}</h1><small>{project.path} · 示例路径</small></div></div><Button type="text" onClick={()=>onContinue(project.id)}>在聊天中继续 <ArrowUpOutlined rotate={45}/></Button></header>
    <div className="p54-git-line">{project.git?<><Tag icon={<BranchesOutlined/>}>{project.git.branch}</Tag><span>{project.git.dirty} 处改动</span><span>领先 {project.git.ahead} · 落后 {project.git.behind}</span><span>最近提交 {project.git.commit}</span></>:<Tag>未识别 Git 仓库</Tag>}<Button type="link" size="small" onClick={()=>onOpenWorkbench('artifacts')}>查看成果</Button></div>
    {tasks.length?<details className="p54-project-work" key={project.id} open>
     <summary><span>当前工作 <span className="p54-work-count">{tasks.length}</span></span><span className="p54-work-summary-text">{getProjectSummary(project,workflow).label}</span><DownOutlined/></summary>
     <div className="p54-work-list" aria-label={`${project.name}的工作状态`}>{tasks.map(task=>{const status=getTaskStatus(task,workflow);return <button type="button" className="p54-work-row" key={task.id} onClick={()=>openWork(task)} aria-label={`查看${task.title}，${status.label}`}><span className="p54-work-copy"><span className="p54-work-title">{task.title}</span><span className="p54-work-detail">{status.detail}</span></span><StatusPill status={status}/><ArrowRightOutlined className="p54-work-arrow"/></button>;})}</div>
    </details>:<div className="p54-no-work"><StatusPill status={getProjectSummary(project,workflow)}/><span>从下面的对话开始</span></div>}
    <div className="p54-thread"><ChatThread showToolPill={showToolPill} session={session} replyActivity={replyActivities[`project-${project.id}`]} replyIndex={reply?.index} onRegenerate={index=>onRegenerate?.(project.id,index)} onReply={setReply} onOpenWorkbench={onOpenWorkbench} onAnswer={()=>{}} onWithdraw={()=>message.info('项目撤回需先在完整聊天中预览范围')}/></div>
    <Composer inlineReply scope={`project-${project.id}`} value={draft} onChange={onDraft} config={config} onConfig={onConfig} reply={reply} onCancelReply={()=>setReply(null)} onOpenSettings={onOpenSettings} onSend={(text,files)=>{onSend(project.id,text,files,reply);setReply(null);}}/>
   </>:<div className="p54-overview">
    <span className="p54-overview-icon"><FolderOutlined/></span><h2>每项工作，都有进展</h2><p>打开项目，接着聊，也能随时看到工作停在哪一步。</p>
    <div className="p54-overview-cards">{projects.map(p=>{const summary=getProjectSummary(p,workflow);return <Card key={p.id} hoverable variant="borderless"><FolderOutlined/><h3>{p.name}</h3><div className="p54-overview-status"><StatusPill status={summary}/></div><p>{summary.count} 项工作 · {sessions.filter(s=>s.project===p.id).length} 段示例对话</p><Button onClick={()=>selectProject(p.id)}>打开项目</Button></Card>;})}</div>
   </div>}
  </section>
 </div>;
}

