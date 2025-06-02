const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  const jsonResponse = res.json();
  if (jsonResponse.ok) {
    return jsonResponse
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
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
    return await fetch(`${baseURL}:3000/checkout/`, options).then(convertToJson);
  }
    async searchProducts(query) {
    const response = await fetch(`${baseURL}products/search/${query}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
