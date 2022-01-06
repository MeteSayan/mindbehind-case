module.exports = {
  configName: 'defaultConfig',
  admin: 'mindbehindadmin',
  adminPass: 'mindbehindadmin',
  isAdminActive: true,
  user: 'mindbehinduser',
  userPass: 'mindbehinduser',
  isUserActive: true,
  logLevels: ['error', 'warn', 'log'],
  serverConfig: {
    port: 3200,
    secondServerPort: 3201,
  },
  dbConfig: {
    dbHost: '127.0.0.1',
    dbName: 'mindbehind',
    dbUser: 'mindbehind',
    dbPass: 'mindbehind',
  },
  jwtConfig: {
    jwtKey: 'sozrJmtaHV6KVXDFkZ6z08s1oUkxT',
    jwtExp: 86400,
  },
};
