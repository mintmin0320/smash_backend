import React from 'react';
import styled from 'styled-components';
import CentOS from '../images/CentOS.jpeg'

const Home = () => {
  return (
    <Container>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("${CentOS}");
  background-repeat: no-repeat;
  /* background-position: top center; */
  background-size: 100vmax;
  /* background-attachment: fixed; */
`



export default Home;