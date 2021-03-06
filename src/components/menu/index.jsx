import React from 'react';
import './index.css';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom'
import logo from '../../assets/img/logo_2.png'

const Menu = () => {
  const history = useHistory();

  const Sair = (event) => {
    event.preventDefault();
    localStorage.removeItem('token-edux');
    history.push('/')
  }

  const renderMenu = () => {
    const token = localStorage.getItem('token-edux');

    if(token === null){
      return(
          <Nav>
         <div className="login"> <Nav.Link href="/login">Login</Nav.Link></div>
          <div className="cadastrar"><Nav.Link href="/cadastrar">Cadastrar</Nav.Link></div>
        </Nav>
        )
      } else if ( jwt_decode(token).permissao === 'Professor'){
        return(
        <Nav>
        <Nav.Link href="/professor/avaliacao">Avaliação</Nav.Link>
         <Nav.Link href="/objetivo">Objetivo</Nav.Link>
         <Nav.Link href="/timeline">Timeline</Nav.Link>
         <Nav.Link href="/professor/professorTurma">Professor Turma</Nav.Link>
         <Nav.Link href="/professor/turma">Turma</Nav.Link>
          <NavDropdown title={jwt_decode(token).nameid} id="basic-nav-dropdown">
        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={event => Sair(event)}>Sair</NavDropdown.Item>
        </NavDropdown>
      </Nav>
        )
      } else if ( jwt_decode(token).permissao === 'Aluno'){
        return(
        <Nav>
          <Nav.Link href="/timeline">TimeLine</Nav.Link>
          <Nav.Link href="/turma">Objetivo</Nav.Link>
          <NavDropdown title={jwt_decode(token).nameid} id="basic-nav-dropdown">
        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={event => Sair(event)}>Sair</NavDropdown.Item>
      </NavDropdown>
        </Nav>
        )
      } else if ( jwt_decode(token).permissao === 'Admin'){
        return(
          <Nav>
          <Nav.Link href="/crudInstituicao">Instituição</Nav.Link>
          <Nav.Link href="/crudCursos">Cursos</Nav.Link>
          <Nav.Link href="/crudUsuario">Usuário</Nav.Link>
          <Nav.Link href="/crudAlunoTurma">AlunoTurma</Nav.Link>
          <NavDropdown title={jwt_decode(token).nameid} id="basic-nav-dropdown">
          <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={event => Sair(event)}>Sair</NavDropdown.Item>
        </NavDropdown>
          </Nav>
        )
      }
    }

      return(
     <Navbar bg="light" expand="lg">
   <Navbar.Brand scr={logo} href="/">EduX</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="mr-auto">
       <Nav.Link href="/">Home</Nav.Link>
     </Nav>
    { renderMenu() }
  </Navbar.Collapse>
</Navbar>
    )
   }

export default Menu;