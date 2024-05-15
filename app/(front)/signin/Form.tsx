'use client';

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
    email: string;
    password: string;
}

const Form = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  let callbackUrl = params.get('callbackUrl') || '/';
  const router = useRouter();

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<Inputs>({
    defaultValues:{
        email: '',
        password: '',
    }
  })

  useEffect(() => {
    if(session && session.user){
        router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn('credentials', {
        email,
        password
    })
  }

  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Sign In</h1>
        {params.get('error') && (
            <div className="alert text-error">
                {params.get('error') === 'CredentialsSignIn' ? 'Invalid email or password': params.get('error')}
            </div>
        )}
        {params.get('success') && (
            <div className="alert text-success">{params.get('success')}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
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
                <input type="password" 
                id="password" 
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                    }
                })} className="input input-bordered w-full max-w-sm" />
                {errors.password?.message && (
                    <div className="text-error">{errors.password.message}</div>
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
                    Sign In
                </button>
            </div>
            <div className="my-3">
                Need an account? {" "}
                <Link className="link" 
                href={`/register?callbackUrl=${callbackUrl}`} >Register</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Form
