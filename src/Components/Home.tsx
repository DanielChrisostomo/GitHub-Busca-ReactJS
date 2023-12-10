import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as GitHub } from '../../img/github.svg';
import { ReactComponent as Search } from '../../img/search.svg';
import { ReactComponent as Arrow } from '../../img/arrow.svg';
import Loader from '../Helper/Loader';
import { GitHubUser, UserData } from '../Interfaces/interface';

const Maincontainer = styled.main`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  height: 100vh;
  width: 100vw;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;
const Menu = styled.aside`
  background-color: black;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  position: relative;
  overflow: auto;
  @media (max-width: 1000px) {
    height: 400px;
  }
`;
const MenuTitulo = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: rgb(245, 245, 245);
  @media (max-width: 1000px) {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;
const ContainerBusca = styled.div`
  background-color: #fff4dd;
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
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
    left: 0;
    top: 0;
  }
  @media (max-width: 1000px) {
    &::before {
      width: 100vw;
      height: 6px;
      bottom: 0;
      top: unset;
      left: unset;
    }
  }
`;
const Titulo = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 2rem 0rem;
  @media (max-width: 1000px) {
    margin: 1rem 0rem;
  }
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
  animation: leftDown 400ms forwards;
  @keyframes leftDown {
    to {
      opacity: initial;
      transform: initial;
    }
  }
  @media (max-width: 1000px) {
    height: auto;
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
  @media (max-width: 1000px) {
    max-width: 200px;
    max-height: 200px;
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
  @media (max-width: 1000px) {
    margin-top: 3.5rem;
    width: 70vw;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
  @media (max-width: 1000px) {
    width: 70vw;
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
  background: rgba(111, 86, 255, 1);
  border: 2px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  transition: 300ms;
  right: 0;
  &:hover {
    background: rgba(150, 86, 255, 1);
  }
`;
const Perror = styled.p`
  display: flex;
  justify-content: center;
  color: red;
  margin: 0.5rem;
`;
const Nomecard = styled.p`
  color: white;
`;
const LoCard = styled.p`
  font-size: 13px;
  transition: 300ms;
  color: #ffffff80;
`;
const ImgCard = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  transition: ease-in 300ms;
  &:hover {
    border-radius: none;
  }
`;
const Card = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ffffff80;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: ease-in 100ms;
  background: #111;
  &:hover {
    border-color: white;
    color: white;
  }
`;

const Home: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [dados, setDados] = React.useState<null | GitHubUser>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean | null>(null);
  const [dataSearch, setDataSearch] = React.useState<UserData[]>([]);

  const url = `https://api.github.com/users/${value}`;

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setDataSearch(storedUser ? JSON.parse(storedUser) : []);
  }, []);

  React.useEffect(() => {
    if (dados !== null) {
      const dataUser = {
        nome: dados.name,
        avatar: dados.avatar_url,
        login: dados.login,
        location: dados.location,
        id: dados.id,
      };
      const storedNamesString = localStorage.getItem('user');
      const storedNames = storedNamesString
        ? JSON.parse(storedNamesString)
        : [];
      storedNames.push(dataUser);
      localStorage.setItem('user', JSON.stringify(storedNames));
      setDataSearch(storedNames);
    }
  }, [dados]);

  async function require(event: React.MouseEvent) {
    event.preventDefault();
    if (value !== '') {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const json = await response.data;
        setDados(json);
        setError(false);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(true);
          throw new Error(err.message);
        } else {
          console.log('Um erro desconhecido ocorreu:', err);
        }
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            {dataSearch !== null
              ? dataSearch.map((data: UserData, index: number) => (
                  <Link key={index} to={`/perfil/${data.login}`}>
                    <Card>
                      <div>
                        <ImgCard
                          src={data.avatar ?? undefined}
                          alt="Foto Perfil"
                        />
                      </div>
                      <div style={{ marginLeft: '1rem', flex: 1 }}>
                        <Nomecard>
                          {data.login ? data.login : 'Login não informado'}
                        </Nomecard>
                        <LoCard>
                          {data.location
                            ? data.location
                            : 'Localização não informada'}
                        </LoCard>
                        <LoCard>
                          {data.nome ? data.nome : 'Nome não informado'}
                        </LoCard>
                      </div>
                      <Arrow />
                    </Card>
                  </Link>
                ))
              : null}
          </div>
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
