"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/speed-reading-glimpse/expo-service-worker.js",{scope:"/speed-reading-glimpse/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}));