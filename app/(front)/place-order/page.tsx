import { Metadata } from "next"
import Form from "./Form"

export const metadata: Metadata = {
    title: "Place Order"
}

const PlaceOrder = () => {
  return <Form />
}

export default PlaceOrder
