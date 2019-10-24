//prod.js do not commit
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoDB: process.env.MONGODB,
    cookieKey: process.env.COOKIE_KEY,
    stripeSecretKey: process.env.stripeSecretKey,
    stripePublishableKey: process.env.stripePublishableKey,
    sendGridKey: process.env.sendGridKey
};
