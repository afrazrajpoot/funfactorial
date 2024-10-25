import React from 'react'
import TopHeader from './TopHeader'
import Header from './Header'
import { Toaster } from 'sonner'

const Layout = ({children}) => {
  return (
    <>
      <TopHeader />
              <Header />
              {children}
            
    </>
  )
}

export default Layout