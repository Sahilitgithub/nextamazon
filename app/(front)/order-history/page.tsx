import { Metadata } from 'next'
import MyOrder from './MyOrder'

export const metadata:  Metadata = {
    title: "Order History"
}

const OrderHistory = () => {
  return <>
    <h1 className='text-2xl my-4'>Order History</h1>
    <MyOrder/>
  </>
}

export default OrderHistory
