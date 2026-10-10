import {useState,useEffect} from 'react';
import * as S from './firebase';
import {M,CATS,BR,OF,SEEDS} from './data';
const stars=n=>'★'.repeat(n)+'☆'.repeat(5-n);
const TREND=[1,2,3,4,7,9];
const today=()=>new Date().toISOString().slice(0,10);
const Modal=({onClose,children})=><div className="ov" onClick={e=>e.target===e.currentTarget&&onClose()}><div className="box md" role="dialog">{children}</div></div>;
const Head=({t,onClose,l='Close'})=><div className="row"><h2>{t}</h2><button className="btn ghost" onClick={onClose}>{l}</button></div>;
const Rad=({n,a,dr,setDr})=>a.map(v=><label key={v}><input type="radio" name={n} checked={dr[n]===v} onChange={()=>setDr({...dr,[n]:v})}/>{v}</label>);

function Auth({onUser}){
  const [mode,setMode]=useState('login'),[f,setF]=useState({n:'',e:'',p:''}),[er,setEr]=useState('');
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const go=async()=>{try{
    if(!/^\S+@\S+\.\S+$/.test(f.e))throw Error('Enter a valid email');
    if(f.p.length<6)throw Error('Password needs 6+ characters');
    if(mode==='signup'){if(!f.n.trim())throw Error('Enter your name');onUser(await S.signup(f.n.trim(),f.e,f.p))}
    else onUser(await S.login(f.e,f.p));
  }catch(x){setEr(x.message.replace('Firebase: ',''))}};
  const fg=async ev=>{ev.preventDefault();try{await S.reset(f.e);setEr('Reset email sent. Check your inbox.')}catch(x){setEr(x.message)}};
  return <div id="auth"><div className="box" style={{width:'min(400px,100%)'}}>
    <h1 style={{fontSize:34}}>Cinemix</h1><p className="mut">Book seats, read reviews, and save your picks.</p>
    <div className="tabs"><button className={'btn'+(mode==='login'?'':' ghost')} onClick={()=>setMode('login')}>Log in</button><button className={'btn'+(mode==='signup'?'':' ghost')} onClick={()=>setMode('signup')}>Sign up</button></div>
    {mode==='signup'&&<><label>Full name</label><input value={f.n} onChange={set('n')} autoComplete="name"/></>}
    <label>Email</label><input type="email" value={f.e} onChange={set('e')} autoComplete="email"/>
    <label>Password (6+ characters)</label><input type="password" value={f.p} onChange={set('p')} autoComplete="current-password" onKeyDown={e=>e.key==='Enter'&&go()}/>
    <p style={{color:'#ff7b6b',minHeight:22,margin:'6px 0'}}>{er}</p>
    <button className="btn" style={{width:'100%'}} onClick={go}>{mode==='login'?'Log in':'Create account'}</button>
    <p className="row" style={{margin:'10px 0 0'}}><a href="#" onClick={fg} style={{color:'var(--gold)'}}>Forgot password?</a><button className="btn ghost" onClick={()=>onUser(S.demo())}>Try demo</button></p>
    {!S.LIVE&&<p className="mut" style={{fontSize:14}}>Firebase keys not added: accounts are stored in this browser only.</p>}
  </div></div>;
}

function Detail({m,close,go}){
  return <Modal onClose={close}><Head t={m.t} onClose={close} l="Back"/><p>{m.d}</p>
    {m.date&&<p><b>Date:</b> {m.date}<br/><b>Day:</b> {m.day}<br/><b>Showtime:</b> {m.show}</p>}
    <p className="mut">{m.g.join(', ')} · {m.l}</p>
    <button className="btn" onClick={()=>go({k:'book',id:m.id})}>Buy Ticket</button>{' '}
    <button className="btn ghost" onClick={()=>open('https://www.youtube.com/results?search_query='+encodeURIComponent(m.yt),'_blank')}>Play Trailer</button>{' '}
    <button className="btn ghost" onClick={()=>go({k:'reviews',title:m.t})}>Reviews</button></Modal>;
}

