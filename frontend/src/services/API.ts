import axios from "axios";
import "dotenv/config";

const API = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
});

export default API;
