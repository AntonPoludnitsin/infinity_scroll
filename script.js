const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let loading = false;

// Unsplash API
const count = 10;
const apiKey = 'ZtjcHttyUIX_CAomKnM1q3sZxcjkDAwf3mNa3TqF_mE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;  
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;  
  }
}

// Function for set attributes on DOM elements
function setAttribute(element, attr) {
  for (const key in attr) {
    element.setAttribute(key, attr[key]);
  }
}

// Create Elements for links and photos, add to DOM
function displayPhotos() {  
  imagesLoaded = 0;
  totalImages = photosArray.length; 
  photosArray.forEach((photo) => {
    // Create <a> to link unsplash 
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank'
    })
    // Create <img> for photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

// Get photos
async function getPhotos() {  
  try {
    loading = true;
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    loader.hidden = false;
    displayPhotos();
    loading = false;
  } catch (err) {
    console.error(err)
  }
}

// check bottom page, Load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && ready && !loading) {
    getPhotos();
  }
})

getPhotos();
