import axios from 'axios';

export default class NewQuery {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getPhotoPixabay() {

    const options = {
      params: {
        key: '14167175-fc0e53a7a7b8f01fb7f615bad',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        q: `${this.searchQuery}`,
        page: `${this.page}`,
        per_page: 40,
      },
    }

    const request = await axios.get('https://pixabay.com/api/', options);
    this.page += 1;

    return request.data;
  }

  resetQuery() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


/* return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
  .then(response => {
    this.page += 1;
    return response.json();
  });
 */