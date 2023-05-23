import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BasicLayout = styled.div`
  height: 85vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  position: relative;
`;
const ContainerBox = styled.div`
  background-color: rgb(129, 184, 168, 0.4);
  margin: 0 auto;
  margin-top: 2rem;
  padding: 1rem; /* 간격을 더 넓히는 패딩 값 설정 */
`;
const InnerBox = styled.div`
  padding-top: 2rem;
  padding-left: 4rem;
  padding-right: 4rem;
`;
const SignForm = styled.form`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  margin: 1rem;
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.3rem;

  font-weight: 700;
  line-height: 1.167;
  color: rgba(0, 0, 0, 0.87);
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0.35em;
`;
const Underline = styled.span`
  height: 4px;
  width: 200px;
  display: block;
  margin: 8px auto 0;
  background-color: rgb(50, 110, 98);
`;
const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  padding-top: 1.5rem;
`;
const CustomInput = styled.input`
  letter-spacing: 0.3rem;
  font-size: 1rem;
  font-weight: 600px;

  color: currentColor;
  box-sizing: content-box;
  height: 3.5rem;
  width: 100%;

  border: 0;
  &:focus {
    outline: 2px solid rgba(72, 116, 44, 0.5);
  }
`;
const SmallText = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;
const CustomLabel = styled.label`
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;

  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  letter-spacing: 0.1rem;
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
  background: rgb(50, 110, 98);
  color: white;
  font-weight: 700;
  margin: 0.3rem 0.5rem 1rem 0.5rem;
  &:hover {
    box-shadow: 0 0 11px rgba(0, 0, 0, 1);
  }
  margin-top: 3rem;
  height: 3.5rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.1rem;
`;
const BtnGroup = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  margin: 1rem;
`;
export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e, email, password, firstName, lastName) => {
    e.preventDefault();

    console.log(email, password, firstName, lastName);
    try {
      const response = await axios.post('http://localhost:8080/register/user', {
        email: email,
        pw: password,
        firstname: firstName,
        lastname: lastName,
      });
      console.log(response.data);
      navigate(`/login`);
    } catch (error) {
      console.error(error);
      // 회원가입 실패시 처리 로직
    }
  };

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    };
  }, []);

  return (
    <BasicLayout>
      <ContainerBox>
        <InnerBox>
          <Title>
            Sign up
            <Underline></Underline>
          </Title>
          <SmallText>
            <AText href="/login">Already have an account?</AText>
          </SmallText>
          <SignForm
            onSubmit={(e) =>
              handleSubmit(e, email, password, firstName, lastName)
            }
          >
            <InputGroup>
              <InputDiv>
                <CustomLabel>First Name＊</CustomLabel>
                <CustomInput
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputDiv>
              <InputDiv>
                <CustomLabel>Last Name＊</CustomLabel>
                <CustomInput
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputDiv>
            </InputGroup>
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
              <CustomBtn sx={{ backgroundColor: '#326E62' }} type="submit">
                Sign up
              </CustomBtn>
              <CustomBtn
                sx={{ backgroundColor: '#F9BAB1' }}
                onClick={() => navigate(`/`)}
              >
                Back
              </CustomBtn>
            </BtnGroup>
          </SignForm>
        </InnerBox>
      </ContainerBox>
    </BasicLayout>
  );
}
