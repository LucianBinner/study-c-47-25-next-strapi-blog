import { GetStaticPaths, GetStaticProps } from 'next';
import { Post } from '../../containers/Post';
import countAllPosts from '../../data/posts/count-all-posts';
import getAllPosts from '../../data/posts/get-all-posts';
import getPost from '../../data/posts/get-post';
import { PostData } from '../../domain/posts/post';

export type DynamicPostProps = {
  post: PostData;
};

const DynamicPost = ({ post }: DynamicPostProps) => {
  return <Post post={post} />;
};

export default DynamicPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPosts = await countAllPosts();
  const posts = await getAllPosts(`_limit=${numberOfPosts}`);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPost(context.params.slug); // É necessário fazer typeguard para corrigir o erro
  return {
    props: { post: posts[0] },
  };
};
