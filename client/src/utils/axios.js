import axios from "axios";

export const serverRequest = axios.create({
  baseURL: "https://groupchat.tatang.online",
});
