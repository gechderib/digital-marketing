import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductDetail from '../product/ProductDetail'

const ProductPage = () => {
  return (
    <Layout>
        <div className='px-5 py-20'>
        <ProductDetail/>

        </div>
    </Layout>
  )
}

export default ProductPage