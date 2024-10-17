import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccountToTransfer = getBankAccount(0);
    expect(() => bankAccount.transfer(2000, bankAccountToTransfer)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);
    expect(() => bankAccount.transfer(50, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.deposit(1000)
    expect(bankAccount.getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.withdraw(500)
    expect(bankAccount.getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccountToTransfer = getBankAccount(0);
    bankAccount.transfer(500, bankAccountToTransfer)
    expect(bankAccount.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    await expect(bankAccount.fetchBalance()).resolves.not.toBeNaN();
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(1000);
    await expect(bankAccount.fetchBalance()).resolves.toBe(1000);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(2000);
    await expect(bankAccount.fetchBalance()).resolves.toBe(2000);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(2000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);
    bankAccount.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
