// https://nextjs.org/docs/basic-features/data-fetching

// // Forma antiga de se trazer os posts, pois o conteúdo não será localizado por SEO no browser
// import { useEffect, useState } from 'react';
// import { PostData } from '../domain/posts/post';

// const getPosts = async (): Promise<PostData[]> => {
//   const posts = await fetch('https://peaceful-river-13360.herokuapp.com/posts');
//   const jsonPosts = await posts.json();
//   return jsonPosts;
// };

// export default function Home() {
//   const [posts, setPosts] = useState<PostData[]>();

//   useEffect(() => {
//     getPosts().then((response) => setPosts(response));
//   }, [posts]);

//   return (
//     <div>
//       {posts?.map((post) => (
//         <h2 key={post.slug}>{post.title}</h2>
//       ))}
//     </div>
//   );
// }

// Forma nova de renderização, no next possuimos duas formas de gerar páginas estáticas, a primeira é SG (static generation) e o segundo é o SSR (server-side rendering)
// Static generation -> As páginas estáticas são geradas no momento em que é realizado o 'build' da aplicação.
// Server-side rendering -> As páginas são renderizadas por acesso, ou seja, se no site houver 10 mil acessos, as páginas acessadas serão renderizadas 10 mil vezes pelo servidor, isso pode comprometer o desempenho do servidor.

// SSG (Server-Side Rendering) - getStaticProps
import { GetStaticProps } from 'next';
import { PostData } from '../domain/posts/post';

const getPosts = async (): Promise<PostData[]> => {
  const posts = await fetch('https://peaceful-river-13360.herokuapp.com/posts');
  const jsonPosts = await posts.json();
  return jsonPosts;
};

export type HomeProps = {
  posts: PostData[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <div>
      {posts?.map((post) => (
        <h2 key={post.slug}>{post.title}</h2>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
