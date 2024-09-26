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

export async function initializeVisitorCount() {
    console.log('Initializing visitor count');

    // Get the visitor count element
    const visitorCountElement = document.getElementById('visitor-count');

    if (visitorCountElement) {
        try {
            // Fetch visitor count from Firestore
            const visitorDoc = doc(db, 'siteData', 'visitorCount');
            const docSnap = await getDoc(visitorDoc);

            if (docSnap.exists()) {
                let count = docSnap.data().count;
                count++;

                // Update Firestore with the new visitor count
                await setDoc(visitorDoc, { count: count });

                // Update the visitor count on the page
                visitorCountElement.textContent = count.toLocaleString();
            } else {
                console.error("No visitor count found in Firestore!");
                // Initialize the count if it doesn't exist
                await setDoc(visitorDoc, { count: 1 });
                visitorCountElement.textContent = '1';
            }
        } catch (error) {
            console.error("Error fetching or updating visitor count: ", error);
        }
    } else {
        console.error("Visitor count element not found!");
    }
}