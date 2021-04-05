import { set } from 'mongoose';
import { Workbox, messageSW } from 'workbox-window';

export const registerSW = setNewVersion => {
  if ('serviceWorker' in navigator) {
    const swURL = 'sw.js';
    const wb = new Workbox(swURL);
    let registration;

    const showRefreshPrompt = () => {
      setNewVersion({
        status: true,
        onConfirm: () => {
          setNewVersion({ status: false, onConfirm: () => {} });
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
