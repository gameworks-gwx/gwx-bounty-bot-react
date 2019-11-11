import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bounty-staging.gameworks.io/api'
})

export default instance
