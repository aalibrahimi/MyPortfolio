document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
});

// Debug: Log stylesheets
window.onload = function() {
    var styles = document.styleSheets;
    console.log("Number of stylesheets: " + styles.length);
    for(var i = 0; i < styles.length; i++) {
        console.log("Stylesheet " + i + " href: " + (styles[i].href || "inline styles"));
    }
}