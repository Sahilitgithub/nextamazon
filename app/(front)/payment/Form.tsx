'use client'
import CheckoutSteps from "@/components/CheckoutSteps";
import { useCartService } from "@/lib/hooks/useCartStore";
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const {savePaymentMethod, paymentMethod, shippingAddress} = useCartService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    savePaymentMethod(selectedPaymentMethod)
    router.push('/place-order')
  }

  useEffect(() => {
    if(!shippingAddress.address){
        return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal")
  }, [paymentMethod, router, shippingAddress.address])

  return (
    <div>
        <CheckoutSteps current={2} />
        <div className="max-w-sm mx-auto card bg-base-300 my-4">
            <div className="card-body">
                <h1 className="card-title">Payment Method</h1>
                <form onSubmit={handleSubmit}>
                    {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
                        <div key={payment}>
                            <label className="label cursor-pointer">
                                <span className="label-text">{payment}</span>
                                <input type="radio" 
                                name="paymentMethod" 
                                className="radio"
                                value={payment}
                                checked={selectedPaymentMethod === payment} 
                                onChange={() => setSelectedPaymentMethod(payment)} />
                            </label>
                        </div>
                    ))}
                    <div className="my-2 flex justify-between items-center">
                      <button type="button" className="btn my-2 btn-primary" 
                      onClick={() => router.back()}>Back</button>
                        <button 
                        type="submit" 
                        className="btn btn-primary">Next</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Form
