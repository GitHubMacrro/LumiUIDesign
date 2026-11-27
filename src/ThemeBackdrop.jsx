import React,{useEffect,useState} from 'react';

/** A sibling behind the app; no stacking context is added to the reply composer's ancestors. */
export default function ThemeBackdrop({running}){
  const [visible,setVisible]=useState(()=>!document.hidden);
  useEffect(()=>{
    const update=()=>setVisible(!document.hidden);
    document.addEventListener('visibilitychange',update);
    return()=>document.removeEventListener('visibilitychange',update);
  },[]);
  return <div className="l54-theme-backdrop" aria-hidden="true" data-running={running&&visible?'true':'false'}><i/><i/></div>;
}
