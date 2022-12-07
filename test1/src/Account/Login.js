import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Login = () => {
  const btnRed = "red"
  const btnOrange = "orange"
  const btnGreen = "green"
  const textMint = "mint"
  const textGreen = "green"
  const textYellow = "yellow"
  const now = new Date();
  const nowDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'medium' }).format(now);

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
    } catch (e) {
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
        <MenubarBox>
          <ButtonBox>
            <MenuButton btnColor={btnRed} />
            <MenuButton btnColor={btnOrange} />
            <MenuButton btnColor={btnGreen} />
          </ButtonBox>
        </MenubarBox>
        <InputBox>
          <HeaderShellBox>
            Welcome to 나's!&nbsp;&nbsp;{nowDate}
          </HeaderShellBox>
          <ShellBox>
            <ShellTextBox TextColor={textGreen}>login-checking id</ShellTextBox>&nbsp;&nbsp;
            <ShellTextBox TextColor={textYellow}>~/www/domain/com</ShellTextBox>&nbsp;&nbsp;
            <ShellTextBox TextColor={textMint}>(main)</ShellTextBox>
          </ShellBox>
          <ShellBox>
            $
          </ShellBox>
          <br />
          <ShellBox>
            <ShellTextBox TextColor={textGreen}>login-checking password</ShellTextBox>&nbsp;&nbsp;
            <ShellTextBox TextColor={textYellow}>~/www/domain/com</ShellTextBox>&nbsp;&nbsp;
            <ShellTextBox TextColor={textMint}>(main)</ShellTextBox>
          </ShellBox>
          <ShellBox>
            $
          </ShellBox>
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
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginBox = styled.div`
  width: 55%;
  height: 65%;
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  border-radius: 13px;
  background: black;
  `

const MenubarBox = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  border-bottom: solid 1px black;
  border-radius: 13px 13px 0px 0px;
  background: #585858;
`

const ButtonBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-right: solid 1px black;
`

const MenuButton = styled.button`
  width: 10%;
  height: 50%;
  display: flex;
  border: solid 1px black;
  border-radius: 50%;
  background: ${(props => (props.btnColor === "red" ? "#F78181" : props.btnColor === "orange" ? "#F7BE81" : "#01DF01"))};
`

const InputBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: solid 1px black;
  `

const HeaderShellBox = styled.div`
  width: 98.5%;
  height: 10%;
  display: flex;
  /* align-items: center; */
  font-size: 20px;
  color: white;
`

const ShellBox = styled.div`
  width: 98.5%;
  /* height: 8%; */
  display: flex;
  /* align-items: center; */
  font-size: 20px;
  color: white;
`

const ShellTextBox = styled.div`
  font-size: 20px;
  color: ${(props => (props.TextColor === "green" ? "#82FA58" : props.TextColor === "yellow" ? "#D7DF01" : "#00FFBF"))};
`

export default Login;