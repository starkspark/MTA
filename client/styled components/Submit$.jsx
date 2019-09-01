import styled from 'styled-components';

// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `


const SubmitButton = styled.button`
  width: 280px;
  height: 60px;
  font-size: 18px;
  border-radius: 5px;
  outline: none;
  background: none;
  border: solid 2px #fff;
  // border-width: 2px;
  color: #fff;
  align-self: center;
  transition: .25s ease-in-out;

  ${SubmitButton}:hover{
    cursor: pointer;
    background: #fff;
    color: #1C2434;
    transition: .25s ease-in-out;
  }
  `

  export default SubmitButton;