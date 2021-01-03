/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-54a91e90'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "index.html",
    "revision": "146ea58da3f8db29e6e8f2084c1f2e44"
  }, {
    "url": "src.86ca9a9b.js",
    "revision": "f4e224220b6e70b3d7efed867117df4e"
  }, {
    "url": "src.e382586c.css",
    "revision": "74bf4a75d0632d61337a447cb3115e86"
  }, {
    "url": "transfer128.c7852c06.png",
    "revision": "5d9987036509f8f81729090a495ff3d2"
  }, {
    "url": "transfer192.f27219e9.png",
    "revision": "6664d4086d654caf31a991601e90beeb"
  }, {
    "url": "transfer24.4237128c.png",
    "revision": "6d9f672ee21f69940b730d2a3094bf32"
  }, {
    "url": "transfer256.ea453af5.png",
    "revision": "1a704d3ce7c653bf48fa1c10400801dc"
  }, {
    "url": "transfer32.7b0a8e83.png",
    "revision": "b243882faa03ae34ba89b9536f1eae8d"
  }, {
    "url": "transfer512.f70e61ef.png",
    "revision": "ac88d8fe056c96d916af8dbf558a514d"
  }, {
    "url": "transfer64.9c176f02.png",
    "revision": "c2be155426a4ca72d62944cabf6d5e47"
  }], {});
  workbox.cleanupOutdatedCaches();

});
//# sourceMappingURL=sw.js.map
