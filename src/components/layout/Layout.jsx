import React from 'react'
import HomeNav from '../nav/HomeNav'
import Footer from '../Footer'

const Layout = ({children}) => {
  return (
    <div>
        <HomeNav/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout