export const validators = {
  username: /^[a-z0-9]{3,10}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#\$%\^&\*])(?=.{8,})/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
