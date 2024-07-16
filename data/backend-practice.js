// Get to rquest the data or information that is the backed
const xhr = new XMLHttpRequest();

//Here we get the response of the backend, this code just runs when the response is loaded.
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); // this set the parameters, the type of request and the url of the backend's computer
xhr.send(); // this send the reques to the backed across the internet