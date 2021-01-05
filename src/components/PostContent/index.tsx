import { Container } from './styled';

export type PostContentProps = {
  content: string;
};

export const PostContent = ({ content }: PostContentProps) => {
  return <Container dangerouslySetInnerHTML={{ __html: content }} />;
};
