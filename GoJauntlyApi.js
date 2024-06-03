const fs = require('fs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const ALGORITHM = 'ES256';
const BASE_API = "https://connect.gojauntly.com";

class HttpMethod {
    static GET = 'get';
    static POST = 'post';
}

class GoJauntlyApiError extends Error { }

class GoJauntlyApi {
    constructor(keyId, keyFile, issuerId) {
        this.token = null;
        this.tokenGenDate = null;
        this.exp = null;
        this.keyId = keyId;
        this.keyFile = keyFile;
        this.issuerId = issuerId;
        this.debug = false;
        this.generateToken(); // generate first token
    }

    generateToken() {
        let key;
        try {
            key = fs.readFileSync(this.keyFile, 'utf8');
        } catch (error) {
            key = this.keyFile; // Use the key directly if file read fails
        }
        this.tokenGenDate = new Date();
        const exp = Math.floor(this.tokenGenDate.getTime() / 1000) + 20 * 60;
        const payload = {
            iss: this.issuerId,
            exp: exp,
            aud: 'gojauntly-api-v1'
        };
        const headers = {
            kid: this.keyId,
            typ: 'JWT'
        };
        this.token = jwt.sign(payload, key, { algorithm: ALGORITHM, header: headers });
    }

    async apiCall(url, method, data = null) {
        this.refreshTokenIfNeeded();
        const fullUrl = `${BASE_API}${url}`;
        const headers = {
            Authorization: `Bearer ${this.token}`
        };

        if (this.debug) {
            console.log(fullUrl);
        }

        try {
            const response = await axios({
                method: method,
                url: fullUrl,
                headers: headers,
                data: data
            });

            if (response.headers['content-type'].includes('application/json')) {
                const payload = response.data;
                if (payload.errors) {
                    throw new GoJauntlyApiError(payload.errors[0].detail || 'Unknown error');
                }
                return payload;
            } else {
                throw new GoJauntlyApiError(`HTTP error [${response.status}][${response.statusText}]`);
            }
        } catch (error) {
            if (error.response) {
                throw new GoJauntlyApiError(`HTTP error [${error.response.status}][${error.response.statusText}]`);
            }
            throw error;
        }
    }

    refreshTokenIfNeeded() {
        const now = new Date();
        if (!this.token || (this.tokenGenDate.getTime() + 15 * 60000 < now.getTime())) {
            this.generateToken();
        }
    }

    async curatedWalkSearch(data) {
        return await this.apiCall('/curated-walks/search', HttpMethod.POST, data);
    }

    async curatedWalkRetrieve(id, data) {
        return await this.apiCall(`/curated-walks/${id}`, HttpMethod.POST, data);
    }

    async dynamicRoutesRoute(data) {
        return await this.apiCall('/routing/route', HttpMethod.POST, data);
    }

    async dynamicRoutesCircular(data) {
        return await this.apiCall('/routing/circular', HttpMethod.POST, data);
    }

    async dynamicRoutesCircularCollection(data) {
        return await this.apiCall('/routing/circular/collection', HttpMethod.POST, data);
    }
}

module.exports = GoJauntlyApi;
