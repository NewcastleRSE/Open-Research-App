module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3b0c993312109e6794989ee2c3c35c78'),
  },
});
