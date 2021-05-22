import React, { useContext, Suspense, lazy } from 'react';

import Loader from '../../components/loader/loader.component';
import Welcome from '../../components/welcome/welcome.component';

const AppView = lazy(() => import('../../components/app-view/app-view.component'));

import { AppContext } from '../../hooks/useAppState';

const HomePage = () => {
  const {
    userState: { currentUser, userLoading, guestUser },
  } = useContext(AppContext);

  if (userLoading) return <Loader />;
  else if (!currentUser && !guestUser) return <Welcome />;

  return (
    <div className="homepage">
      <Suspense fallback={<Loader />}>
        <AppView />
      </Suspense>
    </div>
  );
};

export default HomePage;
