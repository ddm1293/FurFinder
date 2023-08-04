import axios from 'axios'

export const fetchPetFromThread = async (threads) => {
  console.log(threads, 4);
  const petPromises = threads.map((thread) => axios.get(`http://localhost:3001/pet/${thread.pet}`))
  const petResponses = await Promise.all(petPromises);
  const pets = petResponses.map((res) => res.data);
  return threads.map((thread, index) => ({
    ...thread,
    pet: pets[index]
  }));
}
