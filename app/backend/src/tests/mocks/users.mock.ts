const invalidPassword = {
  email: 'admin@admin.com',
  password: '123456',
};

const invalidEmail = {
  email: 'teste@teste.com',
  password: 'secret_admin',
};

const userValid = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const validBodyLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export { invalidPassword, invalidEmail, userValid, validBodyLogin };
