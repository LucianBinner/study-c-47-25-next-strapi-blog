import { Container } from './styled';
import { DiscussionEmbed } from 'disqus-react';
import { SITE_URL } from '../../config/app-config';

export type CommentsProps = {
  slug: string;
  title: string;
};

export const Comments = ({ slug, title }: CommentsProps) => {
  console.log(SITE_URL);
  return (
    <Container>
      <DiscussionEmbed
        shortname="meublog-6"
        config={{
          url: `${SITE_URL}/post/${slug}`,
          identifier: slug,
          title: title,
          language: 'pt_BR',
        }}
      />
    </Container>
  );
};
