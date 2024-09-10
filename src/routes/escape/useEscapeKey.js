import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function useEscapeKey() {
  const history = useHistory();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        history.goBack(); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [history]);
}

export default useEscapeKey;
