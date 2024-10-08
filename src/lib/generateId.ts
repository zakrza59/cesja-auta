import { customAlphabet } from 'nanoid';

export const generateId = (): string => {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
  return nanoid();
};
