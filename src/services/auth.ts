import { User } from "../contexts/auth";
import api from "./api";

interface Response {
  message: string;
  token?: string;
  user?: User;
}

export async function loginRequest(body: object): Promise<Response> {
  try {
    const response = await api.post("/user/login", body);
    return response.data;
  } catch (error) {
    return error;
  }
}
