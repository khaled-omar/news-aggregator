import HttpClient from "../utils/HttpClient";

class ArticleService {
  static async findAll(filters = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        value.forEach((item) => params.append(`${key}[]`, item));
      } else {

        params.append(key, value);
      }
    }

    const endpoint = `/articles?${params.toString()}`;
    console.log("Constructed URL:", endpoint
    return await HttpClient.get(endpoint).then((response) => response.data);
  }
}

export default ArticleService;
