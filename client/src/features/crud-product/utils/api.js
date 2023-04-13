import axios from "axios";

export const getAllFeatures = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/feature/get-all-features"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
