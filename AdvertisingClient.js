const querystring = require('querystring');
const needle = require("needle");
const zlib = require('zlib');
const JSONbig = require('json-bigint')({ storeAsString: true });
const { setIntervalAsync } = require('set-interval-async/dynamic')

const bigIntFields = {
    keywordId: true,
    adGroupId: true,
    campaignId: true
}

function queryfy(data) {
    var params = "";
    if (data) {
        params = "?" + querystring.stringify(data);
    }
    return params;
}

function parseBigIntFields(obj) {
    if (Array.isArray(obj)) {
        obj.forEach(parseBigIntFields);
        return;
    }
    Object.keys(obj).forEach(k => {
        if (bigIntFields[k]) {
            obj[k] = BigInt(obj[k]);
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Regions = {
    na: {
        prod: 'advertising-api.amazon.com',
        sandbox: 'advertising-api-test.amazon.com',
        tokenUrl: 'api.amazon.com/auth/o2/token',
    },
    eu: {
        prod: 'advertising-api-eu.amazon.com',
        sandbox: 'advertising-api-test.amazon.com',
        tokenUrl: 'api.amazon.co.uk/auth/o2/token',
    },
    fe: {
        prod: 'advertising-api-fe.amazon.com',
        sandbox: 'advertising-api-test.amazon.com',
        tokenUrl: 'api.amazon.com/auth/o2/token',
    }
}

module.exports = class AdvertisingClient {

    constructor(options) {

        this.options = options

        this.options.clientId = options.clientId || process.env.AMAZON_CLIENT_ID;
        this.options.clientSecret = options.clientSecret || process.env.AMAZON_CLIENT_SECRET;
        this.options.maxWaitTime = options.maxWaitTime || 1000 * 60 * 2;
        this.options.maxRetry = options.maxRetry || 10;

        this.tokenUrl = Regions[options.region].tokenUrl;

        if (options.sandbox) {
            this.endpoint = Regions[options.region].sandbox;
        } else {
            this.endpoint = Regions[options.region].prod;
        }
    }

    async init() {
        await this.refresh();
        setIntervalAsync(this.refresh.bind(this), 2000 * 60)
    }

    register() {
        return this.apiRequest(`profiles/register`, { countryCode: this.options.region }, 'PUT');
    }
    listProfiles() {
        return this.apiRequest(`v2/sp/profiles`, null, 'GET');
    }
    registerProfile(data) {
        return this.apiRequest(`v2/sp/profiles/register`, data, `PUT`);
    }
    registerProfileStatus(profileId) {
        return this.apiRequest(`v2/sp/profiles/register/${profileId}/status`, null, 'GET');
    }
    getProfile(profileId) {
        return this.apiRequest(`v2/sp/profiles/${profileId}`, null, 'GET');
    }
    updateProfiles(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/profiles`, data, `PUT`);
    }
    getCampaign(campaignId) {
        return this.apiRequest(`v2/sp/campaigns/${campaignId}`, null, 'GET');
    }
    getCampaignEx(campaignId) {
        return this.apiRequest(`v2/sp/campaigns/extended/${campaignId}`, null, 'GET');
    }
    createCampaigns(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/campaigns`, data, `POST`);
    }
    updateCampaigns(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/campaigns`, data, `PUT`);
    }
    archiveCampaign(campaignId) {
        return this.apiRequest(`v2/sp/campaigns/${campaignId}`, null, `DELETE`);
    }
    listSpCampaigns(data) {
        return this.apiRequest(`v2/sp/campaigns${queryfy(data)}`, null, 'GET');
    }
    listCampaignsEx(data) {
        return this.apiRequest(`v2/sp/campaigns/extended${queryfy(data)}`, null, 'GET');
    }
    getAdGroup(adGroupId) {
        return this.apiRequest(`v2/sp/adGroups/${adGroupId}`, null, 'GET');
    }
    getAdGroupEx(adGroupId) {
        return this.apiRequest(`v2/sp/adGroups/extended/${adGroupId}`, null, 'GET');
    }
    createAdGroups(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/adGroups`, data, `POST`);
    }
    updateAdGroups(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/adGroups`, data, `PUT`);
    }
    archiveAdGroup(adGroupId) {
        return this.apiRequest(`v2/sp/adGroups/${adGroupId}`, null, `DELETE`);
    }
    listAdGroups(data) {
        return this.apiRequest(`v2/sp/adGroups${queryfy(data)}`, null, 'GET');
    }
    listAdGroupsEx(data) {
        return this.apiRequest(`v2/sp/adGroups/extended${queryfy(data)}`, null, 'GET');
    }
    getBiddableKeyword(keywordId) {
        return this.apiRequest(`v2/sp/keywords/${keywordId}`, null, 'GET');
    }
    getBiddableKeywordEx(keywordId) {
        return this.apiRequest(`v2/sp/keywords/extended/${keywordId}`, null, 'GET');
    }
    createBiddableKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/keywords`, data, `POST`);
    }
    updateBiddableKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/keywords`, data, `PUT`);
    }
    updateBiddableTargets(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/targets`, data, `PUT`);
    }
    archiveBiddableKeyword(keywordId) {
        return this.apiRequest(`v2/sp/keywords/${keywordId}`, null, `DELETE`);
    }
    listBiddableKeywords(data) {
        return this.apiRequest(`v2/sp/keywords${queryfy(data)}`, null, 'GET');
    }
    listBiddableKeywordsEx(data) {
        return this.apiRequest(`v2/sp/keywords/extended${queryfy(data)}`, null, 'GET');
    }
    getNegativeKeyword(keywordId) {
        return this.apiRequest(`v2/sp/negativeKeywords/${keywordId}`, null, 'GET');
    }
    getNegativeKeywordEx(keywordId) {
        return this.apiRequest(`v2/sp/negativeKeywords/extended/${keywordId}`, null, 'GET');
    }
    createNegativeKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/negativeKeywords`, data, `POST`);
    }
    updateNegativeKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/negativeKeywords`, data, `PUT`);
    }
    archiveNegativeKeyword(keywordId) {
        return this.apiRequest(`v2/sp/negativeKeywords/${keywordId}`, null, `DELETE`);
    }
    listNegativeKeywords(data) {
        return this.apiRequest(`v2/sp/negativeKeywords${queryfy(data)}`, null, 'GET');
    }
    listNegativeKeywordsEx(data) {
        return this.apiRequest(`v2/sp/negativeKeywords/extended${queryfy(data)}`, null, 'GET');
    }
    getCampaignNegativeKeyword(keywordId) {
        return this.apiRequest(`v2/sp/campaignNegativeKeywords/${keywordId}`, null, 'GET');
    }
    getCampaignNegativeKeywordEx(keywordId) {
        return this.apiRequest(`v2/sp/campaignNegativeKeywords/extended/${keywordId}`, null, 'GET');
    }
    createCampaignNegativeKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/campaignNegativeKeywords`, data, `POST`);
    }
    updateCampaignNegativeKeywords(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/campaignNegativeKeywords`, data, `PUT`);
    }
    removeCampaignNegativeKeyword(keywordId) {
        return this.apiRequest(`v2/sp/campaignNegativeKeywords/${keywordId}`, null, `DELETE`);
    }
    listCampaignNegativeKeywords(data) {
        return this.apiRequest(`v2/sp/campaignNegativeKeywords${queryfy(data)}`, null, 'GET');
    }
    listCampaignNegativeKeywordsEx(data) {
        return this.apiRequest(`v2/sp/campaignNegativeKeywords/extended${queryfy(data)}`, null, 'GET');
    }
    getProductAd(productAdId) {
        return this.apiRequest(`v2/sp/productAds/${productAdId}`, null, 'GET');
    }
    getProductAdEx(productAdId) {
        return this.apiRequest(`v2/sp/productAds/extended/${productAdId}`, null, 'GET');
    }
    createProductAds(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/productAds`, data, `POST`);
    }
    updateProductAds(data) {
        parseBigIntFields(data);
        return this.apiRequest(`v2/sp/productAds`, data, `PUT`);
    }
    archiveProductAd(productAdId) {
        return this.apiRequest(`v2/sp/productAds/${productAdId}`, null, `DELETE`);
    }
    listProductAds(data) {
        return this.apiRequest(`v2/sp/productAds${queryfy(data)}`, null, 'GET');
    }
    listProductAdsEx(data) {
        return this.apiRequest(`v2/sp/productAds/extended${queryfy(data)}`, null, 'GET');
    }
    getAdGroupBidRecommendations(adGroupId) {
        return this.apiRequest(`v2/sp/adGroups/${adGroupId}/bidRecommendations`, null, 'GET');
    }
    getKeywordBidRecommendations(keywordId) {
        return this.apiRequest(`v2/sp/keywords/${keywordId}/bidRecommendations`, null, 'GET');
    }
    bulkGetKeywordBidRecommendations(data) {
        return this.apiRequest(`v2/sp/keywords/bidRecommendations`, data, `POST`);
    }
    getAdGroupKeywordSuggestions(adGroupId, data) {
        return this.apiRequest(`v2/sp/adGroups/${adGroupId}/suggested/keywords${queryfy(data)}`, null, 'GET');
    }
    getAdGroupKeywordSuggestionsEx(adGroupId, data) {
        return this.apiRequest(`v2/sp/adGroups/${adGroupId}/suggested/keywords/extended${queryfy(data)}`, null, 'GET');
    }
    getAsinKeywordSuggestions(asin, data) {
        return this.apiRequest(`v2/sp/asins/${asin}/suggested/keywords${queryfy(data)}`, null, 'GET');
    }
    bulkGetAsinKeywordSuggestions(data) {
        return this.apiRequest(`v2/sp/asins/suggested/keywords`, data, `POST`);
    }
    requestSnapshot(campaignType, recordType, data) {
        return this.apiRequest(`v2/${campaignType}/${recordType}/snapshot`, data, `POST`);
    }

    async getSnapshot(campaignType, snapshotId) {

        if (!snapshotId) {
            throw "No valid snapshotId"
        }

        let retry = 1;

        while (true) {

            let snapshotRequest = await this.apiRequest(`v2/${campaignType}/snapshots/${snapshotId}`, null, 'GET');

            if (snapshotRequest.status === 'SUCCESS') {
                return this.download(snapshotRequest.location, true);
            } else if (snapshotRequest.status === "FAILURE") {
                throw "FAILURE"
            } else if (snapshotRequest.status === "ERROR") {
                throw "ERROR"
            }

            var waitTime = Math.pow(2, retry++) * 100;
            waitTime = Math.min(this.options.maxWaitTime);
            await sleep(waitTime);
        }

    }

    requestReport(campaignType, recordType, data) {
        return this.apiRequest(`v2/${campaignType}/${recordType}/report`, data, `POST`);
    }

    async getReport(reportId) {

        if (!reportId) {
            throw "No valid reportId"
        }

        let retry = 1;

        while (true) {

            let reportRequest = await this.apiRequest(`v2/reports/${reportId}`, null, 'GET');

            if (reportRequest.status === 'SUCCESS') {
                var result = await this.download(reportRequest.location, true);
                return JSONbig.parse(zlib.gunzipSync(result).toString())
            } else if (reportRequest.status === "FAILURE") {
                throw "FAILURE"
            } else if (reportRequest.status === "ERROR") {
                throw "ERROR"
            }

            var waitTime = Math.pow(2, retry++) * 100;
            waitTime = Math.min(this.options.maxWaitTime);
            await sleep(waitTime);

        }

    }

    async refresh() {

        if (!this.options.refreshToken)
            throw 'No refresh token'

        if (this.refreshing)
            return;

        this.refreshing = true;

        let requestOptions = {
            content_type: 'application/x-www-form-urlencoded;charset=UTF-8',
        }

        var formData = querystring.stringify({
            grant_type: 'refresh_token',
            client_id: this.options.clientId,
            client_secret: this.options.clientSecret,
            refresh_token: this.options.refreshToken
        });

        let response = (await needle(
            'POST',
            `https://${this.tokenUrl}`,
            formData,
            requestOptions
        )).body;

        if (response.error) {
            throw resData.error
        }

        this.options.accessToken = response.access_token;

        this.refreshing = false;

    }

    async download(location, auth, retry = 1) {
        let requestOptions = {
            accept: "*",
            headers: {},
            followRedirect: false,
            compressed: false,
            json: false
        }

        if (auth) {
            requestOptions.headers.Authorization = 'Bearer ' + this.options.accessToken;
        }

        if (this.options.profileId) {
            requestOptions.headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
        }

        let response;
        let requestFailed;

        try {
            response = await needle(
                "GET",
                location,
                null,
                requestOptions
            );
        } catch (error) {
            requestFailed = true;
        }

        if (requestFailed || response.statusCode == '429' || response.statusCode == '500' || response.statusCode == '401') {
            if (retry >= this.options.maxRetry)
                throw new Error("Maximum retry count reached.")

            if (!requestFailed && response.statusCode == '401')
                await this.refresh();

            let waitTime = Math.pow(2, retry) * 100;
            waitTime = Math.min(this.options.maxWaitTime, waitTime);
            await sleep(waitTime);
            return this.download(location, true, ++retry);
        } else if (response.statusCode == 307) {
            return this.download(response.headers.location, false);
        } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
            throw new Error(response.body.details)
        }

        if (response.headers["content-encoding"] == 'gzip') {
            var unzipped = zlib.gunzipSync(response.raw).toString();
            if (response.headers["content-type"] == 'application/json') {
                return JSONbig.parse(unzipped);
            } else {
                return unzipped;
            }
        } else {
            return response.body;
        }

    }

    async apiRequest(path, data, method, retry = 1) {
        let url = `https://${this.endpoint}/${path}`;
        let requestOptions = {
            accept: "*",
            headers: {
                'Authorization': 'Bearer ' + this.options.accessToken,
                'Amazon-Advertising-API-ClientId': this.options.clientId,
            },
            json: true,
            compressed: true,
        }

        if (this.options.profileId) {
            requestOptions.headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
        }

        let response;
        let requestFailed;

        try {
            response = await needle(
                method,
                url,
                JSONbig.stringify(data),
                requestOptions
            );
        } catch (error) {
            requestFailed = true;
        }

        if (requestFailed || response.statusCode == '429' || response.statusCode == '500' || response.statusCode == '401') {
            if (retry >= this.options.maxRetry)
                throw new Error("Maximum retry count reached.")

            if (!requestFailed && response.statusCode == '401')
                await this.refresh();

            let waitTime = Math.pow(2, retry) * 100;
            waitTime = Math.min(this.options.maxWaitTime, waitTime);
            await sleep(waitTime);
            return this.apiRequest(path, data, method, ++retry);
        } else if (!(response.statusCode < 400 && response.statusCode >= 200)) {
            throw new Error(response.body.details)
        }

        try {
            return JSONbig.parse(response.body);
        } catch (error) {
            return response.body;
        }
    }

}