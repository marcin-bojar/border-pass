import { Workbox, messageSW } from 'workbox-window';

export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    const swURL = 'sw.js';
    const wb = new Workbox(swURL);
    let registration;

    const showRefreshPrompt = () => {
      if (window.confirm('Nowa wersja aplikacji dostępna, odświeżyć teraz?')) {
        wb.addEventListener('controlling', () => window.location.reload());
      }

      if (registration && registration.waiting) {
        messageSW(registration.waiting, { type: 'SKIP_WAITING' });
      }
    };

    wb.addEventListener('waiting', showRefreshPrompt);
    wb.addEventListener('externalwaiting', showRefreshPrompt);

    wb.register()
      .then(r => {
        registration = r;
        console.log(
          'Service worker registered successfully. Scope: ' + r.scope
        );
      })
      .catch(err =>
        console.log('Error occured while registering service worker: ' + err)
      );

    // window.addEventListener('load', () => {
    //   navigator.serviceWorker
    //     .register(swURL)
    //     .then(reg => {
    //       console.log(
    //         'Service worker registered successfully. Scope: ' + reg.scope
    //       );
    //     })
    //     .catch(err => {
    //       console.log('Error occured while registering service worker: ' + err);
    //     });
    // });
  }
};
