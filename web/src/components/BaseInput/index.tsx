import * as S from './styled';

interface BaseInputProps {
  error?: string;
  children: any;
  direction?: 'row' | 'column';
}

const BaseInput: React.FC<BaseInputProps> = ({ children, error, direction = 'column' }) => {
  return (
    <S.Container direction={direction}>
      {children}

      <S.Error>{error}</S.Error>
    </S.Container>
  );
};

export default BaseInput;
