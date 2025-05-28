import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-top: 12px;
  padding: 8px;
`;

export const Pages = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  gap: 4px;
`;

export const Page = styled.div<{ active?: boolean; disabled?: boolean; noAnimate?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  text-align: center;
  font-size: 14px;
  border-radius: 8px;
  transition: ease 0.2s;
  border: 1px solid ${({ theme }) => theme.palette.text.dark};
  color: ${({ theme }) => theme.palette.text.dark};

  ${({ active, disabled, noAnimate }) => {
    if (active) {
      return css`
        cursor: not-allowed;
        color: ${({ theme }) => theme.palette.colors.purple.main};
        border: 1px solid ${({ theme }) => theme.palette.colors.purple.main};
        background: ${({ theme }) => theme.palette.colors.purple.text};
      `;
    }

    if (disabled) {
      return css`
        cursor: not-allowed;
        border: 1px solid ${({ theme }) => theme.palette.disabled.main};
        background: ${({ theme }) => theme.palette.disabled.text};
      `;
    }

    if (!noAnimate) {
      return css`
        cursor: pointer;

        &:hover {
          transform: translateY(-4px) scale(1.1);
        }
      `;
    }

    return '';
  }}
`;

export const Icon = styled.span<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => (disabled ? theme.palette.disabled.main : theme.palette.text.dark)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
