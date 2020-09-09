import test from './test';
import axios from 'axios';

console.log(test);

const url = 'https://official-joke-api.appspot.com/random_joke';

async function getRandomJoke() {
  const response = await axios(url);
  console.log(response.data);
}

getRandomJoke();
