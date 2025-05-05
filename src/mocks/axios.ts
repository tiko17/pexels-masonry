import { AxiosInstance } from 'axios';

interface MockAxios extends AxiosInstance {
  create: jest.Mock;
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
  request: jest.Mock;
  isAxiosError: jest.Mock;
}

const mockAxios: MockAxios = {
  create: jest.fn(() => mockAxios),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  request: jest.fn(),
  isAxiosError: jest.fn(),
  defaults: {
    headers: {
      common: {}
    }
  }
} as MockAxios;

export default mockAxios; 