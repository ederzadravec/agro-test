import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  line-height: 28px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const InputContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input<{
  disabled: boolean;
}>`
  height: 48px;
  width: 100%;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ disabled }) => (disabled ? '#ddd' : '#fff')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
  outline: none;

  &:focus {
    border: 1px solid #222;
  }
`;
