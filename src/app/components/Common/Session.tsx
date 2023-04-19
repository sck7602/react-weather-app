import { useEffect, useRef } from 'react';

const Session = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  function updateSession() {
    const now = new Date();
    const hour = now.getHours();

    let session;
    if (hour < 12) {
      session = 'morning';
    } else if (hour >= 12 && hour < 18) {
      session = 'afternoon';
    } else {
      session = 'evening';
    }

    if (elementRef.current) {
      elementRef.current.innerText = `Good ${session}!`;
    }
  }

  useEffect(() => {
    updateSession();
    const intervalId = setInterval(() => {
      updateSession();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return <div ref={elementRef}></div>;
};

export default Session;
