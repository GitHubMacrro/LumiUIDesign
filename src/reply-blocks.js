import {useEffect,useRef,useState} from 'react';

// Local presentation only: reply delivery never changes execution or approval state.
export function useReplyBlocks(append){
 const [activities,setActivities]=useState({});
 const queues=useRef(new Map()),appendRef=useRef(append);
 appendRef.current=append;
 useEffect(()=>()=>{queues.current.forEach(queue=>clearTimeout(queue.timer));queues.current.clear();},[]);
 function publish(scope,queue){
  const job=queue.jobs[0];
  setActivities(old=>({...old,[scope]:job?{label:job.index===0?'正在整理回复':'继续整理下一条',queued:queue.jobs.length-1}:null}));
 }
 function schedule(scope,queue){
  const job=queue.jobs[0];
  if(!job){queues.current.delete(scope);publish(scope,queue);return;}
  publish(scope,queue);
  queue.timer=setTimeout(()=>{
   if(queues.current.get(scope)!==queue||queue.jobs[0]!==job)return;
   appendRef.current(scope,job.anchor,{...job.blocks[job.index],id:`${job.id}-${job.index}`,replyRunId:job.id,role:'assistant',time:new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date()),arrived:true});
   job.index+=1;
   if(job.index===job.blocks.length)queue.jobs.shift();
   schedule(scope,queue);
  },job.index===0?700:1900);
 }
 function enqueue(scope,anchor,blocks){
  let queue=queues.current.get(scope);
  const start=!queue;
  if(!queue){queue={jobs:[],timer:null};queues.current.set(scope,queue);}
  queue.jobs.push({id:`reply-${anchor}`,anchor,blocks,index:0});
  if(start)schedule(scope,queue);else publish(scope,queue);
 }
 function cancelAnchors(scope,anchors){
  const queue=queues.current.get(scope);if(!queue)return;
  clearTimeout(queue.timer);
  queue.jobs=queue.jobs.filter(job=>!anchors.includes(job.anchor));
  schedule(scope,queue);
 }
 return {activities,enqueue,cancelAnchors};
}
