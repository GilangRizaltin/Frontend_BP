import React, {useState} from 'react'
import { userAction } from '../redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/https/auth';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pwdShown, setShowPwd] = useState(false)
    const showPassword = () => {
        setShowPwd((state) => !state)
    }

    const user_type = useSelector(state => state.user.userInfo.user_type);

    const submitLogin = (e) => {
        e.preventDefault()
        const {loginThunk} = userAction
        const body = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        dispatch(loginThunk({
            body,
            cb: () => {
                navigate("/profile")
            }, errorCb: (error) => {
            console.log(error)}
        }))
        // loginUser(body)
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err))
    }
    const consol = () => {
        console.log("saya")
    }
  return (
    <>
      <main className='flex justify-center items-center w-screen h-screen'>
        <section className='bg-green-600 p-4 rounded-xl'>
           <p className='font-semibold text-base'>Login Bintang Pelajar</p>
            <form onSubmit={submitLogin} className='flex flex-col gap-4'>
                <p>Email</p>
                <div className='bg-white flex justify-center items-center rounded-md p-2 gap-2'>
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="text" name="email" className='border-none outline-none flex-1'/>
                </div>
                <p>password</p>
                <div className='bg-white flex justify-center items-center rounded-md p-2 gap-2'>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type={pwdShown? "text" : "password"} name="password" className='border-none outline-none'/>
                    <div onClick={showPassword}>
                        {pwdShown ? <ion-icon name="eye-outline"></ion-icon> : <ion-icon name="eye-off-outline"></ion-icon>}
                    </div>
                </div>
                <button type='submit' className='bg-white px-4 py-2 w-full border border-solid border-orange-500 rounded-xl'>Login</button>
            </form> 
        </section>
        
      </main>
    </>
  )
}

export default Login
