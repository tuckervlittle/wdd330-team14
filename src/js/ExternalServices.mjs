const baseURL = import.meta.env.VITE_SERVER_URL;

// Updated to always await the JSON and provide detailed error info
async function convertToJson(res) {
  const jsonResponse = await res.json();
  function convertToJson(res) {
    if (res.ok) {
      return jsonResponse;
    } else {
      throw { name: 'servicesError', message: jsonResponse };
    }
  }
}
  

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(`${baseURL}orders`, options);
    return await convertToJson(response);
  }
}