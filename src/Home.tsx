import React from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { ReactComponent as GitHub} from '../img/github.svg'
 
const Maincontainer = styled.main`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  height: 100vh;
  width: 100vw;
`

const Menu = styled.aside`
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
  &::after{
  content: '';
  background: linear-gradient(135deg, rgba(191,86,255,1) 8%, rgba(150,86,255,1) 50%, rgba(111,86,255,1) 96%);
  display: inline-block;
  width: 4px;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  }
`
const MenuTitulo = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
  color: rgb(245,245,245);
`
const ContainerBusca = styled.div`
  background-color: rgb(245,245,245);
  width: 100%;
  height: 100%;
`
const Titulo = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0;
`

const DadosContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  height: 75vh;
  gap: 15px;
  opacity: 0;
  transform: translateY(-30px);
  animation: leftDown 500ms forwards;
  @keyframes leftDown {
    to {
    opacity: initial;
    transform: initial;
   }
  }
`
const Imagem = styled.img`
  border-radius: 50%;
  max-width: 350px;
  max-height: 350px;
  transition: 300ms;
  padding-top: 1rem;
  &:hover {
    scale: 1.05;
  }
`

const Formulario = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  max-height: 20vh;
  margin-left: 2rem;
`
const Input = styled.input`
  width: 100%;
  width: 40vw;
  height: 45px;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid rgb(111,86,255);
  outline: none;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0px 0px 20px -18px;
  text-align: center;
  font-size: 1rem;
&:hover {
  border: 2px solid  rgb(111,86,255);
  box-shadow: 0px 0px 20px -17px;
}
&:active {
  transform: scale(0.95);
}
&:focus {
  border: 2px solid rgb(150,86,255);
}
&:placeholder-shown {
  text-align: center;
}
`
const Button = styled.button`
 color: black;
 padding: 0.7em 1.7em;
 font-size: 1rem;
 border-radius: 0.5em;
 background:  rgb(111,120,255);
 border: 2px solid  rgb(111,120,255);
 transition: all .3s;
 box-shadow: 6px 6px 12px #c5c5c5,
            -6px -6px 12px #ffffff;
&:hover {
  box-shadow: 0px 0px 20px -17px;
}
&:active {
  transform: scale(0.95);
}
`
const Perror = styled.p`
  display: flex;
  justify-content: center;
  color: red;
  margin: 0.5rem;
`

const Home = () => {
  const [value, setValue] = React.useState('');
  const [dados, setDados] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [dataSearch, setDataSearch] = React.useState(null);

  const url = `https://api.github.com/users/${value}`

  async function require( event: MouseEvent ) {
    event.preventDefault();
    if(value !== '') {
      try{
    setLoading(true)
    const response = await axios.get(url)
    const json = await response.data
    setDados(json)
    setError(false)
   } catch (err) {
    console.log(err)
    setError(true)
    throw new Error(err.message);
   } finally {
    setLoading(false)
    }
   }
  }

  function handleChange({target}){
    setValue(target.value);
  }

  return (
    <>
    <Maincontainer>
      <Menu>
        <MenuTitulo>Últimas Pesquisas</MenuTitulo>
      </Menu>

      <ContainerBusca>
        <Titulo>HUBusca</Titulo>

        {dados === null || error ? 
        <DadosContainer>
          <GitHub style={{maxWidth:'350px', maxHeight:'350px', display: 'flex', justifyContent:'center', alignItens: 'center'}} />
        </DadosContainer> 
        :
        <DadosContainer>
          <p><strong>{dados.name}</strong></p>
          <Link to={`/perfil/${value}`}>
          <picture>
          <Imagem src={dados.avatar_url} alt="Foto de Perfil" />
          </picture>
          </Link>
          <p>{dados.login}</p>
          <p>{dados.location}</p>
        </DadosContainer>}

        {error ? <Perror>Usuário não encontrado</Perror> : null}
        <Formulario>
          <Input value={value} onChange={handleChange} placeholder='BUSCAR'/>
          <Button onClick={require}>Pesquisar</Button>
        </Formulario>

      </ContainerBusca>
    </Maincontainer>
    </>
  )
}

export default Home


