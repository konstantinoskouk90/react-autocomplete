import { Http, httpService } from './http.service';

export type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

export type OmdbSearchResponse = {
  Response: 'True' | 'False';

  Error?: string;
  Search?: Movie[];
  totalResults?: string;
};

class ApiService {
  constructor(private readonly httpService: Http) { }

  async omdbSearch(searchTerm: string): Promise<Movie[]> {
    const { body: response } = await this.httpService.request<OmdbSearchResponse>({
      url: `http://www.omdbapi.com/?s=${ searchTerm }&apikey=ede02668`,
      method: 'GET',
    });

    const { Response, Search } = response;

    if (Response === 'True' && Search) {
      return Search;
    }

    return [];
  }
}

export const api = new ApiService(httpService);
export type Api = ApiService;