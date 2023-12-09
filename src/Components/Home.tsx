import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as GitHub } from '../../img/github.svg';
import { ReactComponent as Search } from '../../img/search.svg';
import { GitHubUser } from '../Interfaces/interface';
import Loader from '../Helper/Loader';

const Maincontainer = styled.main`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  height: 100vh;
  width: 100vw;
`;
const Menu = styled.aside`
  background-color: black;
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: '';
    background: linear-gradient(
      135deg,
      rgba(191, 86, 255, 1) 8%,
      rgba(150, 86, 255, 1) 50%,
      rgba(111, 86, 255, 1) 96%
    );
    display: inline-block;
    width: 6px;
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const MenuTitulo = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
  color: rgb(245, 245, 245);
`;
const ContainerBusca = styled.div`
  background-color: #fff4dd;
  width: 100%;
  height: 100%;
`;
const Titulo = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 2rem 0rem;
`;
const DadosContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  flex-direction: column;
  height: 70vh;
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
`;
const Imagem = styled.img`
  border-radius: 50%;
  max-width: 300px;
  max-height: 300px;
  transition: 300ms;
  padding-top: 1rem;
  transform: translateY(-30px);
  animation: leftUp ease-in 300ms forwards;
  @keyframes leftUp {
    to {
      opacity: initial;
      transform: initial;
    }
  }
  &:hover {
    scale: 1.05;
  }
`;
const Formulario = styled.form`
  display: flex;
  justify-content: center;
  width: 40vw;
  align-items: center;
  position: relative;
  margin: 0 auto;
  transition: all 300ms ease 0s;
  &:hover {
    transform: translateY(-7px);
  }
`;
const Input = styled.input`
  width: 40vw;
  height: 45px;
  background-color: transparent;
  border: 2px solid transparent;
  color: rgb(0, 0, 0);
  padding: 1rem;
  box-shadow: 4px 4px 12px 2px rgb(146, 145, 145),
    inset 2px 2px 2px rgb(219, 219, 219),
    -1px -1px 20px rgba(206, 206, 206, 0.781);
  outline: none;
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  padding-left: 1.5rem;
  text-align: center;
  font-size: 1rem;
  &:placeholder-shown {
    text-align: center;
  }
`;
const Button = styled.button`
  color: black;
  width: 45px;
  height: 45px;
  font-size: 1rem;
  border-radius: 0 10px 10px 0;
  background: transparent;
  position: absolute;
  background: rgba(150, 86, 255, 1) 96%;
  border: 2px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  transition: 300ms;
  right: 0;
  &:hover {
    background: rgba(111, 86, 255, 1) 96%;
  }
`;
const Perror = styled.p`
  display: flex;
  justify-content: center;
  color: red;
  margin: 0.5rem;
`;

const Home: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [dados, setDados] = React.useState<null | GitHubUser>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean | null>(null);
  const [dataSearch, setDataSearch] = React.useState<string | null>(null);

  const url = `https://api.github.com/users/${value}`;

  async function require(event: React.MouseEvent) {
    event.preventDefault();
    if (value !== '') {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const json = await response.data;
        setDados(json);
        setError(false);
      } catch (err: any) {
        console.log(err);
        setError(true);
        throw new Error(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <>
      <Maincontainer>
        <Menu>
          <MenuTitulo>Últimas Pesquisas</MenuTitulo>
        </Menu>

        <ContainerBusca>
          <Titulo>Hubusca</Titulo>
          {dados === null || error ? (
            <DadosContainer>
              {error ? <Perror>Usuário não encontrado</Perror> : null}
              <GitHub />
            </DadosContainer>
          ) : (
            <DadosContainer>
              <p>{dados.name}</p>
              <Link to={`/perfil/${value}`}>
                <picture>
                  <Imagem src={dados.avatar_url} alt="Foto de Perfil" />
                  {loading && <Loader />}
                </picture>
              </Link>
              <p>{dados.login}</p>
              <p>{dados.location}</p>
            </DadosContainer>
          )}

          <Formulario>
            <Input value={value} onChange={handleChange} placeholder="BUSCAR" />
            <Button onClick={require}>
              <Search />
            </Button>
          </Formulario>
        </ContainerBusca>
      </Maincontainer>
    </>
  );
};

export default Home;
