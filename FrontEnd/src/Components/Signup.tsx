import React from 'react'

const Signup = (prop: any) => {
    return (
        <div>
            <div className='w-full p-5 px-8 mt-16 '>

            <h1 className='text-white text-3xl font-bold mb-2 ml-16'>Create an Account</h1>
            <h4 className='text-white  mb-5 ml-16' onClick={() => prop.setIsLogin(true)}>
                Already Have Account: <p className='text-blue-600 inline-block cursor-pointer'>Login</p>
            </h4>

            <form className='w-[85%] flex flex-col gap-7 ml-16'>
                <label className="input input-bordered  bg-[#3c364d] text-white flex items-center gap-2">
                    Name
                    <input type="text" className="" placeholder="Alex" />
                </label>

                <div className='flex gap-5'>
                    <label className="input input-bordered w-full bg-[#3c364d] text-white flex items-center gap-2">
                        Email
                        <input type="text" className="" placeholder="Alex@gmail.com" />
                    </label>
                    <label className="input input-bordered w-full bg-[#3c364d] text-white flex items-center gap-2">
                        Phone
                        <input type="text" className="" placeholder="03XX-XXXXXXX" />
                    </label>
                </div>

                <label className="input input-bordered  bg-[#3c364d] text-white flex items-center gap-2">
                    Password
                    <input type="text" className="" placeholder="**********" />
                </label>


                <button className="btn w-full text-white font-normal text-xl bg-[#6c53b5] hover:bg-[#482c9d] hover:border-2 hover:border-white hover:font-semibold">
                    Create Account
                </button>

            </form>

        </div>

            <div className='w-[75%] ml-[14%] h-[40px] flex justify-between items-center  text-white'>
                <div className='h-[1px] w-[39%] bg-[#ffffff]'></div>
                <p className='text-sm'>Or Register With</p>
                <div className='h-[1px]  w-[40%] bg-[#f4f4f4]'></div>
            </div>

            <div
                className=' hover:bg-[linear-gradient(to_right,_#ef4444,_#facc15,_#26f876,_#4040f9)] w-[20%] h-12 ml-[41%] flex justify-center items-center gap-3 border-2 border-white rounded-lg p-3 cursor-pointer transition-all duration-300'>
                <img src="google.png" alt="" className='h-5 w-5' />
                <p className='text-white text-lg'>Google</p>
            </div>
        </div>
    )
}

export default Signup