import { Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/app/app';
import Loading from '@/app/components/Common/Loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
