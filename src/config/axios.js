import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://gwx-bounty-bot-node-staging.ap-northeast-1.elasticbeanstalk.com/api'
})

export default instance
