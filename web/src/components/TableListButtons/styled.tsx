import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #ddd;
  background: #fff;

  &:hover > span {
    transform: scale(1);
    transition: ease 0.2s;
    transition-delay: 0.5s;
  }
`;

export const Label = styled.span`
  position: absolute;
  display: flex;
  max-width: 200px;
  width: max-content;
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #ddd;
  right: 100%;
  margin-right: 8px;
  align-items: center;
  transform: scale(0);

  &:after {
    position: absolute;
    content: ' ';
    display: flex;
    width: 6px;
    height: 6px;
    background: #fff;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    transform: rotate(45deg);
    right: -5px;
  }
`;

export const Icon = styled.span`
  font-size: 18px;
`;
