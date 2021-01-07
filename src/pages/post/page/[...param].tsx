import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import HomePage from '../../../containers/HomePage';
import countAllPosts from '../../../data/posts/count-all-posts';
import getAllPosts from '../../../data/posts/get-all-posts';
import { PaginationData } from '../../../domain/posts/pagination';
import { PostData } from '../../../domain/posts/post';

export type PageProps = {
  posts: PostData[];
  category?: string;
  pagination: PaginationData;
};

export default function Page({ posts, category, pagination }: PageProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Carregando...</div>;
  if (!posts.length) return <div>Página não encontrada...</div>;

  return <HomePage posts={posts} category={category} pagination={pagination} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export type ParamsProps = {
  params: {
    param: string[];
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log(context);
  if (!context.params || !context.params.param) return { props: {} };
  const page = Number(context.params.param[0]);
  const category = context.params.param[1] || '';
  const postsPerPage = 3;
  const startFrom = (page - 1) * postsPerPage;
  const nextPage = page + 1;
  const previusPage = page - 1;
  const categoryQuery = category ? `&category.name_contains=${category}` : '';
  const urlQuery = `_sort=id:desc&_start=${startFrom}&_limit=${postsPerPage}${categoryQuery}`;
  const posts = await getAllPosts(urlQuery);
  const numberOfPosts = Number(await countAllPosts(categoryQuery));

  const pagination: PaginationData = {
    nextPage,
    numberOfPosts,
    postsPerPage,
    previusPage,
    category,
  };
  return {
    props: { posts, pagination, category },
    revalidate: 3,
  };
};
