export const URLS = {
    //UI
    clientPort: process.env.CLIENT_PORT ?? 3000,
    clientDomain: process.env.CLIENT_DOMAIN ?? "http://localhost",
    //SERVER
    serverPort: process.env.PORT ?? 4000,
    serverDomain: process.env.SERVER_DOMAIN ?? "http://localhost",
    //Auth                                                                                                     
    authPort: process.env.AUTH_PORT ?? 4441,
    authDomain: process.env.AUTH_DOMAIN ?? "http://localhost",
    identityPort: process.env.IDENTITY_PORT ?? 4443,
    identityDomain: process.env.IDENTITY_DOMAIN ?? "http://localhost",
    viewPort: process.env.VIEW_PORT ?? 4445,
    viewDomain: process.env.VIEW_DOMAIN ?? "http://localhost",
    postsPort: process.env.POSTS_ORT ?? 4447,
    postsDomain: process.env.POSTS_DOMAIN ?? "http://localhost",
};
