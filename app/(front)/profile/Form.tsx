'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Inputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Form = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const {register, handleSubmit, getValues, setValue, formState: {errors, isSubmitting}} = useForm<Inputs>({
    defaultValues:{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
  });

  useEffect(() => {
    if(session && session.user){
        setValue('name', session.user.name!);
        setValue('email', session.user.email!);
    }
  }, [session, setValue, router])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password} = form;
    try {
        const res = await fetch(`/api/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
        if(res.status === 200) {
            toast.success('Profile updated successfully.')
            const newSession = {
                ...session,
                user: {
                    ...session?.user,
                    name,
                    email,
                }
            }
            await update(newSession)
        }else {
            const data = await res.json();
            toast.error(data.message || 'error')
        }
    } catch (error: any) {
        toast.error(error.message || 'error')
    }
  }

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Profile</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="my-2">
                <label htmlFor="name" className="label">Name</label>
                <input 
                type="text"
                id="name"
                {...register('name', {
                    required: 'Name is required',
                    minLength: {
                        value: 2,
                        message: 'Name must be at least 3 characters'
                    }
                })} className="input input-bordered w-full max-w-sm" />
                {errors.name?.message && (
                    <div className="text-error">{errors.name.message}</div>
                )}
            </div>
            <div className="my-2">
                <label htmlFor="email" className="label">Email</label>
                <input 
                type="text"
                id="email" 
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email is invalid'
                    }
                })} className="input input-bordered w-full max-w-sm" />
                {errors.email?.message && (
                    <div className="text-error">{errors.email.message}</div>
                )}
            </div>
            <div className="my">
                <label htmlFor="password" className="label">New Password</label>
                <input 
                type="password" 
                id="password" 
                {...register('password', {})} 
                className="input input-bordered w-full max-w-sm" />
                {errors.password?.message && (
                    <div className="text-error">{errors.password.message}</div>
                )}
            </div>
            <div className="my-2">
                <label htmlFor="confirmPassword" className="label" >Confirm New Password</label>
                <input 
                type="password" 
                {...register('confirmPassword', {
                    validate: (value) => {
                        return value === getValues('password') || 'Password should match!'
                    }
                })} className="input input-bordered w-full max-w-sm" />
                {errors.confirmPassword?.message && (
                    <div className="text-error">{errors.confirmPassword.message}</div>
                )}
            </div>
            <div className="my-3">
                <button 
                type="submit" 
                disabled={isSubmitting} 
                className="btn btn-primary w-full">
                    {isSubmitting && (
                        <span className="loading loading-spinner"></span>
                    )}
                    Update
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Form
