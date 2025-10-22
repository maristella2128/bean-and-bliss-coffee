import { useEffect, useState } from 'react';
import './Loading.css';

const Loading = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading ${hidden ? 'hidden' : ''}`} id="loading">
      <div className="coffee-cup"></div>
    </div>
  );
};

export default Loading;

