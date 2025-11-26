// lib/axios.ts
import axios from 'axios';

// Substitua pelo IP da sua máquina se estiver rodando local
const BASE_URL = 'http://192.168.18.245:4000'; 

export const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para adicionar token (vamos implementar Auth depois)
api.interceptors.request.use(async (config) => {
  // Logica futura para pegar token do AsyncStorage
  return config;
});