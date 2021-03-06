import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import CrudCurso from './pages/admin/crudCurso'
import CrudInstituicao from './pages/admin/crudInstituicao'
import Avaliacao from './pages/professor/avaliacao'
import CrudProfessorTurma from './pages/professor/CrudProfessorTurma'
import TimeLine from './pages/timeline'
import CrudUsuario from './pages/admin/crudUsuario'
import CrudAlunoTurma from './pages/admin/crudAlunoTurma'
import ReactDOM from 'react-dom';
import './index.css';
import Turma from './pages/turmaespecifica';
import Login from './pages/login';
import CrudTurma from './pages/professor/crudTurma'
import CrudObjetivo from './pages/professor/crudObjetivo'
import Home from './pages/home'
import PerfilAluno from './pages/perfil'
import PerfilProfessor from './pages/professor/perfil'
import Cadastrar from './pages/cadastrar'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import SemPermissao from './pages/sempermissao'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import NaoEncontrado from './pages/naoencontrado/naoencontrado';

  const RotaPrivada = ({component : Component, ...rest}) => (
    <Route 
      {...rest}
      render = { props => 
          localStorage.getItem('token-edux') !== null ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname :'/login', state :{from : props.location}}} />) 
      }
    />
  );

  const RotaPrivadaProfessor = ({component : Component, ...rest}) => (
    <Route 
      {...rest}
      render= { props => 
          localStorage.getItem('token-edux') !==null && jwt_decode(localStorage.getItem('token-edux')).permissao === 'Professor' ?
          <Component {...props} /> :
          <Redirect to={{ pathname : '/login', state :{from : props.location}}} />
        }
    />
  );  

  const RotaAdmin = ({component : Component, ...rest}) => (
    <Route 
      {...rest}
      render= { props => 
          localStorage.getItem('token-edux') !==null && jwt_decode(localStorage.getItem('token-edux')).permissao === 'Admin' ?
          <Component {...props} /> :
          <Redirect to={{ pathname : '/login', state :{from : props.location}}} />
        }
    />
  );  

//Rotas da aplicação
const routing = (
  <Router>
    <Switch>
      <RotaAdmin path='/crudInstituicao' component={CrudInstituicao} />
      <RotaAdmin path='/crudCursos' component={CrudCurso} />
      <RotaAdmin path='/crudUsuario' component={CrudUsuario} />
      <RotaAdmin path='/crudAlunoTurma' component={CrudAlunoTurma} />
      <Route exact path='/' component={Home} />
      <RotaPrivada path='/perfil' component={PerfilAluno} />
      <RotaPrivadaProfessor path='/professor/turma' component={CrudTurma} />
      <RotaPrivadaProfessor path='/professor/perfil' component={PerfilProfessor} />
      <RotaPrivadaProfessor path='/professor/professorTurma' component={CrudProfessorTurma} />
      <Route path='/login' component={Login} />
      <Route path='/cadastrar' component={Cadastrar} />
      <Route path='/turma' component={Turma} />
      <RotaPrivadaProfessor path='/professor/avaliacao' component={Avaliacao} />
      <RotaPrivada path='/timeline' component={TimeLine} />
      <RotaPrivadaProfessor path='/Objetivo' component={CrudObjetivo} />
      <RotaPrivada  component={SemPermissao} />
      <Route component={NaoEncontrado} />
    </Switch>
  </Router>
)

ReactDOM.render (
 routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();