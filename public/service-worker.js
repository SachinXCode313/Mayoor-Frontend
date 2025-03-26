const urlsToCache = ["/", "/assets/style.css", "/manifest.json", "/image/icon.png", "/assets/index.html"]
const CACHE_NAME = "cache"

self.addEventListener('install', (event) => {
    console.log('Inside the install handler:', event)
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
           return cache.addAll(urlsToCache)
        })
        .then(() => self.skipWaiting())
     )
  })
  
self.addEventListener('activate', (event) => {
    console.log('Inside the activate handler:', event)
    event.waitUntil(self.clients.claim())
  })
  
self.addEventListener('fetch', (event) => {
    console.log(`fetching ${event.request.url}`)
    if(navigator.onLine) { 
        let fetchRequest = event.request.clone()
        return fetch(fetchRequest)
        .then(
            function (response){
                if(!response || response.status != 200 ||response.type != 'basic'){
                    return response
                }

                let responseToCache = response.clone()
                
                caches.open(CACHE_NAME)
                .then(function(cache) {
                    cache.put(event.request, responseToCache)
                })

                return response
            }
        )
    } else {
        event.respondWith(
            caches.match(event.request)
            .then(function (response) {
                if(response){
                    return response
                }
            })
        )
    }
  })
//   self.addEventListener('push', event => {
//     const options = {
//       body: event.data.text(),
//       icon: '/image/icon.png', 
//     };
//     event.waitUntil(
//       self.registration.showNotification('Codeup', options)
//     );
//   });

// // self.addEventListener('install', (event) => {
// //     console.log('Inside the UPDATED install handler:', event)
// //   })
  