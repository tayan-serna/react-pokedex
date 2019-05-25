import { validateEmail , validateStrongPass } from './utils';

describe('utils tests', () => {
  describe('validate email test', () => {
    it('shoul be true if is a valid email', () => {
      expect(validateEmail('adrian@adrian.com')).toBe(true);
      expect(validateEmail('adrian_adrian@adrian.com')).toBe(true);
      expect(validateEmail('adrian.adrian@adrian.co')).toBe(true);
    });
    it('shoul be false if is a invalid email', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('adrian_adrian@adrian.c')).toBe(false);
      expect(validateEmail('adrian.adrian')).toBe(false);
    });
  });
  describe('validate strong pass', () => {
    it('should be true if the password is strong enough', () => {
      expect(validateStrongPass('AA1*asdf')).toBe(true);
      expect(validateStrongPass('Aas*A123as')).toBe(true);
    });
    it('should be false it the password is not strong enough', () => {
      expect(validateStrongPass('123')).toBe(false);
      expect(validateStrongPass('asdasd')).toBe(false);
      expect(validateStrongPass('A1*asdfasd')).toBe(false);
    });
  });
});
