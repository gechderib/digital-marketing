import React from 'react'
import Layout from '../../components/layout/Layout'
import EditProduct from '../product/EditProduct'

const EditProductPage = () => {
  return (
    <Layout>
        <div className='mt-14 py-5 sm:px-24 bg-gray-50'>
            <EditProduct/>
        </div>
    </Layout>
  )
}

export default EditProductPage