import React from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

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
`

const DadosContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  padding: 4rem 1rem 4rem 10rem ;
  gap: 3rem;
  width: 95vw;
  background: linear-gradient(135deg, rgba(111,120,255,1) 10%, rgba(0,0,0,1) 10%);
  max-width: 100vw;
  position: relative;
`

const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Imagem = styled.img`
border-radius: 4px;
  max-width: 350px;
  max-height: 350px;
  transition: 300ms;
  &:hover {
    scale: 1.05;
  }
`

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: first baseline;
  text-align: justify;
  gap: 20px;
  padding: 2rem 0;
`

const Paragrafo = styled.p`
  font-size: 1.25rem;
  position: relative;
  color: white;
  &::before{
    content: '';
    display: inline-block;
    width: 8px;
    height: 4px;
    background: rgb(111,120,255);
    position: absolute;
    left: -17px;
    top: 7px;
    transition: 200ms;
  }
  &:hover::before{
    left: -20px;
  }
`
const Pspan = styled.span`
  color:  rgb(111,120,255);
`

const SectionRepos = styled.section`
  background: black;
  color: white;
`
const DivTitulo = styled.div`
  color: white;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 60vw;
  margin: 0 auto;
`

const Btn = styled.button`
  border: none;
  outline: none;
  background-color: rgb(90,120,255);
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
  &:hover {
    scale: 1.05;
  }
 `

const BtnVoltar = styled(Btn)`
background-color: black;
position: fixed;
top: 10px;
left: 10px;
`

const ArticleRepos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 2rem;
`
const Card = styled.div`
  width: 360px;
  height: 260px;
  background-image: linear-gradient(163deg, rgb(111,120,255) 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all .3s;
  &:hover {
  box-shadow: 0px 0px 30px 1px rgba(111,120,255, 0.30);
}
`
const UList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 360px;
  height: 260px;
  padding: 2rem;
  border-radius: 10px;
  gap: 20px;
  background: linear-gradient(-135deg, rgba(111,120,255,1) 10%, rgba(20,20,20,1) 10%);
 transition: all .2s;
 &:hover {
 transform: scale(0.98);
 border-radius: 20px;
}
`
const ListItem = styled.li`
  color: white;
  position: relative;
  &::before{
    content: '';
    display: inline-block;
    width: 8px;
    height: 4px;
    background: rgb(111,120,255);
    position: absolute;
    left: -17px;
    top: 6px;
  }
`

const Perfil = () => {
  
  const { id } = useParams();
  const [dados, setDados] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [dadosRepo , setDadosRepo] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [ativo, setAtivo] = React.useState(false);

  const url = `https://api.github.com/users/${id}`
  const urlRep = `https://api.github.com/users/${id}/repos?page=${page}`

  React.useEffect(()=>{
    async function request() {
      const response = await axios.get(url);
      const json = await response.data
      setDados(json)
    }
    request();
  },[])

  React.useEffect(()=>{
    async function requestRepos() {
      const response = await axios.get(urlRep);
      const json = await response.data;
      setDadosRepo(json);
    }
    requestRepos();
  },[page])

  function handleNext(){
    if(dadosRepo.length < 30) {
      return null;
    } else {
      setPage((page)=> page + 1)
    }
  }

  function handlePrev(){
    if(page <= 1) {
      return null;
    } else {
      setPage((page)=> page - 1)
    }
  }

  return (
    <>
    {dados === null ? null : 

<Maindiv>

    <DadosContainer>
      <Div1>
       <picture>
       <Imagem src={dados.avatar_url} alt="Foto de Perfil" />
       </picture>
       <Link to='/'><BtnVoltar>Voltar</BtnVoltar></Link>

      </Div1>
      <Div2>
       <Paragrafo>Nome: <Pspan>{dados.name}</Pspan></Paragrafo>
        <Paragrafo>Usuário: <Pspan>{dados.login}</Pspan></Paragrafo>
        <Paragrafo>Localização: <Pspan>{dados.location}</Pspan></Paragrafo>
        <Paragrafo>Id: <Pspan>{dados.id}</Pspan></Paragrafo>
        <Paragrafo>Seguidores: <Pspan>{dados.followers}</Pspan></Paragrafo>
        <Paragrafo>Total de repositórios: <Pspan>{dados.public_repos}</Pspan></Paragrafo>
        </Div2>
    </DadosContainer>

    {dadosRepo === null ? null : 
      <SectionRepos>
      <DivTitulo>
        <Btn onClick={handlePrev}>Anteriores</Btn>
      <h1 style={{marginBottom: '10px'}}>Repositórios de <Pspan>{dados.name}</Pspan></h1>
        <Btn onClick={handleNext}>Próximos</Btn>
      </DivTitulo>

      <ArticleRepos>
        {dadosRepo.map((repos) => 
        <Card key={repos.id}><a href={repos.html_url}><UList >
          <ListItem>Nome: <Pspan>{repos.name}</Pspan></ListItem> 
          <ListItem>Linguagem: <Pspan>{repos.language}</Pspan></ListItem> 
          <ListItem>Data de Criação: <Pspan>{repos.created_at}</Pspan></ListItem>
          <ListItem>Último update: <Pspan>{repos.updated_at}</Pspan></ListItem>
          <ListItem>Descrição: <Pspan>{repos.description}</Pspan></ListItem>
          
          </UList></a></Card>)}
        </ArticleRepos>
    </SectionRepos>}
    </Maindiv>
    }
    </>
  )
}

export default Perfil