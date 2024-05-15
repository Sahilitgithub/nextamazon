'use client';

import { useCartService } from "@/lib/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const { data: session} = useSession()

  useEffect(() => {
    setMounted(true)
  }, []);

  const signOutHandler = () => {
    signOut({callbackUrl: '/signin'});
    init();
  }

  return (
    <div>
      <ul className="flex flex-stretch">
        <li>
            <Link 
            className="btn btn-ghost rounded-btn"
            href="/cart">
                Cart 
                {mounted && items.length !== 0 && (
                    <div className="badge badge-secondary">
                        {items.reduce((a, c) => a + c.qty, 0)}
                    </div>
                )}
            </Link>
        </li>
        {session && session.user ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn capitalize">
              {session.user.name}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </label>
            <ul tabIndex={0} 
            className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52">
              <li>
                <button type="button">
                  <Link href="/order-history">Order History</Link>
                </button>
              </li>
              <li>
                <button type="button">
                  <Link href="/profile">Profile</Link>
                </button>
              </li>
              <li>
                <button type="button" 
                onClick={signOutHandler} 
                >Sign Out</button>
              </li>
            </ul>
          </div>
        ): (
          <li>
           <button type="button" className="btn btn-ghost rounded-btn" 
           onClick={() => signIn()} >
              Sign In
           </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Menu
