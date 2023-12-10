import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { GitHubUser, Repo } from '../Interfaces/interface';
import Loader from '../Helper/Loader';
import moment from 'moment';

const SectionRepos = styled.section`
  background: black;
  color: white;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  animation: leftUp ease-in 1350ms forwards;
  @keyframes leftUp {
    to {
      opacity: initial;
      transform: initial;
    }
  }
`;

const DivTitulo = styled.div`
  color: white;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 60vw;
  margin: 0 auto;
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
  margin: 0 auto;
  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #a29bfe;
  }
`;

const ArticleRepos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const Pspan = styled.span`
  color: rgb(111, 120, 255);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Card = styled.div`
  width: 450px;
  height: 300px;
  margin-right: 20px;
  margin-left: 20px;
  background-image: linear-gradient(
    163deg,
    rgb(111, 120, 255) 0%,
    #3700ff 100%
  );
  border-radius: 20px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 30px 1px rgba(111, 120, 255, 0.3);
  }
  @media (max-width: 1000px) {
    width: 300px;
    height: 300px;
    &:hover {
      box-shadow: 0px 0px 50px 1px rgba(111, 120, 255, 0.3);
    }
  }
`;
const UList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 450px;
  height: 300px;
  padding: 2rem;
  border-radius: 10px;
  gap: 10px;
  margin-right: 20px;
  background: linear-gradient(
    -135deg,
    rgba(111, 120, 255, 1) 10%,
    rgba(20, 20, 20, 1) 10%
  );
  transition: all 0.2s;
  &:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }
  @media (max-width: 1000px) {
    width: 300px;
    height: 300px;
  }
`;
const Imagem = styled.img`
  border-radius: 4px;
  max-width: 350px;
  max-height: 350px;
  transition: 300ms;
  &:hover {
    scale: 1.05;
  }
`;
const ImagemCard = styled(Imagem)`
  max-width: 50px;
  max-height: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: ease 1000ms;
  &:hover {
    scale: 4;
    border-radius: 50%;
  }
`;
const ListItem = styled.li`
  color: white;
  position: relative;
  margin-left: 8px;
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 4px;
    background: rgb(111, 120, 255);
    position: absolute;
    left: -20px;
    top: 7px;
    @media (max-width: 1000px) {
      font-size: 13px;
    }
  }
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const UserCard = () => {
  const { id } = useParams();
  const [dados, setDados] = React.useState<GitHubUser | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [dadosRepo, setDadosRepo] = React.useState<Repo[] | null>(null);
  const [page, setPage] = React.useState<number>(1);

  const url = `https://api.github.com/users/${id}`;
  const urlRep = `https://api.github.com/users/${id}/repos?page=${page}`;

  React.useEffect(() => {
    async function request() {
      const response = await axios.get(url);
      const json = await response.data;
      setDados(json);
    }
    request();
  }, [url]);

  React.useEffect(() => {
    async function requestRepos() {
      try {
        setLoading(true);
        const response = await axios.get(urlRep);
        const json = await response.data;
        if (dadosRepo === null) {
          setDadosRepo(json);
        } else setDadosRepo([...dadosRepo, ...json]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    requestRepos();
  }, [page]);

  function handleNext() {
    axios.get(urlRep).then((res) => {
      if (res && res.data.length < 30) {
        return null;
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    });
  }

  // dadosRepo?.map((dado, index)=>{
  //   const x = dado.created_at;
  //   const y = dado.updated_at;
  //   x.moment().format('lll');  // Dec 9, 2023 6:34 PM
  // })

  return (
    <>
      {dados === null ? null : (
        <SectionRepos>
          <DivTitulo>
            <h1>
              Repositórios de <Pspan>{dados.login}</Pspan>
            </h1>
          </DivTitulo>
          <ArticleRepos>
            {dadosRepo === null
              ? null
              : dadosRepo.map((repos) => (
                  <Card key={repos.id}>
                    <a href={repos.html_url}>
                      <UList>
                        <ListItem>
                          Nome <Pspan>{repos.name}</Pspan>
                        </ListItem>
                        <ListItem>
                          Linguagem <Pspan>{repos.language}</Pspan>
                        </ListItem>
                        <ListItem>
                          Data de Criação{' '}
                          <Pspan>
                            {moment(repos.created_at).format('lll')}
                          </Pspan>
                        </ListItem>
                        <ListItem>
                          Último update{' '}
                          <Pspan>
                            {moment(repos.updated_at).format('lll')}
                          </Pspan>
                        </ListItem>
                        <ListItem>
                          Descrição <Pspan>{repos.description}</Pspan>
                        </ListItem>
                        <ImagemCard
                          src={dados.avatar_url}
                          alt="Foto de Perfil"
                        />
                      </UList>
                    </a>
                  </Card>
                ))}
          </ArticleRepos>
          {loading && <Loader />}
          <BtnDiv>
            <Btn onClick={handleNext}>Próximos</Btn>
          </BtnDiv>
        </SectionRepos>
      )}
    </>
  );
};

export default UserCard;
