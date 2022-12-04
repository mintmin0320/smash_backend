import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Login = () => {
  const [state, setState] = useState({
    userId: '',
    userPw: '',
    result: false,
  })

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value 
    });
  };

  // .then((response) => {
  //   // SUCCEED
  //   dispatch(loginSuccess(response, params));
  // })
  // .catch((error) => {
  //   console.log(error)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://192.168.219.100:8080/user/insert'
    const params = {
      name: state.userId,
      age: state.userPw,
    }
    try {
      const res = await axios.post(url, params);
      console.log(res);
    } catch(e) {
      console.log(e);
    }    
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const url = 'http://192.168.219.100:8080/user/insert'
  //   const params = {
  //     name: state.userId,
  //     password: parseInt(state.userPw),
  //   }
  //   console.log(params);
  //   try {
  //     const res = await axios.post(url, params);
  //     console.log(res);
  //   } catch(e) {
  //     console.log(e);
  //   }    
  // };
  

  return (
    <Container>
      <LoginBox>
        <InputBox>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={state.userId}
              name="userId"
              onChange={handleInputChange}
              required={true}   
            />
            <input
              type="text"
              value={state.userPw}
              name="userPw"
              onChange={handleInputChange}
              required={true}   
            />
            <button
              type="submit"
            >
              로그인
            </button>
          </form>
        </InputBox>
      </LoginBox>
      <Content>
        회원가입
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

const LoginBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  border-right: solid 1px black;
`

const InputBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  border-bottom: solid 1px black;
`

const Content = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
`

export default Login;