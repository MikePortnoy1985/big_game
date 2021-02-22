import axios from 'axios'

const instance = axios.create({
   baseURL: `https://reactmarathon-api.netlify.app/api`,
})

export const api = {
   getBoard: async () => await instance.get(`/board`),
   getEnemyPokemons: async () => await instance.get(`/create-player`),
   handleBoardClick: async params => await instance.post(`/players-turn`, params),
}
