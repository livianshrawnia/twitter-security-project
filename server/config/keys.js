module.exports = {
  app: {
    name: 'Mern Ecommerce',
    apiURL: `${process.env.BASE_API_URL}`,
    serverURL: process.env.BASE_SERVER_URL
  },
  port: process.env.PORT || 5000,
  database: {
    url: {
      app : process.env.MONGODB_APP_URL
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  }
};
