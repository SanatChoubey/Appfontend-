// import axios from 'axios'
import axios from 'axios';
const fetchfunction  = (method,  path, data) => {
  //transaction
  const baseUrl = "http://appwrkbackend.herokuapp.com/transaction"
  console.log(method, baseUrl+path, data)
  return axios({
    method: method,
    url: baseUrl,
    data
    
  }).then((result)=>{
    return result
  }).catch((e)=>{
    return e.message
  })
}
export default fetchfunction;
