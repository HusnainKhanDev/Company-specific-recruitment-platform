import React, { useState } from 'react'
import Carousel from '../Components/Carousel'
import Signup from '../Components/Signup'
import Login from '../Components/Login';

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(false);






    
    return (
        <div className='bg-[#2c2638] w-full h-screen'>
            <div className='w-[50%] h-screen absolute left-5 flex  items-center ' >
                <Carousel/>
            </div>

            {isLogin ? '' : 
                <div className=' w-[50%] h-screen absolute left-[50%] flex flex-col align-center '>
                    <Signup setIsLogin={setIsLogin}/>
                </div>
            }

            {
                isLogin ? 
                    <div className=' w-[50%] h-screen absolute left-[50%] flex flex-col align-center '>
                        <Login setIsLogin={setIsLogin}/>
                    </div>
                : ''
            }
            
        </div>
    )


}

export default AuthPage