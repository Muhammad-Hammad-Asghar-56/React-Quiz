// Import the functions you need from the SDKs you need
import {app} from "../Firebase/FirebaseAppConfig"
import { getAuth, GoogleAuthProvider,GithubAuthProvider, signInWithRedirect,signInWithPopup } from "firebase/auth";

//              Authentication
const auth=getAuth(app)


const Googleprovider = new GoogleAuthProvider();
export const signWithGoogle=async ()=>{
  const res = await signInWithPopup(auth, Googleprovider)
  const name = res.user.displayName;
  const email=res.user.email
  
  localStorage.setItem("FirebaseApplication",{"userName":name,"userEmail":email})
  return {name,email}
}


const Githubprovider = new GithubAuthProvider();
export const signWithGithub=async ()=>{
  const res=await signInWithRedirect(auth, Githubprovider)
  const name = res.user.displaName;
  const email=res.user.email;
  
  localStorage.setItem("FirebaseApplication",{"userName":name,"userEmail":email})
  return {name,email}
}


