console.log('begin');
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js',  {
        scope: '.' // <--- THIS BIT IS REQUIRED
    })
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.log('service worker not registered', err));
}