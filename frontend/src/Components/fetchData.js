import axios from 'axios';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data.recordset;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default fetchData;