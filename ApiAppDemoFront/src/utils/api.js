export default class ApiService {
    constructor(token) {
      this.token = token;
      this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }
  
    async request(endpoint, method = 'GET', data = null) {
      const options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      };
    
      if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
      }
    
      try {
        const response = await fetch(this.baseUrl + endpoint, options);
        const contentType = response.headers.get('content-type');

        const json = contentType && contentType.includes('application/json')
          ? await response.json()
          : {};

        const responseJson = {
          ...json,
          status: response.status
        };

        return responseJson;
      } catch (error) {
          throw error;
      }
    }
  
    get(endpoint, params = {}) {
      const query = new URLSearchParams(params).toString();
      return this.request(endpoint + (query ? '?' + query : ''), 'GET');
    }
  
    post(endpoint, data) {
      return this.request(endpoint, 'POST', data);
    }
  
    put(endpoint, data) {
      return this.request(endpoint, 'PUT', data);
    }
  
    delete(endpoint) {
      return this.request(endpoint, 'DELETE');
    }
  }