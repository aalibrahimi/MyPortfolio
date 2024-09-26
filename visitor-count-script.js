// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-YG1t_TQ4w81VTG6wL6wxRW7b4DQA",
    authDomain: "visitcount-3240b.firebaseapp.com",
    projectId: "visitcount-3240b",
    storageBucket: "visitcount-3240b.appspot.com",
    messagingSenderId: "39916605873",
    appId: "1:39916605873:web:8084ba4e88dc5fc8e309470",
    measurementId: "G-8K6GC3JE3"
};

// Import and initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function generateDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

export async function initializeVisitorCount() {
    console.log('Initializing visitor count');

    const deviceId = generateDeviceId();
    const isNewVisit = sessionStorage.getItem('visited') !== 'true';
    sessionStorage.setItem('visited', 'true');

    const visitorCountElement = document.getElementById('visitor-count');

    try {
        const visitorDoc = doc(db, 'siteData', 'visitorCount');
        const docSnap = await getDoc(visitorDoc);

        if (docSnap.exists()) {
            let data = docSnap.data();
            let count = data.count || 0;
            let devices = data.devices || {};

            if (!devices[deviceId] && isNewVisit) {
                count++;
                devices[deviceId] = true;
                await setDoc(visitorDoc, { count: count, devices: devices });
                console.log(`New visit! Count incremented to: ${count}`);
            } else {
                console.log(`Returning visit. Current count: ${count}`);
            }

            if (visitorCountElement) {
                visitorCountElement.textContent = count.toLocaleString();
            }

            console.log(`Your device ID: ${deviceId}`);
            console.log(`Total visits: ${count}`);
        } else {
            await setDoc(visitorDoc, { count: 1, devices: { [deviceId]: true } });
            console.log('Visitor count initialized to 1');
            if (visitorCountElement) {
                visitorCountElement.textContent = '1';
            }
        }
    } catch (error) {
        console.error("Error updating visitor count: ", error);
        if (visitorCountElement) {
            visitorCountElement.textContent = 'Error';
        }
    }
}

// Call the function when the script loads
initializeVisitorCount();