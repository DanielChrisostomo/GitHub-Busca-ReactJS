import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, Helvetica, sans-serif;
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
`