function Book({m,user,close,toast}){
  const times=m.tm==='Morning'?['10:00 AM','12:00 PM']:['06:00 PM','09:00 PM'];
  const [br,setBr]=useState(BR[0].n),[dt,setDt]=useState(today()),[sh,setSh]=useState(times[0]),[n,setN]=useState(1),[code,setCode]=useState(''),[off,setOff]=useState(null),[msg,setMsg]=useState('No offer applied');
  const seats=Math.max(1,Math.min(10,+n||1)),sub=seats*m.p,disc=off&&seats>=off.min?sub*off.p/100:0,total=+(sub-disc).toFixed(2);
  const apply=()=>{const o=OF.find(f=>f.c===code.trim().toUpperCase())||null;setOff(o);setMsg(o?o.t+(seats>=o.min?'':` (needs ${o.min}+ seats)`):'Invalid code')};
  const ok=async()=>{
    if(!dt||dt<today())return toast('Choose a valid date');
    await S.add(user,'bookings',{uid:user.uid,movie:m.t,branch:br,date:dt,show:sh,seats,total,code:disc?off.c:''});
    close();toast('Booked! See it under Ticket');
  };
  return <Modal onClose={close}><Head t={'Book: '+m.t} onClose={close}/>
    <label>Branch</label><select value={br} onChange={e=>setBr(e.target.value)}>{BR.map(b=><option key={b.n}>{b.n}</option>)}</select>
    <label>Date</label><input type="date" min={today()} value={dt} onChange={e=>setDt(e.target.value)}/>
    <label>Showtime ({m.tm})</label><select value={sh} onChange={e=>setSh(e.target.value)}>{times.map(t=><option key={t}>{t}</option>)}</select>
    <label>Seats (1 to 10)</label><input type="number" min="1" max="10" value={n} onChange={e=>setN(e.target.value)}/>
    <label>Offer code</label><div className="row"><input value={code} onChange={e=>setCode(e.target.value)} placeholder="e.g. CINE10"/><button className="btn ghost" onClick={apply}>Apply</button></div>
    <p className="row"><span className="mut">{msg}</span><span className="price">Total: ${total.toFixed(2)}</span></p>
    <button className="btn" style={{width:'100%'}} onClick={ok}>Confirm booking</button></Modal>;
}

function Tickets({user,close,toast}){
  const [a,setA]=useState(null),[k,setK]=useState(0);
  useEffect(()=>{S.list(user,'bookings',true).then(r=>setA(r.sort((x,y)=>y.ts-x.ts)))},[k]);
  return <Modal onClose={close}><Head t="My Tickets" onClose={close}/>
    {a===null?<p className="mut">Loading…</p>:a.length?a.map(b=><div className="item" key={b.id}><b>{b.movie}</b> · {b.seats} seat(s) · ${b.total}{b.code&&` (${b.code})`}<br/><span className="mut">{b.branch} · {b.date} · {b.show}</span><br/>
      <button className="btn ghost" onClick={async()=>{await S.del(user,'bookings',b.id);toast('Booking cancelled');setK(k+1)}}>Cancel booking</button></div>)
      :<p className="mut">No bookings yet. Pick a movie and press Buy Tickets.</p>}</Modal>;
}

const Branches=({close})=><Modal onClose={close}><Head t="Branches" onClose={close}/>{BR.map(b=><div className="item" key={b.n}><b>{b.n}</b><br/><span className="mut">{b.a} · {b.h}</span><br/>
  <a style={{color:'var(--gold)'}} href={'https://www.google.com/maps/search/'+encodeURIComponent(b.n+' '+b.a)} target="_blank" rel="noopener noreferrer">Open map</a> · <a style={{color:'var(--gold)'}} href={'tel:'+b.ph.replace(/\s/g,'')}>{b.ph}</a></div>)}</Modal>;
const Offers=({close,toast})=><Modal onClose={close}><Head t="Offers" onClose={close}/>{OF.map(f=><div className="item row" key={f.c}><span><b>{f.c}</b><br/><span className="mut">{f.t}</span></span>
  <button className="btn" onClick={()=>{navigator.clipboard?.writeText(f.c);toast('Copied '+f.c)}}>Copy code</button></div>)}</Modal>;

