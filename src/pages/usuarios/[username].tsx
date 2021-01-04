import { useRouter } from 'next/router';
import { useState } from 'react';

const Username = () => {
  const [counter, setCounter] = useState(0);

  // const router = useRouter(); // Pega as informações dinâmicas da rota
  return <h1 onClick={() => setCounter(counter + 1)}>Username: {counter}</h1>;
};

export default Username;
