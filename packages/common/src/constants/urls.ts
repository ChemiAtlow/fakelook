const fallbackDomain = "http://localhost";
const {
    SQUASH_DOMAIN,
    CLIENT_DOMAIN = fallbackDomain,
    CLIENT_PORT = 3000,
    PORT = 4000,
    SERVER_DOMAIN = fallbackDomain,
    AUTH_PORT = 4441,
    AUTH_DOMAIN = fallbackDomain,
    IDENTITY_PORT = 4443,
    IDENTITY_DOMAIN = fallbackDomain,
    VIEW_PORT = 4445,
    VIEW_DOMAIN = fallbackDomain,
    POSTS_PORT = 4447,
    POSTS_DOMAIN = fallbackDomain,
} = process.env;
const isSquash = Boolean(SQUASH_DOMAIN);
console.log("TKDOP", isSquash, process.env.SQUASH_DOMAIN);
export const URLS = {
    //UI
    clientPort: isSquash ? 80 : CLIENT_PORT,
    clientDomain: isSquash ? `http://${SQUASH_DOMAIN}` : CLIENT_DOMAIN,
    //SERVER
    serverPort: isSquash ? 80 : PORT,
    serverDomain: isSquash ? `https://api--${SQUASH_DOMAIN}` : SERVER_DOMAIN,
    //Auth
    authPort: AUTH_PORT,
    authDomain: AUTH_DOMAIN,
    //Identity
    identityPort: IDENTITY_PORT,
    identityDomain: IDENTITY_DOMAIN,
    //View
    viewPort: VIEW_PORT,
    viewDomain: VIEW_DOMAIN,
    //Posts
    postsPort: POSTS_PORT,
    postsDomain: POSTS_DOMAIN,
};
