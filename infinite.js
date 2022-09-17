// Fetching photos from Unsplash API
const count = 30;
const apiKey = 'KRq50hQm2eumJjK6vPravfOh5UWcguHIiBBhJdgJFb4';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photos = [];

const fetchPhoto = async () => {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
}

//grabbing and creating HTML elements to populate photos with
const imageContainer = document.querySelector('.image-container');
// loader element to display till images are ready in imageloaded function
const loader = document.querySelector('.loading');

const displayPhotos = () => {
    totalImages = photos.length;
    loadedImage = 0;

    photos.forEach(photo => {
        const imageLink = document.createElement('a');
        imageLink.setAttribute('href', photo.links.html);
        imageLink.setAttribute('target', '_blank');
        imageLink.classList.add('image-link');

        const image = document.createElement('img');
        image.classList.add('image');
        image.setAttribute('src', photo.urls.regular);
        image.setAttribute('alt', photo.alt_description);
        image.setAttribute('title', photo.alt_description);

        // to ensure images load successfully and completely before loading more
        image.addEventListener('load', imageLoaded());

        //appending elements into image container for display
        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
    });
}

// letting images load successfully and completely before loading more
let loadedImage = 0;
let totalImages = 0;
let ready = false;

const imageLoaded = () => {
    loadedImage++;
    if (loadedImage === totalImages) {
        ready = true;
        loader.style.display = 'none';
    }
}


//fetching and displaying more photos when window is scrolled to near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        fetchPhoto();
    }
});

// On Load
fetchPhoto();