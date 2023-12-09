import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Rethink Sans', sans-serif;
  }
  
  body {
  margin: 0;
  background-color: rgb(245,245,245);
}

h1,h2,h3,h4,p {
  margin: 0;
}

ul, li {
  list-style: none;
  padding: 0;
  margin: 0;
}

img {
  display: block;
  max-width: 100%;
  background-size: cover;
}

a {
  text-decoration: none;
  color: white;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background:#000000;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background:#fff4dd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: white,
;
}
`