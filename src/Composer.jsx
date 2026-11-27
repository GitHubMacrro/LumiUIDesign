import React,{useEffect,useRef,useState,useSyncExternalStore} from 'react';
import {createPortal} from 'react-dom';
import {Alert,App,Button,Dropdown,Input,InputNumber,Popover,Radio,Select,Slider,Tag,Tooltip,Progress,Descriptions} from 'antd';
import {ArrowUpOutlined,AudioOutlined,PlusOutlined,RobotOutlined,SafetyOutlined,ThunderboltOutlined,FileOutlined,CloseOutlined,LinkOutlined,FolderOutlined,InfoCircleOutlined} from '@ant-design/icons';
import {getSettingsSnapshot,subscribeSettings,isModelAvailable} from './Settings';

const policies={ask:'请求批准',assistant:'助手自动批准',full:'完全批准'};
const emptyAttachments=[];
const attachmentDrafts=new Map(),attachmentListeners=new Set();
const subscribeAttachments=listener=>{attachmentListeners.add(listener);return()=>attachmentListeners.delete(listener);};
// Page-local drafts survive switching between the home, conversation and project views.
function useAttachmentDraft(scope){
 const files=useSyncExternalStore(subscribeAttachments,()=>attachmentDrafts.get(scope)||emptyAttachments);
 const update=next=>{
  const result=typeof next==='function'?next(attachmentDrafts.get(scope)||emptyAttachments):next;
  if(result.length)attachmentDrafts.set(scope,result);else attachmentDrafts.delete(scope);
  attachmentListeners.forEach(listener=>listener());
 };
 return [files,update];
}

function ComposerControlsIcon(){return <svg className="c54-controls-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8.5h8.4M18.2 8.5H20M4 15.5h3.6M13.4 15.5H20"/><circle cx="15.4" cy="8.5" r="2.1"/><circle cx="10.6" cy="15.5" r="2.1"/></svg>;}

