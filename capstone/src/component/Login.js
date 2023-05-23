import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/store';

const BasicLayout = styled.div`
  height: 85vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  position: relative;
`;
const ContainerBox = styled.div`
  background-color: rgb(196, 225, 165, 0.5);
  margin: 0 auto;
  margin-top: 2rem;
`;
const InnerBox = styled.div`
  padding: 4rem;
`;
const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  margin: 1rem;
  font-size: 3rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.167;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0.35em;
`;
const Underline = styled.span`
  height: 4px;
  width: 55px;
  display: block;
  margin: 8px auto 0;
  background-color: #198754;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.87);
  padding: 0.5rem;
`;
const OtherDiv = styled(InputDiv)`
  width: 100%;
`;
const CustomInput = styled.input`
  font: inherit;
  letter-spacing: inherit;
  color: currentColor;
  box-sizing: content-box;
  height: 2.5rem;
  width: 100%;
  padding: 0;
  border: 0;
  &:focus {
    outline: 2px solid rgba(72, 116, 44, 0.5);
  }
`;
const SmallText = styled.p`
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;
const CustomLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  font-family: 'Work Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0;
  text-align: left;
`;
const AText = styled.a`
  margin: 0;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: #28282a;
  text-decoration: underline;
  text-decoration-color: rgba(40, 40, 42, 0.4);
  &:hover {
    color: rgba(40, 40, 42, 0.5);
  }
`;
const Btn = styled.button`
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  width: fit-content;
  padding: 0.5rem 2rem;
`;
const CustomBtn = styled(Btn)`
  width: 100%;
  border: 3px solid #48742c;
  background: #48742c;
  color: white;
  font-weight: 700;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
`;
const BtnGroup = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  margin: 2rem;
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://3.38.62.245:8080/login/general',
        {
          email: email,
          pw: password,
        }
      );
      // console.log('login', response);
      document.cookie = `token=${response.data.token}; path=/;`;
      dispatch(
        updateUser([
          response.data.id,
          response.data.email,
          response.data.firstname,
          response.data.lastname,
        ])
      );

      navigate(`/Farm`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BasicLayout>
      <ContainerBox>
        <InnerBox>
          <Title>
            Sign In
            <Underline></Underline>
          </Title>
          <SmallText>
            Not a member yet?&nbsp;&nbsp;
            <AText href="/signin">Sign Up here</AText>
          </SmallText>

          <SignForm onSubmit={(event) => handleSubmit(event, email, password)}>
            <OtherDiv>
              <CustomLabel>Email＊</CustomLabel>
              <CustomInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </OtherDiv>
            <OtherDiv>
              <CustomLabel>Password＊</CustomLabel>
              <CustomInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </OtherDiv>
            <BtnGroup>
              <CustomBtn type="submit">Sign up</CustomBtn>
              <CustomBtn onClick={() => navigate(`/`)}>Back</CustomBtn>
            </BtnGroup>
          </SignForm>
        </InnerBox>
      </ContainerBox>
    </BasicLayout>
  );
}

// <Button
//             type="submit"
//             variant="contained"
//             color="success"
//             disabled={loading}
//             onClick={() => {
//               axios
//                 .post("http://3.38.103.98:8080/login/general", {
//                   Email: email,
//                   PW: password,
//                 })
//                 .then((response) => {
//                   console.log(response);
//                 });
//             }}
//           ></Button>