function Reviews({user,title,close,toast}){
  const [a,setA]=useState(null),[k,setK]=useState(0),[form,setForm]=useState(false),[r,setR]=useState(5),[tx,setTx]=useState('');
  useEffect(()=>{S.list(user,'reviews').then(x=>{let l=[...x,...SEEDS].sort((p,q)=>(q.ts||0)-(p.ts||0));if(title)l=l.filter(v=>!v.movie||v.movie===title);setA(l)})},[k]);
  const save=async()=>{if(tx.trim().length<5)return toast('Write at least 5 characters');await S.add(user,'reviews',{uid:user.uid,name:user.name,text:tx.trim(),r:+r,movie:title||''});toast('Review posted');setTx('');setForm(false);setK(k+1)};
  return <Modal onClose={close}><h2>Customer Reviews{title&&': '+title}</h2>
    {a===null?<p className="mut">Loading…</p>:a.map((v,i)=><div className="item" key={v.id||i}><b style={{color:'var(--gold)'}}>{v.name}</b> <span className="mut">{stars(v.r||5)}{v.movie&&' · '+v.movie}</span><br/>{v.text}
      {v.uid===user.uid&&<a style={{cursor:'pointer',color:'#ff7b6b',marginLeft:8}} onClick={async()=>{await S.del(user,'reviews',v.id);setK(k+1)}}>Delete</a>}</div>)}
    {form&&<><label>Rating</label><select value={r} onChange={e=>setR(e.target.value)}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{stars(n)}</option>)}</select>
      <label>Your review</label><textarea rows="3" maxLength="300" value={tx} onChange={e=>setTx(e.target.value)}/><button className="btn" style={{width:'100%',marginTop:8}} onClick={save}>Post review</button></>}
    {!form&&<button className="btn" style={{width:'100%',marginTop:10}} onClick={()=>setForm(true)}>Add Review</button>}
    <button className="btn" style={{width:'100%',marginTop:8}} onClick={close}>Close Reviews</button></Modal>;
}

function Profile({user,setUser,fav,close,toast,go,onLang,onLogout}){
  const [p,setP]=useState(null),[nb,setNb]=useState(0);
  useEffect(()=>{S.getP(user).then(setP);S.list(user,'bookings',true).then(b=>setNb(b.length))},[]);
  if(!p)return <Modal onClose={close}><p className="mut">Loading…</p></Modal>;
  const set=k=>e=>setP({...p,[k]:e.target.value});
  const save=async()=>{const name=(p.name||'').trim()||user.name;await S.setP(user,{name,phone:p.phone||'',lang:p.lang||''});const u={...user,name};S.setUser(u);setUser(u);onLang(p.lang||'');close();toast('Profile saved')};
  return <Modal onClose={close}><Head t="Profile" onClose={close}/><p className="mut">{user.email}{user.demo&&' (demo account, saved on this device)'}</p>
    <label>Name</label><input value={p.name||user.name} onChange={set('name')}/><label>Phone</label><input value={p.phone||''} onChange={set('phone')}/>
    <label>Favourite language</label><select value={p.lang||''} onChange={set('lang')}>{['','English','Hindi','Spanish'].map(l=><option key={l}>{l}</option>)}</select>
    <p className="mut">{nb} booking(s) · {fav.length} saved title(s)</p><button className="btn" style={{width:'100%'}} onClick={save}>Save profile</button>
    <div className="row" style={{marginTop:10}}><button className="btn ghost" onClick={()=>go({k:'tickets'})}>My tickets</button><button className="btn ghost" onClick={onLogout}>Log out</button></div></Modal>;
}

