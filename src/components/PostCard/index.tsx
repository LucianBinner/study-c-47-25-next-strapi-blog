import Link from 'next/link';
import * as Styled from './styled';

export type PostCardProps = {
  slug: string;
  title: string;
  cover: string;
};

const PostCard = ({ slug, title, cover }: PostCardProps) => {
  return (
    <Styled.Container>
      <Styled.PostCardCover>
        <Link href="/post/[slug]" as={`/post/${slug}`}>
          <a>
            <img src={cover} alt={title} />
          </a>
        </Link>
      </Styled.PostCardCover>
      <Styled.PostCardHeading>
        <Link href="/post/[slug]" as={`/post/${slug}`}>
          <a>{title}</a>
        </Link>
      </Styled.PostCardHeading>
    </Styled.Container>
  );
};

export default PostCard;
