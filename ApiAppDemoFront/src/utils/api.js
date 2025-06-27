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

        if (response.status >= 400) {
          let message = 'An error occurred';

          switch (response.status) {
            case 400:
              message = responseJson.message || 'Bad Request';
              break;
            case 401:
              message = 'Unauthorized – please login again.';
              break;
            case 403:
              message = 'Forbidden – you do not have access.';
              break;
            case 404:
              console.log(response.status);
              message = 'Not Found – the resource does not exist.';
              break;
            case 500:
              message = 'Internal Server Error – try again later.';
              break;
          }

          alert(message )
        }

        else if (responseJson.Errors && Array.isArray(responseJson.Errors)) {
          responseJson.Errors.forEach(message => {
            if (this.notify) {
              alert(message);
            }
          });
        }

        return responseJson;
      } catch (error) {
        alert('Network Error ' + error.message);
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