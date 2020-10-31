import axios from 'axios';

const instance=axios.create({
  baseURL:'https://us-central1-clone-16b38.cloudfunctions.net/api'
  // 'http://localhost:5001/clone-16b38/us-central1/api' //the api (cloud function) URL
});

export default instance;
