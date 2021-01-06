import { screen } from '@testing-library/react';
import { Heading } from '.';
import { customRender } from '../../utils/custon-render';

describe('<Heading />', () => {
  it('should render a heading', () => {
    customRender(<Heading>Olá</Heading>);
    const element = screen.getByRole('heading', { name: 'Olá' });
    // expect(element).toBeInTheDocument();
    expect(element).toHaveStyleRule('font-size', '5rem');
  });
});
