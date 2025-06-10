export default class ApiService {
    constructor(token, notify) {
      this.token = token;
      this.notify = notify;
      this.baseUrl = process.env.VUE_APP_API_BASE_URL;
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
    
        if (!response.ok) {
          let message = responseJson.message || response.statusText || 'Unknown error';
    
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
              message = 'Not Found – the resource does not exist.';
              break;
            case 500:
              message = 'Internal Server Error – try again later.';
              break;
          }
    
          if (this.notify) {
            this.notify({ title: 'Error', message, type: 'error' });
          } else {
            throw new Error(message);
          }
    
          return null;
        }
    
        if (responseJson.showMessage === true && responseJson.success === true) {
          this.notify?.({ message: responseJson.message || 'Success', type: 'success' });
        }
        else if(responseJson.success === false){
          let errorMessage = 'An error occurred';

          if (Array.isArray(responseJson.errors) && responseJson.errors.length > 0) {
            errorMessage = responseJson.errors.join(', ');
          } else if (responseJson.message) {
            errorMessage = responseJson.message;
          }

          this.notify?.({ message: errorMessage, type: 'error' });
        }

        return responseJson;
    
      } catch (error) {
        if (this.notify) {
          this.notify({ title: 'Connection Error', message: error.message, type: 'error' });
        } else {
          throw error;
        }
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