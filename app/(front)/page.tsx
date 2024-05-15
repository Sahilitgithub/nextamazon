/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObject } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.APP_TITLE || "SAHIL-IT",
  description: process.env.APP_DESCRIPTION || "Nextjs, React, Mongodb, Server side-to-server",
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();
  return (
    <>
      <div className="w-full carousel rounded-box my-4">
        {featuredProducts.map((product, index) => (
          <div key={product._id} className="carousel-item relative w-full" 
          id={`slide-${index}`} >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} alt={product.name} className="w-full" />
            </Link>
            <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide-${index === 0 ? featuredProducts.length - 1 : index - 1}`} 
              className="btn btn-circle" >
                {" < "}
              </a>
              <a href={`#slide-${index === featuredProducts.length - 1 ? 0 : index + 1}`} 
              className="btn btn-circle" >
                {" > "}
              </a>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl mt-6">Latest Products</h1>
       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObject(product)} />
        ))}
       </div>
     </>
  );
}
