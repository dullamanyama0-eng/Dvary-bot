const API_KEY = 'WEKA_API_KEY_YAKO_HAPA'; 
const grid = document.getElementById('wallpaper-grid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

async function getPhotos(query = "nature") {
    grid.innerHTML = "<p>Inatafuta...</p>";
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
    
    try {
        const res = await fetch(url, {
            headers: { Authorization: API_KEY }
        });
        const data = await res.json();
        renderPhotos(data.photos);
    } catch (err) {
        grid.innerHTML = "<p>Tatizo la mtandao!</p>";
    }
}

function renderPhotos(photos) {
    grid.innerHTML = "";
    photos.forEach(photo => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${photo.src.large}" alt="${photo.alt}">
            <a href="${photo.src.original}" target="_blank" class="download-btn">Download HD</a>
        `;
        grid.appendChild(div);
    });
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value) getPhotos(searchInput.value);
});

// Anza na picha za "Abstract" app ikifunguka
getPhotos("abstract");

