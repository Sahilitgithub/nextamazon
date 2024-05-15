import AddToCart from '@/components/products/AddToCart';
import productService from '@/lib/services/productService';
import Image from 'next/image';
import Link from 'next/link';
import { convertDocToObject } from '@/lib/utils';

export async function generateMetadata({params}: {params: {slug: string}}) {
  const product = await productService.getBySlug(params.slug)
  if(!product) return {title: "Product not found"}
  return {
    title: product.name,
    description: product.description,
  }
}

const productDetails = async ({params}: {params: {slug: string}}) => {
  const product = await productService.getBySlug(params.slug)
  if(!product) return 'Product not found';

  return (
    <>
      <div className="my-3">
        <Link href={'/'} >Back to product</Link>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <Image 
          src={product.image} 
          alt={product.name} 
          width={500}
          height={400} 
          sizes='100vw'
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px'
          }} />
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className='text-xl'>Title: {product.name}</h1>
            </li>
            <li>
              <p>Rating: {product.rating} of {product.numReviews} reviews</p>
            </li>
            <li>
              <p>Brand: {product.brand}</p>
            </li>
            <li>
              <p>Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card bg-base-300 shadow-xl my-3'>
            <div className="card-body">
              <div className="my-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="my-2 flex justify-between">
                <div>Status</div>
                <div>{product.countInStock > 0 ? 'Stock': 'Unavailble'}</div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center mt-2'>
                <AddToCart item={{...convertDocToObject(product), qty: 0, color: '', size: ''}} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default productDetails
