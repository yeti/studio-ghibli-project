import { HttpService } from '../Http/Http.service';

export interface GhibliFilm {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

export class GhibliService {
  private httpService: HttpService;
  private baseUrl = 'https://ghibliapi.vercel.app';

  constructor() {
    this.httpService = new HttpService();
  }

  async getFilm(id: string): Promise<GhibliFilm | null> {
    try {
      const response = await this.httpService.get({
        endpoint: `${this.baseUrl}/films/${id}`,
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching film ${id}:`, error);

      // Handle specific HTTP errors
      if (error.response?.status === 404) {
        throw new Error(`Film with ID ${id} not found`);
      }
      if (error.response?.status >= 500) {
        throw new Error('Studio Ghibli API is currently unavailable');
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('Unable to connect to Studio Ghibli API');
      }

      throw new Error('Failed to fetch film data');
    }
  }

  async getAllFilms(): Promise<GhibliFilm[]> {
    try {
      const response = await this.httpService.get({
        endpoint: `${this.baseUrl}/films`,
      });
      return response.data;
    } catch (error: any) {
      console.error('Error fetching all films:', error);

      // Handle specific HTTP errors
      if (error.response?.status >= 500) {
        throw new Error('Studio Ghibli API is currently unavailable');
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('Unable to connect to Studio Ghibli API');
      }

      throw new Error('Failed to fetch films data');
    }
  }
}
