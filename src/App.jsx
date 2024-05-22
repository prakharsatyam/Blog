
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import img from '../public/img.png'
function App() {
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else {
        dispatch (logout())
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  
  return !loading ? (
  <div 
    className=' flex flex-col justify-between items-center' 
    style={{ 
      backgroundImage: `url(${img})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat'}}
  >
<div className=' relative w-full xl:h-full xl:w-full rounded-2xl p-4 mx-auto flex flex-col justify-center z-10'>
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
</div>

  



  ) : null
 
}

export default App
