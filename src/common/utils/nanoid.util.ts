import { customAlphabet } from 'nanoid';

/**
 * Creates a custom nanoid generator with alphanumeric characters
 * @returns A function that generates a 10-character unique ID
 */
export const generateNanoid = 
customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',16);

/**
 * Generates a unique ID using nanoid
 * @returns A 10-character unique ID
 */
export const generateUniqueId = (): string => {
  return generateNanoid();
}; 