export default function App(){
  const [user,setUser]=useState(S.getUser()),[st,setSt]=useState({cat:'',lang:'',time:'',scr:'',q:'',type:''}),[dr,setDr]=useState({cat:'',lang:'',time:'',scr:''});
  const [menu,setMenu]=useState(false),[fo,setFo]=useState(false),[all,setAll]=useState(false),[fav,setFav]=useState([]),[m,setM]=useState(null),[tt,setTt]=useState(''),[light,setLight]=useState(localStorage.getItem('cx_theme')==='light');
  const toast=t=>{setTt(t);clearTimeout(window.__t);window.__t=setTimeout(()=>setTt(''),2400)};
  useEffect(()=>{document.body.classList.toggle('light',light);localStorage.setItem('cx_theme',light?'light':'dark')},[light]);
  useEffect(()=>{if(user)S.getP(user).then(p=>setFav(p.fav||[]))},[user?.uid]);
  const T=<div id="toast" style={{display:tt?'block':'none'}}>{tt}</div>;
  if(!user)return <><Auth onUser={setUser}/>{T}</>;
  const base=M.filter(x=>(!st.scr||x.s===st.scr)&&(!st.cat||x.g.includes(st.cat))&&(!st.lang||x.l===st.lang)&&(!st.time||x.tm===st.time)&&(!st.q||(x.t+x.g.join()).toLowerCase().includes(st.q.toLowerCase()))&&(st.type==='fav'?fav.includes(x.id):!st.type||x.type===st.type));
  const nf=['cat','lang','time','scr'].filter(k=>st[k]).length,active=!!(nf||st.q||st.type),shown=active||all?base:M.filter(x=>TREND.includes(x.id));
  const toggleFav=async id=>{const n=fav.includes(id)?fav.filter(i=>i!==id):[...fav,id];setFav(n);await S.setP(user,{fav:n})};
  const close=()=>setM(null),find=id=>M.find(x=>x.id===id);
  const reset=()=>{setSt({...st,cat:'',lang:'',time:'',scr:'',q:''});setDr({cat:'',lang:'',time:'',scr:''})};
  const tab=k=>{setMenu(false);if(k==='ticket')return setM({k:'tickets'});setSt({cat:'',lang:'',time:'',scr:'',q:'',type:k});setDr({cat:'',lang:'',time:'',scr:''});setAll(false)};
  const logout=async()=>{await S.logout(user);setM(null);setUser(null)};
  const nav=[['','Home'],['movie','Movies'],['series','Series'],['tv','TV Show'],['fav','Saved']];
  return <>
    {!S.LIVE&&<div id="bn">Local mode: add your Firebase keys in .env to sync data online.</div>}
    <nav><b>Cinemix</b>
      <div className={'links'+(menu?' open':'')}>{[['','Home'],['ticket','Ticket'],['movie','Movies'],['series','Series'],['tv','TV Show'],['fav','Favorite']].map(([k,l])=><a key={k} className={(k?st.type===k:!active)?'on':''} onClick={()=>tab(k)}>{l}</a>)}</div><span className="sp"/>
      <button className="ic" title="Switch theme" aria-label="Switch theme" onClick={()=>setLight(!light)}>◐</button>
      <button className="ic" aria-label="Notifications" onClick={async()=>{const b=(await S.list(user,'bookings',true)).length;toast(b?`You have ${b} booking(s). Check Ticket.`:'No new notifications')}}>🔔</button>
      <button className="ic" id="av" aria-label="Profile menu" onClick={()=>setM({k:'profile'})}>{user.name[0].toUpperCase()}</button>
      <button className="ic burger" aria-label="Menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?'✕':'☰'}</button></nav>
    <div className="wrap"><main>
        <div className="bar"><button className="btn ghost fbtn" aria-label="Open filters" aria-expanded={fo} onClick={()=>setFo(!fo)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 5h18l-7 8v6l-4-2v-4z"/></svg>Filters{nf>0&&` (${nf})`}</button>
          <input type="search" placeholder="Search movies, series, genres" value={st.q} onChange={e=>setSt({...st,q:e.target.value})}/></div>
        {fo&&<div className="box fp"><div><h3>Categories</h3><Rad n="cat" a={CATS} dr={dr} setDr={setDr}/></div><div><h3>Language</h3><Rad n="lang" a={['English','Hindi','Spanish']} dr={dr} setDr={setDr}/></div>
          <div><h3>Time of Day</h3><Rad n="time" a={['Morning','Evening']} dr={dr} setDr={setDr}/></div><div><h3>Screen</h3><Rad n="scr" a={['Platinum','Golden','Silver']} dr={dr} setDr={setDr}/></div>
          <div className="act"><button className="btn" onClick={()=>{setSt({...st,...dr});setFo(false)}}>Apply Filters</button><button className="btn ghost" onClick={reset}>Reset</button></div></div>}
        <div className="hero"><span className="pill">Upcoming Movie</span><div><h2>Interstellar</h2><p>Re-released on the big screen. Seats open this weekend.</p></div>
        <div><button className="btn" onClick={()=>{toast('Pick a movie below to book');document.getElementById('gr').scrollIntoView({behavior:'smooth'})}}>Book Now</button>{' '}
        <button className="btn" onClick={()=>open('https://www.youtube.com/results?search_query=Interstellar+trailer','_blank')}>Play Trailer</button></div></div>
        <div className="row sec"><h2>{active?`Results (${shown.length})`:all?'All Movies':'Trending Now'}</h2>{!active&&<button className="btn ghost" onClick={()=>setAll(!all)}>{all?'Show trending':'View all movies'}</button>}</div>
        <div className="grid" id="gr">{shown.length?shown.map(x=><div className="box" key={x.id}>
          <div className="poster" style={{background:x.bg}}>{x.t}{TREND.includes(x.id)&&<span className="pill tb">Trending</span>}<button className="heart" aria-label="Save" onClick={()=>toggleFav(x.id)}>{fav.includes(x.id)?'♥':'♡'}</button></div>
          <h3 style={{color:'var(--tx)'}}>{x.t}</h3><div className="mut">Screen: {x.s} · {x.l} · {x.tm}</div><div className="mut" style={{fontSize:15}}>{x.g.join(', ')}</div>
          <div className="row" style={{marginTop:8}}><span className="price">Price: ${x.p}</span><span><button className="btn ghost" onClick={()=>setM({k:'detail',id:x.id})}>Details</button>{' '}<button className="btn" onClick={()=>setM({k:'book',id:x.id})}>Buy Tickets</button></span></div></div>)
          :<p className="mut">No titles match these filters. Try Reset.</p>}</div></main></div>
    <footer className="box"><div><h4>About Us</h4><p className="mut">Cinemix is your ultimate destination for movie bookings, trailers, and showtimes. Experience the magic of cinema with us!</p></div>
      <div><h4>Quick Links</h4><a onClick={()=>setSt({...st,type:''})}>Home</a><a onClick={()=>setM({k:'branches'})}>Branches</a><a onClick={()=>setM({k:'offers'})}>Offers</a><a onClick={()=>setM({k:'reviews'})}>Reviews</a></div>
      <div><h4>Follow Us</h4>{['Facebook','Twitter','Instagram'].map(s=><a key={s} href={`https://${s.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer">{s}</a>)}</div>
      <p className="mut" style={{gridColumn:'1/-1',margin:0,fontSize:15}}>© 2026 Cinemix. All rights reserved.</p></footer>
    {m?.k==='detail'&&<Detail m={find(m.id)} close={close} go={setM}/>}
    {m?.k==='book'&&<Book m={find(m.id)} user={user} close={close} toast={toast}/>}
    {m?.k==='tickets'&&<Tickets user={user} close={close} toast={toast}/>}
    {m?.k==='branches'&&<Branches close={close}/>}{m?.k==='offers'&&<Offers close={close} toast={toast}/>}
    {m?.k==='reviews'&&<Reviews user={user} title={m.title} close={close} toast={toast}/>}
    {m?.k==='profile'&&<Profile user={user} setUser={setUser} fav={fav} close={close} toast={toast} go={setM} onLang={l=>{setSt({...st,lang:l});setDr({...dr,lang:l})}} onLogout={logout}/>}
    {T}</>;
}
