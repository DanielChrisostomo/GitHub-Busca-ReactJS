import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { Repo } from '../Interfaces/interface';
import UserCard from './CardSection';
import { GitHubUser } from '../Interfaces/interface';

const Maindiv = styled.main`
  max-width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: black;
  opacity: 0;
  transform: translateX(-30px);
  animation: leftRight 500ms forwards;
  @keyframes leftRight {
    to {
      opacity: initial;
      transform: initial;
    }
  }
`;
const DadosContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr;
  justify-content: center;
  padding: 4rem 1rem 4rem 10rem;
  gap: 4rem;
  width: 95vw;
  background: linear-gradient(
    135deg,
    rgba(111, 120, 255, 1) 10%,
    rgba(0, 0, 0, 1) 10%
  );
  max-width: 100vw;
  position: relative;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6rem 0 0 0;
    width: 100vw;
  }
`;
const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Imagem = styled.img`
  border-radius: 4px;
  max-width: 350px;
  max-height: 350px;
  transition: 300ms;
  &:hover {
    scale: 1.05;
  }
  @media (max-width: 1000px) {
    max-width: 200px;
    max-height: 200px;
  }
`;
const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: first baseline;
  text-align: justify;
  gap: 25px;
  padding: 2rem 0;
  @media (max-width: 1000px) {
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;
const Paragrafo = styled.p`
  font-size: 1.25rem;
  position: relative;
  color: white;
  text-overflow: ellipsis;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 4px;
    background: rgb(111, 120, 255);
    position: absolute;
    left: -17px;
    top: 10px;
    transition: 200ms;
  }
  &:hover::before {
    left: -20px;
  }
`;
const Pspan = styled.span`
  color: rgb(111, 120, 255);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DadoSpan = styled(Pspan)`
  color: white;
`;

const Btn = styled.button`
  border: none;
  outline: none;
  background-color: rgb(90, 120, 255);
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #a29bfe;
  transition: 300ms;
  cursor: pointer;
  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #a29bfe;
  }
`;

const BtnVoltar = styled(Btn)`
  background-color: black;
  position: fixed;
  top: 10px;
  left: 10px;
`;

const Perfil: React.FC = () => {
  const { id } = useParams();
  const [dados, setDados] = React.useState<GitHubUser | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [dadosRepo, setDadosRepo] = React.useState<Repo[] | null>(null);
  // const [page, setPage] = React.useState<number>(1);

  const url = `https://api.github.com/users/${id}`;
  // const urlRep = `https://api.github.com/users/${id}/repos?page=${page}`;

  React.useEffect(() => {
    async function request() {
      const response = await axios.get(url);
      const json = await response.data;
      setDados(json);
    }
    request();
  }, [url]);

  return (
    <>
      {dados === null ? null : (
        <Maindiv>
          <DadosContainer>
            <Div1>
              <picture>
                <Imagem src={dados.avatar_url} alt="Foto de Perfil" />
              </picture>
              <Link to="/">
                <BtnVoltar>Voltar</BtnVoltar>
              </Link>
            </Div1>
            <Div2>
              <Paragrafo>
                {dados.name === null ? (
                  <DadoSpan>Nome não informado</DadoSpan>
                ) : (
                  <>
                    <DadoSpan>Nome</DadoSpan> <Pspan>{dados.name}</Pspan>
                  </>
                )}
              </Paragrafo>
              <Paragrafo>
                {dados.login === null ? (
                  <DadoSpan>Usuário não informado</DadoSpan>
                ) : (
                  <>
                    <DadoSpan>Usuário</DadoSpan> <Pspan>{dados.login}</Pspan>
                  </>
                )}
              </Paragrafo>
              <Paragrafo>
                {dados.location === null ? (
                  <DadoSpan>Localização não informada</DadoSpan>
                ) : (
                  <>
                    <DadoSpan>Localização</DadoSpan>{' '}
                    <Pspan>{dados.location}</Pspan>
                  </>
                )}
              </Paragrafo>
            </Div2>
            <Div2>
              <Paragrafo>
                <DadoSpan>Id</DadoSpan> <Pspan>{dados.id}</Pspan>
              </Paragrafo>
              <Paragrafo>
                {dados.followers === null ? (
                  <DadoSpan>Seguidores não informado</DadoSpan>
                ) : (
                  <>
                    <DadoSpan>Seguidores</DadoSpan>{' '}
                    <Pspan>{dados.followers}</Pspan>
                  </>
                )}
              </Paragrafo>
              <Paragrafo>
                Total de repositórios <Pspan>{dados.public_repos}</Pspan>
              </Paragrafo>
            </Div2>
          </DadosContainer>
          <UserCard />
        </Maindiv>
      )}
    </>
  );
};

export default Perfil;
