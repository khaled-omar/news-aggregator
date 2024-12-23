import HttpClient from '../utils/HttpClient'

class ArticleService {
  static async findAll(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const endpoint = `/articles${params ? `?${params}` : ''}`;
    return await HttpClient.get(endpoint).then((response) => response.data);
  }
}

export default ArticleService;
