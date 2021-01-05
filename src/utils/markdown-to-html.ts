import remark from 'remark';
import remarkHtml from 'remark-html';

// Transformando conteúdo markdown para html
export const markDownToHtml = async (content: string): Promise<string> => {
  const data = await remark().use(remarkHtml).process(content);
  return String(data.contents);
};
