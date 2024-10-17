import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});
describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue('');
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi('/mockPath');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue('');
    const axiosGetSpy = jest.spyOn(axios, 'get');
    jest.advanceTimersByTime(5000);
    await throttledGetDataFromApi('/mockPath');
    expect(axiosGetSpy).toHaveBeenCalledWith('/mockPath');
  });

  test('should return response data', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest
      .fn()
      .mockResolvedValue({ status: 200, data: 'responseData' });
    jest.advanceTimersByTime(5000);
    const response = await throttledGetDataFromApi('mockPath');
    expect(response).toBe('responseData');
  });
});
