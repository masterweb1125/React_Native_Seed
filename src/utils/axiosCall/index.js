import Axios from 'axios';

const baseURL = "https://demo1087320.mockable.io/products";
const AxiosCall = async requestObj => {
  const { path, method, data, contentType } = requestObj;

  const headers = {
    'Content-Type': contentType || 'application/json',
  };

  const url = `${baseURL}${path}`;
  try {
    const response = await Axios({ method, url, data, headers, json: true });
    console.log("rep", 0)
    return response;
  } catch (error) {
    console.log(error.response)
    throw error;
  }
};

export default AxiosCall;
