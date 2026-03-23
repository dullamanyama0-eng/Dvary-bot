// Hizi hapa ni Firebase Config zako kutoka kwenye picha uliyonitumia
const firebaseConfig = {
  apiKey: "AIzaSyAD4F_K5wzHRjX9qmmT7L9-4L-T-F089kU",
  authDomain: "dvary-teacher.firebaseapp.com",
  projectId: "dvary-teacher",
  storageBucket: "dvary-teacher.firebasestorage.app",
  messagingSenderId: "777492237234",
  appId: "1:777492237234:web:a8b9a4563857d47266779e",
  measurementId: "G-ESQP4ZB7JF"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Password yako ya kuingia
const SECRET_PASSWORD = "dvary";

// Elements
const loginSection = document.getElementById('login-section');
const mainSection = document.getElementById('main-section');
const passwordInput = document.getElementById('password-input');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const progressText = document.getElementById('progress-text');

// Login Logic
function checkPassword() {
    if (passwordInput.value === SECRET_PASSWORD) {
        loginSection.style.display = 'none';
        mainSection.style.display = 'block';
    } else {
        alert('Password siyo sahihi!');
    }
}

// Upload Logic
uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Tafadhali chagua faili kwanza!');
        return;
    }

    const storageRef = storage.ref('documents/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            progressText.innerText = `Inapakia: ${progress}%`;
        }, 
        (error) => {
            console.error(error);
            alert('Imefeli! Hakikisha uliwasha Rules kule Firebase Storage kuwa TRUE.');
        }, 
        () => {
            progressText.innerText = "Imekamilika! ✅";
            alert('Hongera! Faili lako limehifadhiwa Cloud.');
            fileInput.value = ''; 
        }
    );
});
