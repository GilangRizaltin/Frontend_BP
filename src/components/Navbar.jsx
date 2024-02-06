import React from 'react'
import { userAction } from '../redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Navbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = useSelector(state => state.user.userInfo.token)
  const onLogOutHandler = () => {
    const {logoutThunk} = userAction
    dispatch(logoutThunk({jwt, cb: () => {navigate("/")}}))
  }
  return (
    <header className='w-screen h-[100px] bg-orange-200 flex items-center font-semibold px-4 py-8 md:px-12 lg:px-24'>
        <div className='flex-1'>
        <img src="https://res.cloudinary.com/doncmmfaa/image/upload/v1707135066/samples/bintangpelajar_bc5k2j.png" alt="" width={"200px"}/>
        </div>
        <button className='bg-white px-4 py-2 rounded-lg' onClick={onLogOutHandler}>Logout</button>
    </header>
  )
}

export default Navbar
