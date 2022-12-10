import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faFolder, faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <Container>
      <Content>
        <LeftBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faUser} size="3x" color="#81BEF7" />
              </IconBox>
              <NameBox>마이페이지</NameBox>
            </MainBox>
          </MidBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faFolder} size="3x" color="#81BEF7" />
              </IconBox>
              <NameBox>독수리</NameBox>
            </MainBox>
          </MidBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faFolder} size="3x" color="#81BEF7" />
              </IconBox>
              <NameBox>꿩</NameBox>
            </MainBox>
          </MidBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faFolder} size="3x" color="#81BEF7" />
              </IconBox>
              <NameBox>닭</NameBox>
            </MainBox>
          </MidBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faFolder} size="3x" color="#81BEF7" />
              </IconBox>
              <NameBox>따오기</NameBox>
            </MainBox>
          </MidBox>
          <MidBox>
            <MainBox>
              <IconBox>
                <FontAwesomeIcon icon={faPowerOff} size="3x" color="#D8D8D8" />
              </IconBox>
              <NameBox>로그아웃</NameBox>
            </MainBox>
          </MidBox>
        </LeftBox>
        <RighttBox>
          <RightTop>
            여긴 달력을 두자
          </RightTop>
          <RightBottom>
            <BlankBox />
            <LogoBox>
              logo
            </LogoBox>
          </RightBottom>
        </RighttBox>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: center;
  /* align-items: center; */
  background: #EFFBFB;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`
// 폴더 

const RighttBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const RightTop = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: center;
`

const RightBottom = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`

const BlankBox = styled.div`
  width: 70%;
  height: 100%;
`

const LogoBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`


const LeftBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border-right: solid 1px lightgray; */
`

const MidBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
`

const MainBox = styled.div`
  width: 30%;
  height: 100%;
  /* border-bottom: solid 1px black;  */
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover{  
    border: solid #FAFAFA;
  }
`

const IconBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NameBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
`



export default Home;