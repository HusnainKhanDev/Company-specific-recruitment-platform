import React, { useContext, useEffect, useState } from 'react'
import {  useMutation } from '@apollo/client'
import { CreateUserMut } from '../GraphQL/Mutation'
import { UserDataContext } from '../Context/Usercontext';
import { useLocation, useNavigate } from 'react-router-dom';




const Signup = (prop: any) => {

    const [createUser, { data, loading}] = useMutation(CreateUserMut);
    
    const {User, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    const location = useLocation();


    const [error, setError] = useState("")
    const [fullname, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async  function HandleFormSubmit(e: any){
        e.preventDefault()
        try{
            const response = await createUser({
                variables: {
                    input: {
                        fullname,
                        phone,
                        email,
                        password
                    }
                }
            })
            if(response){
                console.log("From Signup", response)
                setUser(response?.data.CreateUser)
                sessionStorage.setItem("User", JSON.stringify(response.data.CreateUser))
                if(User.role === "Employeer"){
                    navigate("/Employeer/Dashboard")
                }
                else{
                    navigate("/")
                }
            }
        }
        catch(err: any){
            setError(err.graphQLErrors[0].message)
            console.log(err)
        }   
        
    }

    function handleGoogleLogin(e: any){
        e.preventDefault()
        window.location.href = `http://localhost:4000/auth/google`;
    }

    useEffect(() => {
        setError(location.state?.message)
    }, [location.state?.message])


    

    return (
        <div>
            <div className='w-full p-5 px-8 mt-16 '>

            <h1 className='text-white text-3xl font-bold mb-2 ml-16'>Create an Account</h1>
            <h4 className='text-white  mb-5 ml-16' onClick={() => prop.setIsLogin(true)}>
                Already Have Account: <p className='text-blue-600 inline-block cursor-pointer'>Login</p>
            </h4>

            <form onSubmit={(e) => HandleFormSubmit(e)} className='w-[85%] flex flex-col gap-7 ml-16'>
                <label className="input input-bordered  bg-[#3c364d] text-white flex items-center gap-2">
                    Name
                    <input type="text" className="" placeholder="Alex" onChange={(e) => setFullname(e.target.value)}/>
                </label>

                <div className='flex gap-5'>
                    <label className="input input-bordered w-[50%] bg-[#3c364d] text-white flex items-center gap-2">
                        Email
                        <input type="email" className="" placeholder="Alex@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label className="input input-bordered w-[45%] bg-[#3c364d] text-white flex items-center gap-2">
                        Phone
                        <input type="text" className="" placeholder="03XX-XXXXXXX" onChange={(e) => setPhone(e.target.value)}/>
                    </label>
                </div>

                <label className="input input-bordered  bg-[#3c364d] text-white flex items-center gap-2">
                    Password
                    <input type="password" className="" placeholder="**********" onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <button className="btn w-full text-white font-normal text-xl bg-[#6c53b5] hover:bg-[#482c9d] hover:border-2 hover:border-white hover:font-semibold">
                    Create Account
                </button>

            </form>

        </div>

            <div className='w-[75%] ml-[15%] h-[40px] flex justify-between items-center text-white'>
                <div className='h-[1px] w-[37%] bg-[#ffffff]'></div>
                <p className='text-sm'>Or Register With</p>
                <div className='h-[1px]  w-[40%] bg-[#f4f4f4]'></div>
            </div>

            <div
                onClick={(e) => {handleGoogleLogin(e)}}
                className=' hover:bg-[linear-gradient(to_right,_#ef4444cc,_#facc15cc,_#26f876cc,_#4040f9cc)]  w-[20%] h-12 ml-[41%] flex justify-center items-center relative gap-3 border-2 border-white rounded-lg p-3 cursor-pointer transition-all duration-300'>
                {/* <div className="w-full h-full absolute  bg-white/20"></div> */}
                <img src="google.png" alt="" className='h-5 w-5' />
                <p className='text-white font-semibold text-lg text-center'>Google</p>
            </div>

            {
                error ? 
                (<div className='w-full mt-3 flex items-center justify-center '>
                <p className='ml-5 p-1 border-2 border-red-700 text-red-400'>⚠{error}</p>
                </div>) :
                null
            }
            

        </div>
    )
}

export default Signup