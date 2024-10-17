import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(jest.fn(), 10);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 10);
    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 10);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(jest.fn(), 10);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 10);
    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.unmock('path');
    const path = jest.requireActual('path');
    const joinSpy = jest.spyOn(path, 'join');
    const testFile = 'test.txt';
    await readFileAsynchronously(testFile);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, testFile);
  });

  test('should return null if file does not exist', async () => {
    jest.unmock('fs');
    const fs = jest.requireActual('fs');
    fs.existsSync = jest.fn(() => false);
    const fileContent = await readFileAsynchronously("testFile.txt");
    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedFileContent = 'Mocked file content';
    require('fs').existsSync = jest.fn(() => true);
    require('fs/promises').readFile = jest.fn().mockResolvedValue(mockedFileContent);
    const fileContent = await readFileAsynchronously("testFile.txt");
    expect(fileContent).toBe(mockedFileContent);
  });
});
