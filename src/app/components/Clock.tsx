import { useEffect, useRef } from 'react';
import '../style.css';

function Clock(): JSX.Element {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const updateTime = () => {
    const now = new Date();
    let hour = now.getHours() % 12;
    hour = hour ? hour : 12;
    const minutes = now.getMinutes();
    const amPm = now.getHours() < 12 ? 'AM' : 'PM';
    if (elementRef.current) {
      elementRef.current.innerText = `${hour}:${
        minutes < 10 ? '0' + minutes : minutes
      } ${amPm}`;
    }
  };

  return <div ref={elementRef}></div>;
}

export default Clock;
