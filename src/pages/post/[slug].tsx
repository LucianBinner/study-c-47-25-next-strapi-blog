import { useRouter } from 'next/router';
import Error from 'next/error';
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
  const router = useRouter();

  if (router.isFallback) {
    return <div>Páginas ainda carregando, por favor aguarde.</div>;
  }

  if (!post?.title) {
    return <Error statusCode={404} />;
  }

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
    fallback: true, // false - Envia para 404 caso a página não exista
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params === undefined || context.params.slug === undefined)
    return { props: {} };
  const posts = await getPost(context.params.slug); // É necessário fazer typeguard para corrigir o erro
  const post = posts.length > 0 ? posts[0] : {};
  return {
    props: { post },
    revalidate: 10,
  };
};
