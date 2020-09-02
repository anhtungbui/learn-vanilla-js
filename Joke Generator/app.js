const url = 'https://official-joke-api.appspot.com/random_joke';

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
