import { FunctionComponent, MouseEventHandler, useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap'

  const MyNavbar: FunctionComponent = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openTrigger: MouseEventHandler = () => {
        setIsOpen(!isOpen)
    }

    return(
        <Navbar color='dark' light expand='xl' >
            <NavbarBrand style={{color: 'rgb(0, 255, 34)'}} className='mr-auto' href="/dashboard">Company Name</NavbarBrand>
                <NavbarToggler onClick={openTrigger} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <NavLink href="/spotify" style={{color: 'rgb(0, 255, 34)'}} >Spotify</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/editTerpene" style={{color: 'rgb(0, 255, 34)'}} >Manage Terpenes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/editCannabinoid" style={{color: 'rgb(0, 255, 34)'}} >Manage Cannabinoids</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/editProduct" style={{color: 'rgb(0, 255, 34)'}} >Manage Products</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
        </Navbar>
    )
}

export default MyNavbar