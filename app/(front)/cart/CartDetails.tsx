'use client'

import { useCartService } from "@/lib/hooks/useCartStore"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartDetails = () => {
  const router = useRouter();
  const {items, itemsPrice, decrease, increase} = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return <></>

  return (
    <>
      <h1 className="my-4 text-2xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="justify-between flex">
            <p>Cart is empty.</p>
            <Link href={'/'} className="link" >Go Shopping</Link>
        </div>
      ): (
        <div className="grid md:grid-cols-4 gap-4">
            <div className="overflow-x-auto md:col-span-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.slug}>
                                <td>
                                   <Link href={`/product/${item.slug}`} 
                                   className="flex gap-3 items-center" >
                                    <Image 
                                        src={item.image} 
                                        alt={item.name} 
                                        width={70}
                                        height={70}/>
                                        <span className="px-2">
                                            {item.name} {item.color} {item.size}
                                        </span>
                                   </Link>
                                </td>
                                <td className="flex items-center">
                                        <button 
                                        onClick={() => decrease(item)}
                                        type="button" 
                                        className="btn">-</button>
                                        <span className="px-2">{item.qty}</span>
                                        <button 
                                        type="button" 
                                        onClick={() => increase(item)} 
                                        className="btn" >+</button>
                                </td>
                                <td>
                                    ${item.price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         <div>
         <div className="card bg-base-300">
                <div className="card-body">
                    <ul>
                        <li>
                            <div className="my-2 text-xl">
                                Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : ${itemsPrice}
                            </div>
                        </li>
                        <li>
                            <button className="btn btn-primary w-full" type="button" onClick={() => router.push('/shipping')} >
                               Procced to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
         </div>
        </div>
      )}
    </>
  )
}

export default CartDetails
