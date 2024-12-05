import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const MyNav = (props) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' data-bs-theme='dark'>
      <Container fluid={props.isFluid}>
        <Navbar.Brand href='#home'>{props.title}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link href='#'>Home</Nav.Link>
            <NavDropdown title='Generi' id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={() => props.changeFilter('fantasy')}>
                Fantasy
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => props.changeFilter('history')}>
                History
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => props.changeFilter('horror')}>
                Horror
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => props.changeFilter('romance')}>
                Romance
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => props.changeFilter('scifi')}>
                Sci-Fi
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href='#' className='d-none'>
              Amministrazione
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
