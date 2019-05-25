export const validateEmail = (email = '') => /^[\w\d-.]+@[\w]+\.[\w]{2,}$/.test(email.trim());
export const validateStrongPass = (pass) => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return strongRegex.test(pass);
};
