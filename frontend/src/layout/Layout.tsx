
import { Navbar } from '@/components/Shared/Navbar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout