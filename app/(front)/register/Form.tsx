'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const { data: session } = useSession();
  const params = useSearchParams();
  let callbackUrl = params.get('callbackUrl') || '/';
  const {register, handleSubmit, getValues, formState: {errors, isSubmitting}} = useForm<Inputs>({
    defaultValues:{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
  });

  useEffect(() => {
    if(session && session.user){
        router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session]);


  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        if(res.ok) {
            return router.push(`/signin?callbackUrl=${callbackUrl}&=Account has been created.`)
        }else {
            const data = await res.json()
            throw new Error(data.message)
        }
    } catch (error: any) {
        toast.error('Email already registered')
    }
  }

  return (
    <div className="max-w-sm mx-auto card bg-base-300 mt-4">
      <div className="card-body">
        <h1 className="text-2xl text-center">Register</h1>
       <form onSubmit={handleSubmit(formSubmit)}>
       <div className="my-2">
          <label htmlFor="name" className="label">Name</label>
          <input 
          type="text" 
          id="name"
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            }
          })} className="input input-bordered w-full max-w-sm" />
          {errors.name?.message && (
            <div className="text-error">{errors.name.message}</div>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="email" className="label">Email</label>
          <input type="text" 
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
        <div className="my-2">
          <label htmlFor="password" className="label">Password</label>
          <input 
          type="password" 
          id="password" 
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })} className="input input-bordered max-w-sm w-full" />
          {errors.password?.message && (
            <div className="text-error">{errors.password.message}</div>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="confirmpassword" className="label">Confirm Password</label>
          <input 
          type="password" 
          id="confirmPassword" 
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (value) => {
              return value === getValues('password') || 'Password should match!'
            }
          })} className="input input-bordered max-w-sm w-full" />
          {errors.confirmPassword?.message && (
            <div className="text-error">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="my-2">
          <button type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary w-full">
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Register
          </button>
        </div>
        <div className="my-2">
          Already have an account? {' '}
          <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
            Sign In
          </Link>
        </div>
       </form>
      </div>
    </div>
  )
}

export default Form
