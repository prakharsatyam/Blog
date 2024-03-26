import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch= useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{dispatch(logout())})//here the dispatch button sends a redux action logout to update the value of status in the store
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn