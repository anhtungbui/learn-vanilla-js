import axios from 'axios';

const url = 'https://official-joke-api.appspot.com/random_joke';

/*
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
*/
console.log('hello');
async function getRandomJoke() {
  const response = await axios(url);
  console.log(response);
}

getRandomJoke();
