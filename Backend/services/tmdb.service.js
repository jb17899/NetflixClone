import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
    timeout: 5000,
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB.");
  }
};
