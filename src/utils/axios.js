import axios from 'axios';
//const BASE_URL = 'http://localhost:5000';
const PSP_URL = 'https://projectsharepointapi.azurewebsites.net';

export default axios.create({
    
    baseURL: PSP_URL
});

export const axiosPrivate = axios.create({
    baseURL: PSP_URL,
    headers: { 'Content-Type': 'application/json' }
});