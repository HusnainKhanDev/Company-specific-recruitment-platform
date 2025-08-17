import { useMutation } from '@apollo/client';
import { SigninUserMut } from '../GraphQL/Mutation';
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../Context/Usercontext';
import { useNavigate } from 'react-router-dom';

const Login = (prop: any) => {

        const [Error, setError] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const {User, setUser} = useContext(UserDataContext)
        const navigate = useNavigate()

        const [LogedinUser, { data, loading, error }] = useMutation(SigninUserMut);

        async  function HandleFormSubmit(e: any){
            e.preventDefault()

            try{
                const response = await LogedinUser({
                    variables: {
                        email,
                        password
                    }
                })
                if(response.data){
                    console.log("from Login", response)
                    setUser(response.data.LoginUser)
                    localStorage.setItem("User", JSON.stringify(response.data.LoginUser))

                    if(response.data.LoginUser.role === "Employeer"){
                        navigate("/Employeer/Dashboard")
                    }
                else{
                    navigate("/")
                }
                }
            }
            catch(err: any){
                setError(err.graphQLErrors[0].message)
            }
        }

        useEffect(() => {
            setTimeout(()=>{
                setError("")
            }, 3000)
        }, [error])


    return (
        <div>
            <div className='w-full p-5 px-10 mt-28 '>

                <h1 className='text-white text-3xl font-bold mb-2 ml-16'>Login to your account</h1>
                <h4 className='text-white  mb-5 ml-16' onClick={() => prop.setIsLogin(false)}>
                    Or create new account: <p className='text-blue-600 inline-block cursor-pointer'>Signup</p>
                </h4>

                <form className='w-[85%] flex flex-col gap-7 ml-16' onSubmit={(e) => HandleFormSubmit(e)}>

                    <label className="input input-bordered w-full bg-[#3c364d] text-white flex items-center gap-2">
                        Email
                        <input type="email" className="" placeholder="Alex@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    </label>



                    <label className="input input-bordered  bg-[#3c364d] text-white flex items-center gap-2">
                        Password
                        <input type="password" className="" placeholder="**********" onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <button className="btn w-full text-white font-normal text-xl bg-[#6c53b5] hover:bg-[#482c9d] hover:border-2 hover:border-white hover:font-semibold">
                        Login
                    </button>

                </form>

            </div>

            {
                Error ? 
                (<div className='w-full mt-3 flex items-center justify-center '>
                <p className='ml-5 p-1 border-2 border-red-700 text-red-400'>⚠{Error}</p>
                </div>) :
                null
            }

        </div>
    )
}

export default Login