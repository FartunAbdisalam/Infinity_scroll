const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

const count = 30;
const apiKey= 'rgWX02C3jeLtEkCopJBLJDRitcHYpdHiCrYQdKAWNSo';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready= false;
let imgsLoaded=0;
let totalImgLoaded=0;
let photosArray = [];


function imgLoaded()
{
  imgsLoaded++;
  console.log(imgsLoaded);
  if(imgsLoaded===totalImgLoaded)
  {
    ready= true;
    loader.hidden= true;
  }

}

//helper function to set all attributes to an element
function setAttributes(element, attributes) {
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imgsLoaded=0;
  totalImgLoaded = photosArray.length;

  photosArray.forEach((photo) => {

    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener('load',  imgLoaded);
    
   //put img tag inside a tag, then put both inside img-container
   item.appendChild(img);
   imgContainer.appendChild(item);

  })
}

async function getPhotos() {

  try{

    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

  } catch(error)
  {

  }
}

//check if scroll near bottom, if yes load more
window.addEventListener('scroll',() => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
  { 
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();