import axios from 'axios';
import { PexelsResponse, PhotoSearchParams, PexelsError, Photo } from '../types/pexels';
import { DEFAULT_PAGE, ITEMS_PER_PAGE, INTERNAL_SERVER_ERROR, ERROR_MESSAGES } from '../constants/api';

const { DEFAULT_ERROR, UNEXPECTED_ERROR, API_ERROR } = ERROR_MESSAGES;

const API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

// Cache implementation
export const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const isCacheValid = (timestamp: number) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

export const getPhotoById = async (id: string): Promise<Photo> => {
  const cacheKey = `photo_${id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  try {
    const { data } = await api.get<Photo>(`/photos/${id}`);
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(API_ERROR, error.response?.data);
      throw {
        error: error.response?.data?.error || DEFAULT_ERROR,
        status: error.response?.status || INTERNAL_SERVER_ERROR,
      } as PexelsError;
    }
    throw {
      error: UNEXPECTED_ERROR,
      status: INTERNAL_SERVER_ERROR,
    } as PexelsError;
  }
};

export const searchPhotos = async (params: PhotoSearchParams): Promise<PexelsResponse> => {
  const cacheKey = `search_${JSON.stringify(params)}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  try {
    const { data } = await api.get<PexelsResponse>('/search', {
      params: {
        query: params.query,
        page: params.page || DEFAULT_PAGE,
        per_page: params.per_page || ITEMS_PER_PAGE,
        orientation: params.orientation,
        size: params.size,
        color: params.color,
        locale: params.locale,
      },
    });
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(API_ERROR, error.response?.data);
      throw {
        error: error.response?.data?.error || DEFAULT_ERROR,
        status: error.response?.status || INTERNAL_SERVER_ERROR,
      } as PexelsError;
    }
    throw {
      error: UNEXPECTED_ERROR,
      status: INTERNAL_SERVER_ERROR,
    } as PexelsError;
  }
};

export const getCuratedPhotos = async (page: number = DEFAULT_PAGE, perPage: number = ITEMS_PER_PAGE): Promise<PexelsResponse> => {
  const cacheKey = `curated_${page}_${perPage}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData && isCacheValid(cachedData.timestamp)) {
    return cachedData.data;
  }

  try {
    const { data } = await api.get<PexelsResponse>('/curated', {
      params: {
        page,
        per_page: perPage,
      },
    });
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(API_ERROR, error.response?.data);
      throw {
        error: error.response?.data?.error || DEFAULT_ERROR,
        status: error.response?.status || INTERNAL_SERVER_ERROR,
      } as PexelsError;
    }
    throw {
      error: UNEXPECTED_ERROR,
      status: INTERNAL_SERVER_ERROR,
    } as PexelsError;
  }
}; 