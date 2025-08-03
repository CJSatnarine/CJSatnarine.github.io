// Refreshes the page when the browser is resized. 
window.addEventListener('resize', function(event) {
    if (window.RT) {
        clearTimeout(window.RT);
    }

    window.RT = setTimeout(function() {
        window.location.reload(false); /* false to get page from cache */
    }, 200);
});
