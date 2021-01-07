import Link from 'next/link';
import { PaginationData } from '../../domain/posts/pagination';
import { Container, NextLink, PreviusLink } from './styled';

export type PaginationProps = PaginationData;

const Pagination = ({
  nextPage,
  numberOfPosts,
  postsPerPage,
  previusPage,
  category,
}: PaginationData) => {
  const categoryName = category || '';
  const nextLink = `/post/page/${nextPage}/${categoryName}`;
  const previusLink = `/post/page/${previusPage}/${categoryName}`;
  const hasNextPage = nextPage * postsPerPage < postsPerPage + numberOfPosts;
  const hasPreviusPage = previusPage >= 1;
  return (
    <Container>
      {hasPreviusPage && (
        <PreviusLink>
          <Link as={previusLink} href="/post/page/[...param]">
            <a>Previus</a>
          </Link>
        </PreviusLink>
      )}
      {hasNextPage && (
        <NextLink>
          <Link as={nextLink} href="/post/page/[...param]">
            <a>Next</a>
          </Link>
        </NextLink>
      )}
    </Container>
  );
};

export default Pagination;
