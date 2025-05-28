import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(src/assets/svg/logo.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    z-index: -1;
  }
`;

export const Content = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 2px 2px 5px -2px #777;
`;
