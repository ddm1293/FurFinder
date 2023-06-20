import axios from 'axios';

export const getBreeds = async (species) => {
  let breeds = [];
  try {
    let res;
    if (species.toLowerCase() === 'cat') {
      res = await axios.get('https://api.thecatapi.com/v1/breeds');
    } else if (species.toLowerCase() === 'dog') {
      res = await axios.get('https://api.thedogapi.com/v1/breeds');
    }
    breeds = res.data.map(breed => breed.name.toLowerCase());
    console.log('get breeds successfully');
    return breeds;
  } catch (err) {
    console.error(err);
  }
};
