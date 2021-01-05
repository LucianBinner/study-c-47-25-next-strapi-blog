import { GetServerSideProps } from 'next';
import HomePage from '../../containers/HomePage';
import getAllPosts from '../../data/posts/get-all-posts';
import { PostData } from '../../domain/posts/post';

export type CategoryProps = {
  posts: PostData[];
  category: string;
};

export default function Category({ posts, category }: CategoryProps) {
  return <HomePage posts={posts} category={category} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category;
  const urlQuery = `_sort=id:desc&_start=0&_limit=10&category.name_contains=${category}`;
  const posts = await getAllPosts(urlQuery);
  return {
    props: { posts, category },
  };
};
