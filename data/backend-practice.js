// This create a new HTTP message to send to the backend, also known as a request, 
const xhr = new XMLHttpRequest();

//Once we set the parameters, we get the response of the backend, this code just runs when the response is loaded. we use the event listener to run when the response is loaded, once is loaded the we execute the code inside the brackets, this code console.log the response from the backend
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); // this set the parameters, the type of request and the url of the backend's computer
xhr.send(); // this send the reques to the backed across the internet