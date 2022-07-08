import axios from 'axios';

const submitUserDetails = (req: {[key: string] : any}) => {
  const data = JSON.stringify(req);
  
  var config = {
    method: 'post',
    url: '/default/wunderfleet-recruiting-backend-dev-save-payment-data',
    headers: { 
      "Content-Type": "application/json",
    },
    data : data
  };
  
  return new Promise((resolve, reject) => {
      axios(config)
      .then(function (response) {
       resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
  
export {submitUserDetails}