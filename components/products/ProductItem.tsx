import { Product } from "@/lib/models/ProductModel"
import Image from "next/image"
import Link from "next/link"

const ProductItem = ({product}: {product: Product}) => {
  return (
    <div className="card bg-base-300 shadow-xl my-4">
      <figure>
        <Link href={`/product/${product.slug}`}>
            <Image src={product.image} 
            alt={product.name} 
            width={400}
            height={400} 
            className="object-cover h-64 w-full" />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/products/${product.slug}`}>
            <h2 className="card-title">{product.name}</h2>
        </Link>
        <p className="my-2">Brand: {product.brand}</p>
        <div className="card-actions flex items-center justify-between">
            <span className="text-2xl">${product.price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
