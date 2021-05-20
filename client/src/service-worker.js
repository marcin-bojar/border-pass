import { Workbox, messageSW } from 'workbox-window';

export const registerSW = setGeneralState => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV);
    const swURL = 'sw.js';
    const wb = new Workbox(swURL);
    let registration;

    const showRefreshPrompt = () => {
      setGeneralState({
        type: 'NEW_VERSION_AVAILABLE',
        payload: () => {
          setGeneralState({ type: 'UPDATED_TO_NEW_VERSION' });
          wb.addEventListener('controlling', () => window.location.reload());

          if (registration && registration.waiting) {
            messageSW(registration.waiting, { type: 'SKIP_WAITING' });
          }
        },
      });
    };

    wb.addEventListener('waiting', showRefreshPrompt);
    wb.addEventListener('externalwaiting', showRefreshPrompt);

    wb.register()
      .then(r => {
        registration = r;
        console.log('Service worker registered successfully.');
      })
      .catch(err => console.log('Error occured while registering service worker: ' + err));
  }
};
