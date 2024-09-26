function initializeVisitorCount() {
    console.log('Initializing visitor count');
    const visitorCountElement = document.createElement('div');
    visitorCountElement.id = 'visitor-count-container';
    visitorCountElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #1a1a1a;
        color: #00ff00;
        padding: 10px;
        border-radius: 5px;
        font-family: 'Courier New', monospace;
        z-index: 1000;
    `;
    visitorCountElement.innerHTML = '<span id="visitor-count">Loading...</span> visitors';
    document.body.appendChild(visitorCountElement);
    console.log('Visitor count element added to DOM');

    // Simulate fetching the count (replace with actual API call in production)
    setTimeout(() => {
        const simulatedCount = Math.floor(Math.random() * 10000) + 1;
        const countElement = document.getElementById('visitor-count');
        if (countElement) {
            countElement.textContent = simulatedCount.toLocaleString();
            console.log('Visitor count updated:', simulatedCount);
        } else {
            console.error('Visitor count element not found');
        }
    }, 1000);
}

function updateVisitorCount() {
    console.log('Updating visitor count');
    let count = localStorage.getItem('visitorCount');
    if (count === null) {
        count = 0;
    } else {
        count = parseInt(count);
    }
    count++;
    localStorage.setItem('visitorCount', count);

    const countElement = document.getElementById('visitor-count');
    if (countElement) {
        countElement.textContent = count.toLocaleString();
        console.log('Updated visitor count to:', count);
    } else {
        console.error('Visitor count element not found');
    }
}

initializeVisitorCount(); // Make sure this line is here