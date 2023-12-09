import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 5px solid rgba(111, 86, 255, 1) 96%;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 0 auto;
  z-index: 10;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <Loading></Loading>;
};

export default Loader;
