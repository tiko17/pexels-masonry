import axios from 'axios';
import { PexelsResponse, PhotoSearchParams, PexelsError } from '../types/pexels';
import { DEFAULT_PAGE, ITEMS_PER_PAGE, INTERNAL_SERVER_ERROR, ERROR_MESSAGES } from '../constants/api';

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

const BASE_URL = 'https://api.pexels.com/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

export const searchPhotos = async (params: PhotoSearchParams): Promise<PexelsResponse> => {
  try {
    const { 
      query: searchQuery,
      page: currentPage = DEFAULT_PAGE,
      per_page: itemsPerPage = ITEMS_PER_PAGE,
      orientation: photoOrientation,
      size: photoSize,
      color: photoColor,
      locale: languageLocale
    } = params;

    const { data } = await api.get<PexelsResponse>('/search', {
      params: {
        query: searchQuery,
        page: currentPage,
        per_page: itemsPerPage,
        orientation: photoOrientation,
        size: photoSize,
        color: photoColor,
        locale: languageLocale,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(ERROR_MESSAGES.API_ERROR, error.response?.data);
      throw {
        error: error.response?.data?.error || ERROR_MESSAGES.DEFAULT_ERROR,
        status: error.response?.status || INTERNAL_SERVER_ERROR,
      } as PexelsError;
    }
    throw {
      error: ERROR_MESSAGES.UNEXPECTED_ERROR,
      status: INTERNAL_SERVER_ERROR,
    } as PexelsError;
  }
};

export const getCuratedPhotos = async (page: number = DEFAULT_PAGE, perPage: number = ITEMS_PER_PAGE): Promise<PexelsResponse> => {
  try {
    const { data } = await api.get<PexelsResponse>('/curated', {
      params: {
        page,
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(ERROR_MESSAGES.API_ERROR, error.response?.data);
      throw {
        error: error.response?.data?.error || ERROR_MESSAGES.DEFAULT_ERROR,
        status: error.response?.status || INTERNAL_SERVER_ERROR,
      } as PexelsError;
    }
    throw {
      error: ERROR_MESSAGES.UNEXPECTED_ERROR,
      status: INTERNAL_SERVER_ERROR,
    } as PexelsError;
  }
}; 