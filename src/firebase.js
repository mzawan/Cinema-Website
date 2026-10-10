import {initializeApp} from 'firebase/app';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut,sendPasswordResetEmail} from 'firebase/auth';
import {getFirestore,collection,addDoc,getDocs,deleteDoc,doc,getDoc,setDoc,query,where} from 'firebase/firestore';
const e=import.meta.env;
const cfg={apiKey:e.VITE_FB_API_KEY,authDomain:e.VITE_FB_AUTH_DOMAIN,projectId:e.VITE_FB_PROJECT_ID,appId:e.VITE_FB_APP_ID};
export const LIVE=!!cfg.apiKey;
const app=LIVE?initializeApp(cfg):null,auth=LIVE?getAuth(app):null,fs=LIVE?getFirestore(app):null;
const LS=(k,v)=>v===undefined?JSON.parse(localStorage.getItem('cx_'+k)||'[]'):localStorage.setItem('cx_'+k,JSON.stringify(v));
export const getUser=()=>JSON.parse(localStorage.getItem('cx_user')||'null');
export const setUser=u=>u?localStorage.setItem('cx_user',JSON.stringify(u)):localStorage.removeItem('cx_user');
const local=u=>!LIVE||u?.demo;
/* data (Firestore, or localStorage for demo / no-keys mode) */
export async function list(u,c,own){
  if(local(u))return LS(c).filter(x=>!own||x.uid===u.uid);
  const q=own?query(collection(fs,c),where('uid','==',u.uid)):collection(fs,c);
  return(await getDocs(q)).docs.map(d=>({id:d.id,...d.data()}));
}
export async function add(u,c,o){
  o.ts=Date.now();
  if(local(u)){o.id='l'+o.ts;LS(c,[...LS(c),o]);return o}
  return{...o,id:(await addDoc(collection(fs,c),o)).id};
}
export async function del(u,c,id){
  if(local(u))return LS(c,LS(c).filter(x=>x.id!==id));
  await deleteDoc(doc(fs,c,id));
}
export async function getP(u){
  if(local(u))return JSON.parse(localStorage.getItem('cx_p_'+u.uid)||'{}');
  const s=await getDoc(doc(fs,'profiles',u.uid));return s.exists()?s.data():{};
}
export async function setP(u,o){
  if(local(u))return localStorage.setItem('cx_p_'+u.uid,JSON.stringify({...JSON.parse(localStorage.getItem('cx_p_'+u.uid)||'{}'),...o}));
  await setDoc(doc(fs,'profiles',u.uid),o,{merge:true});
}
/* auth */
export async function signup(name,email,pw){
  let u;
  if(LIVE){const r=await createUserWithEmailAndPassword(auth,email,pw);await updateProfile(r.user,{displayName:name});u={uid:r.user.uid,name,email};await setP(u,{name,email})}
  else{const us=LS('users');if(us.find(x=>x.email===email))throw Error('Email already registered');u={uid:'u'+Date.now(),name,email};LS('users',[...us,{...u,pw}])}
  setUser(u);return u;
}
export async function login(email,pw){
  let u;
  if(LIVE){const r=await signInWithEmailAndPassword(auth,email,pw);u={uid:r.user.uid,name:r.user.displayName||email.split('@')[0],email}}
  else{const f=LS('users').find(x=>x.email===email&&x.pw===pw);if(!f)throw Error('Wrong email or password');u={uid:f.uid,name:f.name,email}}
  setUser(u);return u;
}
export const demo=()=>{const u={uid:'demo',name:'Demo Guest',email:'demo@cinemix.app',demo:true};setUser(u);return u};
export async function reset(email){if(!LIVE)throw Error('Password reset needs Firebase keys');await sendPasswordResetEmail(auth,email)}
export async function logout(u){if(LIVE&&!u.demo)await signOut(auth);setUser(null)}
