import axios from "axios";
import { MessageAI } from "./types";

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


const openAiPost = async (
  data: MessageAI[]
): Promise<ResBody> => {
  try {

    const httpAI = axios.create({
      baseURL: "https://api.openai.com/v1/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer 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",
      },
    })

    const response = await httpAI.post("chat/completions", {
      model: "gpt-3.5-turbo",
      messages: data,
    });

    const message = response.data.choices[0].message;
    return {
      success: true,
      data: message,
    };

  } catch (error) {
    console.error(error);
    throw new Error("POST request failed");
  }
};

export { post, get, openAiPost };
