import { PostData } from '../../domain/posts/post';
import { POSTS_URL } from '../../config/app-config';
import fetchJson from '../../utils/fetch-json';
import { markDownToHtml } from '../../utils/markdown-to-html';

const getPost = async (slug: string | string[]): Promise<PostData[]> => {
  const slugString = Array.isArray(slug) ? slug[0] : slug;
  const url = `${POSTS_URL}?slug=${slugString}`;
  const jsonPosts = await fetchJson<PostData[]>(url);
  const content = await markDownToHtml(jsonPosts[0].content);
  const finalContent = { ...jsonPosts[0], content };
  return [finalContent];
};

export default getPost;
