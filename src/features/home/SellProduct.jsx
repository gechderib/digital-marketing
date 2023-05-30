import React from 'react'
import Layout from '../../components/layout/Layout'
import AddProduct from '../product/AddProduct'

const SellProduct = () => {
  return (
    <Layout>
        <div className='mt-14 py-5 sm:px-24 bg-gray-50'>
            <AddProduct/>
        </div>
    </Layout>
  )
}

export default SellProduct