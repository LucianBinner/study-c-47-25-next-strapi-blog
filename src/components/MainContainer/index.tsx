import * as Styled from './styled';

export type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer = ({ children }: MainContainerProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default MainContainer;
