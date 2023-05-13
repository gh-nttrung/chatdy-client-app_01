import axios from "axios";

export interface ResBody {
  success: boolean;
  data?: any;
  message?: string | null;
  error?: Error | null;
}

const API_CONFIG = {
  baseURL: "http://localhost:5555/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

const http = axios.create(API_CONFIG);

const post = async (
  url: string,
  data: any
): Promise<ResBody> => {
  try {
    const response = await http.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("POST request failed");
  }
};

const get = async (
  url: string,
  params = {}
): Promise<ResBody> => {
  try {
    const response = await http.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("GET request failed");
  }
};

export { post, get };
