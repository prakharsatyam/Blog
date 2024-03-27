/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom';
import {login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
    const navigate = useNavigate()
    const [error,setError]= useState("")
    const dispatch = useDispatch()
    const {register,handleSubmit}= useForm()
    const create = async (data)=>{
        setError("")
        try {
           const userData= await authService.createAccount(data)
           if(userData){
            const userData = await authService.getCurrentUser()
            dispatch(login(userData));
            console.log(userData);
            navigate("/")
           } 
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-20 border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100px'/>
                </span>
                </div>
              <h2 className='text-center text-2xl font-bold leading-tight'>sign up to create an account</h2>
              <p className='mt-2 text-center text-base text-black/60'>
                Already Have an account? 
                <Link to ="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign in
                </Link>
              </p>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label = "Full Name:"
                        palceholder= 'enter your full name'
                        {...register("name",{required:true,})}/>
                       <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        {/* Here the {...register()is passed into the ref of Input component which then connects the input field with the react hook form } */}
                        <Input label = "Password: "type="password" placeholder="enter your password"
            {...register("password",{required:true,
              matchPattern:(value)=>/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(value)||"enter a valid password",
            })}/> 
            <Button type='submit' className='w-full'>
                Create Account
            </Button>
                    </div>
                </form>
    </div>
  )
}

export default SignUp