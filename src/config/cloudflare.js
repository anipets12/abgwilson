export const cloudflareConfig = {
    accountId: process.env.CF_ACCOUNT_ID,
    apiToken: process.env.CF_API_TOKEN
};
export const getAssetFromKV = async (key) => {
    try {
        return await ASSETS.get(key);
    }
    catch (error) {
        console.error('KV fetch error:', error);
        return null;
    }
};
export const queryD1 = async (query) => {
    try {
        return await DB.prepare(query).run();
    }
    catch (error) {
        console.error('D1 query error:', error);
        throw error;
    }
};
