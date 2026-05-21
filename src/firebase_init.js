import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, orderBy, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import firebaseConfig from '../firebase-applet-config.json';

try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    const auth = getAuth();

    window.firebaseApp = app;
    window.db = db;
    window.auth = auth;

    // Auth
    window.loginFirebase = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };
    window.registerFirebase = async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName });
        return cred;
    };
    window.logoutFirebase = async () => {
        return await signOut(auth);
    };

    window.onAuthStateChangedFirebase = (callback) => {
        return onAuthStateChanged(auth, callback);
    };

    // Database
    window.saveUserProgress = async (stats) => {
        if (!auth.currentUser) return;
        const ref = doc(db, 'user_progress', auth.currentUser.uid);
        await setDoc(ref, {
            userId: auth.currentUser.uid,
            ...stats
        }, { merge: true });
    };

    window.getUserProgress = async () => {
        if (!auth.currentUser) return null;
        const ref = doc(db, 'user_progress', auth.currentUser.uid);
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() : null;
    };

    window.getRanking = async (level) => {
        const defeatedKey = level + 'Defeated';
        const timeKey = level + 'Time';
        const q = query(
            collection(db, 'user_progress'), 
            orderBy(defeatedKey, 'desc'), 
            limit(50)
        );
        const snapshot = await getDocs(q);
        const results = [];
        snapshot.forEach(doc => results.push(doc.data()));
        
        // Sort in memory for the secondary 'time' parameter to break ties
        results.sort((a, b) => {
            const defA = a[defeatedKey] || 0;
            const defB = b[defeatedKey] || 0;
            if (defA !== defB) return defB - defA;
            const timeA = a[timeKey] || 0;
            const timeB = b[timeKey] || 0;
            return timeA - timeB;
        });

        return results.slice(0, 20);
    };
} catch (e) {
    console.error("FIREBASE INIT ERROR:", e);
    setTimeout(() => alert("Firebase init fail: " + e.message), 1000);
}
