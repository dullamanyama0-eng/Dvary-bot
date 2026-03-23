// 1. WEKA CONFIG YAKO YA FIREBASE HAPA
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "yako.firebaseapp.com",
    projectId: "yako",
    storageBucket: "yako.appspot.com",
    messagingSenderId: "123456",
    appId: "1:12345:web:abc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Password ya kuingilia (Unaweza kuibadilisha)
const SECRET_PASSWORD = "dvary"; 

function checkPassword() {
    const input = document.getElementById('passInput').value;
    if (input === SECRET_PASSWORD) {
        document.getElementById('loginBox').classList.add('hidden');
        document.getElementById('vaultBox').classList.remove('hidden');
    } else {
        alert("Password siyo sahihi! Jaribu tena.");
    }
}

function uploadToFirebase() {
    const file = document.getElementById('fileChooser').files[0];
    if (!file) return alert("Chagua faili kwanza!");

    const status = document.getElementById('statusText');
    const storageRef = storage.ref('documents/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            status.innerText = "Inapakia: " + Math.round(progress) + "%";
        }, 
        (error) => { alert("Imefeli: " + error.message); }, 
        () => {
            status.innerText = "Imekamilika! ✅";
            // Ongeza faili kwenye list ya chini
            const li = document.createElement('li');
            li.innerText = "📄 " + file.name;
            document.getElementById('fileList').appendChild(li);
        }
    );
}
