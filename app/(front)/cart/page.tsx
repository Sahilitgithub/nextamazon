import { Metadata } from "next"
import CartDetails from "./CartDetails"

export const metadata: Metadata = {
    title: "Shopping Cart",
}

const Cart = () => {
  return <CartDetails />
}

export default Cart
