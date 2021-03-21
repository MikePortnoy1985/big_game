import axios from 'axios'

const instance = axios.create({
   baseURL: `https://reactmarathon-api.herokuapp.com/api`,
})

export const herokuApi = {
   starterPack: async () => {
      const response = await instance.get(`pokemons/starter`)
      return response.data
   },
}
