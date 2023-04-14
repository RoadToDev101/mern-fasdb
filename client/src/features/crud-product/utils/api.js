import axios from "axios";

export const getAllFeatures = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/others/get-all-features"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getApplications = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/others/get-applications"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
