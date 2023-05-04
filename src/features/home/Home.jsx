import React from 'react'
import BuyNowCard from '../../components/cards/BuyNowCard'
import HomeNav from '../../components/nav/HomeNav'
import SortedBy from '../../components/SortedBy'
import ProductCard from '../../components/cards/ProductCard'
import Pagination from '../../components/Pagination'
import Footer from '../../components/Footer'
import Layout from '../../components/layout/Layout'

const Home = () => {
  return (
    <Layout>
        
        <div className='h-24'></div>
        <BuyNowCard/>
        <SortedBy/>
        <div className='grid grid-cols-1 gap-5 px-10 my-10 sm:grid-cols-2 md:grid-cols-4'>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
        <Pagination/>
        
    </Layout>
  )
}

export default Home