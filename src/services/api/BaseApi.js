import axios from "axios";
import { BASE_URL } from "./config";
import { setupInterceptors } from "./interceptors";

class BaseApi {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    setupInterceptors(this.axiosInstance);
  } // fim construtor

  //metodo para realizar requisições GET
  async get(url) {
    const response = await this.axiosInstance.get(url);
    return response.data;
  }

  async post(url, data) {
    const response = await this.axiosInstance.post(url, data);
    return response.data; // retorna o data do response
  }

  async put(url, data) {
    const response = await this.axiosInstance.put(url, data);
    return response.data; // retorna o data do response
  }

  async delete(url) {
    const response = await this.axiosInstance.delete(url);
    return response.data; // retorna o data do response
  }
}

export default BaseApi // exportamos a classe para uso externo