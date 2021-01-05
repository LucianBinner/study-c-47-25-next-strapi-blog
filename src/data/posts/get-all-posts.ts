import { PostData } from '../../domain/posts/post';
import { POSTS_URL } from '../../config/app-config';
import fetchJson from '../../utils/fetch-json';

const getAllPosts = async (query = ''): Promise<PostData[]> => {
  const url = `${POSTS_URL}?&${query}`;
  const posts = await fetchJson<PostData[]>(url);
  return posts;
};

export default getAllPosts;
