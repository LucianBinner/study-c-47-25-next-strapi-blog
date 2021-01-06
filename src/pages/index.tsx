import { GetStaticProps } from 'next';
import HomePage from '../containers/HomePage';
import getAllPosts from '../data/posts/get-all-posts';
import { PostData } from '../domain/posts/post';

export type HomeProps = {
  posts: PostData[];
};

export default function Home({ posts }: HomeProps) {
  return <HomePage posts={posts} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts('_sort=id:desc&_start=0&_limit=10');
  return {
    props: { posts },
    revalidate: 10, // Revalida a página a cada 60 segundos
  };
};