export default function Composer({scope='chat',home=false,inlineReply=false,value,onChange,onSend,reply,onCancelReply,config,onConfig,onOpenSettings}){
 const {message}=App.useApp();
 const settings=useSyncExternalStore(subscribeSettings,getSettingsSnapshot);
 const [expanded,setExpanded]=useState(false),[attachments,setAttachments]=useAttachmentDraft(scope);
 const [popover,setPopover]=useState(null),[selectOpen,setSelectOpen]=useState(null),[attachmentOpen,setAttachmentOpen]=useState(false);
 const [strategy,setStrategy]=useState(config.approval||'ask');
 const [budgetDraft,setBudgetDraft]=useState(/^\d+$/.test(config.reasoning||'')?Number(config.reasoning):null);
 const input=useRef(null),toggle=useRef(null),tools=useRef(null),agentSelect=useRef(null);
 const popTriggers=useRef({}),popPanels=useRef({}),openPopoverKey=useRef(null);
 const agent=settings.agents.find(a=>a.id===config.agent);
 const agentValid=config.agent==='lumi'||!!(agent?.enabled&&agent.status==='connected');
 const nativeModel=!!agent&&agent.modelOwner==='Agent 原生管理';
 const model=settings.models.find(m=>m.id===config.model),reasoning=model?.reasoning;
 const modelValid=!!model&&isModelAvailable(model,settings);
 const valid=agentValid&&(nativeModel||modelValid);
 const budget=reasoning?.budget,customBudget=/^\d+$/.test(config.reasoning||'');
 const budgetValue=customBudget?Number(config.reasoning):budget?.initial;
 const budgetKnown=Number.isFinite(budget?.min)&&Number.isFinite(budget?.max)&&budget.min<budget.max;
 const budgetInvalid=!nativeModel&&reasoning?.kind==='budget'&&customBudget&&(!Number.isInteger(budgetDraft)||budgetDraft<budget?.min||budgetDraft>budget?.max);
 useEffect(()=>{setBudgetDraft(/^\d+$/.test(config.reasoning||'')?Number(config.reasoning):null);},[config.reasoning,config.model,scope]);

 function closePopover(restoreFocus=false){
  const key=openPopoverKey.current;
  openPopoverKey.current=null;setPopover(null);
  if(restoreFocus&&key)popTriggers.current[key]?.focus({preventScroll:true});
 }
 function closeOverlays(){closePopover();setSelectOpen(null);setAttachmentOpen(false);}
 useEffect(()=>{setExpanded(false);closeOverlays();},[scope,home]);
 useEffect(()=>{if(!expanded){closePopover();setSelectOpen(null);}if(tools.current)tools.current.inert=!expanded;},[expanded]);
 useEffect(()=>{if(reply){if(!inlineReply)setExpanded(false);closeOverlays();input.current?.focus({preventScroll:true});}},[reply,inlineReply]);
 useEffect(()=>{
  if(!reply||inlineReply)return;
  const behind=[...document.querySelectorAll('.ref54-context,.l54-skip,.l54-header,.l54-chat-header,.c54-thread,.l54-work-rail,.v54-workbench-drawer,.v54-notification-drawer')].map(node=>[node,node.inert]);
  behind.forEach(([node])=>{node.inert=true;});
  return()=>behind.forEach(([node,wasInert])=>{node.inert=wasInert;});
 },[!!reply,inlineReply]);
 useEffect(()=>{
  if(!reply)return;
  const escapeReply=event=>{
   if(event.key!=='Escape'||event.defaultPrevented||popover||selectOpen||attachmentOpen)return;
   if(event.target instanceof Element&&event.target.closest('.ant-modal-wrap,.ant-image-preview'))return;
   event.preventDefault();onCancelReply?.();input.current?.focus({preventScroll:true});
  };
  document.addEventListener('keydown',escapeReply);
  return()=>document.removeEventListener('keydown',escapeReply);
 },[reply,popover,selectOpen,attachmentOpen,onCancelReply]);
 useEffect(()=>{
  if(!popover)return;
  const escape=event=>{if(event.target instanceof Element&&event.target.closest('.ant-modal-wrap,.ant-image-preview'))return;if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closePopover(true);}};
  document.addEventListener('keydown',escape,true);
  return()=>document.removeEventListener('keydown',escape,true);
 },[popover]);
 useEffect(()=>{if(nativeModel&&popover==='reason')closePopover();},[nativeModel,popover]);

 function send(){
  if(!value.trim()&&!attachments.length)return;
  if(budgetInvalid){message.warning('请先填写来源范围内的整数 Token 预算，或切回来源默认。');return;}
  if(!agentValid){message.warning('当前助手已停用或离线，请选择可用助手。');return;}
  if(!nativeModel&&!modelValid){message.warning('当前模型不可用，请选择就绪的来源。');return;}
  onSend(value.trim()||'请查看这些附件。',[...attachments]);
  setAttachments([]);closeOverlays();
 }
 const setPop=key=>open=>{
  if(open){setSelectOpen(null);setAttachmentOpen(false);if(key==='approval')setStrategy(config.approval||'ask');openPopoverKey.current=key;setPopover(key);}
  else if(openPopoverKey.current===key)closePopover();
 };
 const afterPop=key=>open=>{
  if(!open||openPopoverKey.current!==key)return;
  const active=document.activeElement,trigger=popTriggers.current[key];
  if(active===document.body||active===trigger||trigger?.contains(active))popPanels.current[key]?.focus({preventScroll:true});
 };
 const panelProps=(key,label)=>({
  id:`${scope}-${key}-dialog`,className:'c54-pop-content',role:'dialog','aria-label':label,'aria-modal':false,tabIndex:-1,
  ref:node=>{popPanels.current[key]=node;},
  onBlur:event=>{const next=event.relatedTarget;if(next&&!event.currentTarget.contains(next)&&!popTriggers.current[key]?.contains(next))closePopover();}
 });
 const triggerProps=key=>({
  ref:node=>{popTriggers.current[key]=node;},'aria-haspopup':'dialog','aria-expanded':popover===key,
  'aria-controls':popover===key?`${scope}-${key}-dialog`:undefined
 });
 const selectProps=key=>({
  open:expanded&&selectOpen===key,
  onOpenChange:open=>{if(open){closePopover();setAttachmentOpen(false);setSelectOpen(key);}else setSelectOpen(current=>current===key?null:current);}
 });
 function openSettings(section){closeOverlays();onOpenSettings(section);}
 function toggleSettings(){
  if(expanded){closeOverlays();toggle.current?.focus({preventScroll:true});}
  setExpanded(current=>!current);
 }
 function recoverSelection(){
  if(home){openSettings(!agentValid?'agents':'models');return;}
  setExpanded(true);setSelectOpen(!agentValid?'agent':'model');
  requestAnimationFrame(()=>{if(!agentValid)agentSelect.current?.focus();});
 }
 const providerName=id=>settings.providers.find(p=>p.id===id)?.name||'未知来源';
 const models=settings.models.filter(m=>m.capabilities.includes('text')).map(m=>({value:m.id,label:`${m.name} · ${providerName(m.provider)}${!isModelAvailable(m,settings)?' · 不可用':''}`,name:m.name,source:providerName(m.provider),modelId:m.modelId,disabled:!isModelAvailable(m,settings)}));
 const agentOptions=[{value:'lumi',label:'Lumi · 核心助手'},...settings.agents.map(a=>({value:a.id,label:`${a.name} · ${!a.enabled?'已停用':a.status==='connected'?'已连接':'离线'}`,disabled:!a.enabled||a.status!=='connected'}))];
 const selectedAgent=agentOptions.find(a=>a.value===config.agent);
 const reasoningContent=<div {...panelProps('reason','推理强度')}>
  <div className="c54-pop-heading"><strong>{reasoning?.kind==='budget'?'推理预算':'推理设置'}</strong><Tag>{customBudget?`${Number(config.reasoning).toLocaleString()} Token`:config.reasoning||'来源默认'}</Tag></div>
  <p>{model?.name} · {reasoning?.label}</p>
  {reasoning?.kind==='levels'?<>
   <Slider ariaLabelForHandle="推理档位" ariaValueTextFormatterForHandle={index=>index===0?'来源默认':reasoning.options[index-1]} min={0} max={reasoning.options.length} step={1} value={Math.max(0,reasoning.options.indexOf(config.reasoning)+1)} disabled={!modelValid} onChange={index=>onConfig({reasoning:index===0?'来源默认':reasoning.options[index-1]})} marks={Object.fromEntries(['默认',...reasoning.options].map((option,index)=>[index,option]))} tooltip={{formatter:index=>index===0?'来源默认':reasoning.options[index-1]}}/>
   <Button size="small" onClick={()=>onConfig({reasoning:'来源默认'})}>使用来源默认</Button>
  </>:reasoning?.kind==='budget'&&budgetKnown?<>
   <Radio.Group size="small" optionType="button" aria-label="推理预算方式" value={customBudget?'custom':'default'} onChange={event=>onConfig({reasoning:event.target.value==='default'?'来源默认':String(budget.initial)})} options={[{value:'default',label:'来源默认'},{value:'custom',label:'自定预算'}]}/>
   <div className="c54-budget-caption"><span>{customBudget?'当前预算':'未指定预算'}</span><strong>{customBudget?`${budgetValue.toLocaleString()} Token`:'使用来源默认'}</strong></div>
   <Slider ariaLabelForHandle="推理 Token 预算滑杆" ariaValueTextFormatterForHandle={n=>`${n.toLocaleString()} Token`} min={budget.min} max={budget.max} step={budget.step||1} value={budgetValue} disabled={!modelValid||!customBudget} onChange={n=>onConfig({reasoning:String(n)})} marks={{[budget.min]:`${budget.min} Token`,[budget.max]:`${(budget.max/1000).toLocaleString()}k Token`}} tooltip={{formatter:n=>`${n.toLocaleString()} Token`}}/>
   <label htmlFor={`${scope}-budget`}>精确预算 · Token</label>
   <InputNumber id={`${scope}-budget`} aria-label="推理 Token 精确预算" aria-invalid={budgetInvalid||undefined} aria-describedby={budgetInvalid?`${scope}-budget-error`:undefined} step={budget.step||1} changeOnBlur={false} status={budgetInvalid?'error':undefined} disabled={!modelValid||!customBudget} placeholder="来源默认" value={customBudget?budgetDraft:null} onInput={raw=>setBudgetDraft(/^\d+$/.test(raw)?Number(raw):raw)} onChange={n=>{setBudgetDraft(n);if(Number.isInteger(n)&&n>=budget.min&&n<=budget.max)onConfig({reasoning:String(n)});}}/>
   {budgetInvalid&&<small id={`${scope}-budget-error`} role="alert">请输入 {budget.min.toLocaleString()}–{budget.max.toLocaleString()} 之间的整数。尚未应用此编辑。</small>}
   <p className="c54-budget-evidence">{budget.evidence}</p>
  </>:reasoning?.kind==='budget'?<p>来源未报告可调范围，暂保留来源默认。</p>
  :<p>{reasoning?.kind==='fixed'?'固定推理，来源未提供档位。':reasoning?.kind==='none'?'此模型不支持调整推理。':'来源没有报告档位，保留来源默认。'}</p>}
  <small>仅影响后续消息，不改变最大输出预算。</small>
 </div>;
 const approvalContent=<div {...panelProps('approval','批准策略')}>
  <strong>批准策略</strong><p>当前会话 · 模拟偏好</p>
  <Radio.Group aria-label="批准策略" value={strategy} onChange={event=>setStrategy(event.target.value)} className="c54-strategies">
   {[['ask','未授权动作先交给你决定'],['assistant','助手核对已有授权；不匹配时请求'],['full','在明确的本次范围内选择批准偏好']].map(([key,desc])=><Radio value={key} key={key}><b>{policies[key]}</b><small>{desc}</small></Radio>)}
  </Radio.Group>
  {strategy!=='ask'&&<div className="c54-scope"><strong>已有授权范围</strong><p>执行者：{selectedAgent?.label||'待核对'}</p><p>动作、对象与有效期仍按原授权；未授予项仍需核对。</p></div>}
  <Button type="primary" block onClick={()=>{onConfig({approval:strategy});closePopover(true);message.success('已保存当前会话的模拟偏好；未新增授权');}}>应用偏好</Button>
  <Button block type="text" onClick={()=>openSettings('permissions')}>详细权限</Button>
 </div>;
 const contextContent=<div {...panelProps('context','当前上下文')}>
  <strong>当前上下文</strong><Progress percent={62} strokeColor="var(--accent)"/>
  <Descriptions column={1} size="small" items={[{key:'source',label:'来源',children:'对话、项目与已分配资料'},{key:'estimate',label:'占用',children:'示例估算，不是实际计费'}]}/>
  <Button onClick={()=>openSettings('memory')}>查看记忆与上下文</Button>
 </div>;

 return <>{!inlineReply&&createPortal(<div className="c54-reply-veil" data-active={!!reply} aria-hidden="true" onClick={()=>{onCancelReply?.();input.current?.focus({preventScroll:true});}}/>,document.body)}<div className={`c54-wrap ${home?'is-home':''} ${reply&&!inlineReply?'is-replying':''}`}>
  {reply&&!inlineReply&&<div className="c54-reply-ghost" role="region" aria-label="正在回复这条消息"><div className="c54-reply-bubble"><div className="c54-reply-heading"><span><LinkOutlined/> 回复这条消息</span><Button type="text" size="small" icon={<CloseOutlined/>} aria-label="取消引用" onClick={onCancelReply}/></div><p>{reply.full||reply.text}</p></div></div>}
  <div className={`c54-composer ${expanded?'is-expanded':''}`}>
  {reply&&inlineReply&&<div className="c54-reply" aria-live="polite"><span><LinkOutlined/><b>引用消息</b><span>{reply.text}</span></span><Button type="text" size="small" icon={<CloseOutlined/>} aria-label="取消引用" onClick={onCancelReply}/></div>}
  {!!attachments.length&&<div className="c54-attachments">{attachments.map(file=><Tag key={file} closeIcon onClose={()=>setAttachments(current=>current.filter(item=>item!==file))}><FileOutlined/> {file} · 示例</Tag>)}</div>}
  {!valid&&<Alert type="warning" showIcon title={!agentValid?'当前助手不可用':'当前模型不可用'} action={<Button size="small" type="text" onClick={recoverSelection}>{home?'检查配置':!agentValid?'更换助手':'更换模型'}</Button>}/>}
  <div className="c54-input-line">
   <Dropdown trigger={['click']} open={attachmentOpen} onOpenChange={open=>{if(open){closePopover();setSelectOpen(null);}setAttachmentOpen(open);}} menu={{items:[{key:'notes.md',icon:<FileOutlined/>,label:'添加示例文档'},{key:'screen.png',icon:<FileOutlined/>,label:'添加示例截图'},{key:'project',icon:<FolderOutlined/>,label:'引用当前项目'}],onClick:({key})=>{setAttachments(current=>current.includes(key)?current:[...current,key]);setAttachmentOpen(false);input.current?.focus();}}}>
    <Button type="text" icon={<PlusOutlined/>} aria-label="添加附件或上下文" className="c54-add"/>
   </Dropdown>
   <Input.TextArea ref={input} id={`${scope}-input`} aria-label={home?'让 Lumi 做点什么':'输入消息'} placeholder={reply?'回复消息':home?'有什么想法，交给 Lumi…':'继续这段对话…'} value={value} onChange={event=>onChange(event.target.value)} variant="borderless" autoSize={{minRows:1,maxRows:6}} onKeyDown={event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.nativeEvent.isComposing&&event.nativeEvent.keyCode!==229){event.preventDefault();send();}}}/>
  </div>
  <div className="c54-reveal" data-open={expanded} aria-hidden={!expanded} ref={tools}><div className="c54-clip"><div className="c54-tools" id={`${scope}-tools`}>
   <div className="c54-selects">
   <Select {...selectProps('mode')} aria-label="工作模式" value={config.mode} onChange={mode=>{onConfig({mode});setSelectOpen(null);}} options={[{value:'plan',label:'Plan · 规划'},{value:'execute',label:'Build · 执行'}]} className="c54-mode" variant="filled"/>
   <Select {...selectProps('agent')} ref={agentSelect} aria-label="执行助手" value={config.agent} onChange={agent=>{onConfig({agent});setSelectOpen(null);}} options={agentOptions} showSearch optionFilterProp="label" prefix={<RobotOutlined/>} variant="borderless" popupMatchSelectWidth={260} className="c54-agent" status={!agentValid?'error':undefined}/>
   {nativeModel?<Tag className="c54-native-model" icon={<RobotOutlined/>}>{agent.model||'由 Agent 管理'} · Agent 模型</Tag>:<Tooltip title={`${model?.name||'未选择模型'} · ${providerName(model?.provider)} · ${model?.modelId||'未报告标识'}`}><Select {...selectProps('model')} aria-label="模型与提供商" value={config.model} onChange={model=>{onConfig({model,reasoning:'来源默认'});setSelectOpen(null);}} options={models} showSearch optionFilterProp="label" variant="borderless" popupMatchSelectWidth={360} className="c54-model" status={!modelValid?'error':undefined} optionRender={({data})=><div className="c54-model-option"><strong>{data.name}</strong><small>{data.source} · {data.disabled?'不可用':'就绪'}<br/>{data.modelId}</small></div>} popupRender={menu=><>{menu}<Button type="text" block onClick={()=>openSettings('models')}>管理模型与来源</Button></>}/></Tooltip>}
   </div>
   <div className="c54-actions">
   {!nativeModel&&<Popover trigger="click" open={expanded&&popover==='reason'} onOpenChange={setPop('reason')} afterOpenChange={afterPop('reason')} content={reasoningContent} placement="top" destroyOnHidden><Button {...triggerProps('reason')} type="text" size="small" icon={<ThunderboltOutlined/>} aria-label="推理设置">{!config.reasoning||config.reasoning==='来源默认'?'推理':customBudget?`${Number(config.reasoning).toLocaleString()} Token`:config.reasoning}</Button></Popover>}
   <Popover trigger="click" open={expanded&&popover==='approval'} onOpenChange={setPop('approval')} afterOpenChange={afterPop('approval')} content={approvalContent} placement="top" destroyOnHidden><Button {...triggerProps('approval')} type="text" size="small" icon={<SafetyOutlined/>}>{policies[config.approval||'ask']}</Button></Popover>
   <Popover trigger="click" open={expanded&&popover==='context'} onOpenChange={setPop('context')} afterOpenChange={afterPop('context')} content={contextContent} placement="top" destroyOnHidden><Button {...triggerProps('context')} type="text" size="small" icon={<InfoCircleOutlined/>} aria-label="上下文占用" className="c54-context">62%</Button></Popover>
   </div>
  </div></div></div>
  <div className="c54-end">
   {!home&&<Tooltip title={expanded?'收起会话选项':'展开会话选项'}><Button ref={toggle} type="text" icon={<ComposerControlsIcon/>} aria-label={expanded?'收起会话选项':'展开会话选项'} aria-expanded={expanded} aria-controls={`${scope}-tools`} className={expanded?'is-active':''} onClick={toggleSettings}/></Tooltip>}
   <Tooltip title="语音输入"><Button type="text" icon={<AudioOutlined/>} aria-label="语音输入" onClick={()=>message.info('语音输入为演示入口，未开启麦克风')}/></Tooltip>
   <Tooltip title="发送 · Enter"><Button type="primary" icon={<ArrowUpOutlined/>} aria-label="发送消息" disabled={(!value.trim()&&!attachments.length)||!valid||budgetInvalid} onClick={send}/></Tooltip>
  </div>
 </div><div className={`c54-foot ${!home?'is-chat':''}`}>{home&&<span>让想法继续，剩下的交给协作。</span>}<span>本地模拟{!home&&' · 1,263 tokens（示例）'}</span></div></div></>;
}
