const request = require('request');
const util = require('util');

const requestPromise = util.promisify(request);
const postRequestPromise = util.promisify(request.post);
const getRequestPromise = util.promisify(request.get);

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
        tokenUrl: 'api.amazon.com/auth/o2/token',
    }
}

module.exports = class AdvertisingClient {

    tokenUrl;

    constructor(options) {

        this.options = options

        this.options.clientId = options.clientId || process.env.AMAZON_CLIENT_ID;
        this.options.clientSecret = options.clientSecret || process.env.AMAZON_CLIENT_SECRET;

        this.tokenUrl = Regions[options.region].tokenUrl;

        if (options.sandbox) {
            this.endpoint = Regions[options.region].sandbox;
        } else {
            this.endpoint = Regions[options.region].prod;
        }

    }

    async refresh() {

        if (!this.options.refreshToken)
            throw 'No Refresh Token'

        let response = await postRequestPromise({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            uri: `https://${this.tokenUrl}`,
            form: {
                grant_type: 'refresh_token',
                client_id: this.options.clientId,
                client_secret: this.options.clientSecret,
                refresh_token: this.options.refreshToken
            },
            gzip: true
        })

        let resData = JSON.parse(response.body);

        if (!resData.error) {
            this.options.accessToken = resData.access_token;
            return resData
        } else {
            throw resData.error
        }

    }

    register(){
        return this._operation(`profiles/register`, { countryCode: this.options.region }, 'PUT');
    }
    listProfiles() {
        return this._operation(`sp/profiles`);
    }
    registerProfile(data) {
        return this._operation(`sp/profiles/register`, data, `PUT`);
    }
    registerProfileStatus(profileId) {
        return this._operation(`sp/profiles/register/${profileId}/status`);
    }
    getProfile(profileId) {
        return this._operation(`sp/profiles/${profileId}`);
    }
    updateProfiles(data) {
        return this._operation(`sp/profiles`, data, `PUT`);
    }
    getCampaign(campaignId) {
        return this._operation(`sp/campaigns/${campaignId}`);
    }
    getCampaignEx(campaignId) {
        return this._operation(`sp/campaigns/extended/${campaignId}`);
    }
    createCampaigns(data) {
        return this._operation(`sp/campaigns`, data, `POST`);
    }
    updateCampaigns(data) {
        return this._operation(`sp/campaigns`, data, `PUT`);
    }
    archiveCampaign(campaignId) {
        return this._operation(`sp/campaigns/${campaignId}`, null, `DELETE`);
    }
    listCampaigns(data = null) {
        return this._operation(`sp/campaigns`, data);
    }
    listCampaignsEx(data = null) {
        return this._operation(`sp/campaigns/extended`, data);
    }
    getAdGroup(adGroupId) {
        return this._operation(`sp/adGroups/${adGroupId}`);
    }
    getAdGroupEx(adGroupId) {
        return this._operation(`sp/adGroups/extended/${adGroupId}`);
    }
    createAdGroups(data) {
        return this._operation(`sp/adGroups`, data, `POST`);
    }
    updateAdGroups(data) {
        return this._operation(`sp/adGroups`, data, `PUT`);
    }
    archiveAdGroup(adGroupId) {
        return this._operation(`sp/adGroups/${adGroupId}`, null, `DELETE`);
    }
    listAdGroups(data = null) {
        return this._operation(`sp/adGroups`, data);
    }
    listAdGroupsEx(data = null) {
        return this._operation(`sp/adGroups/extended`, data);
    }
    getBiddableKeyword(keywordId) {
        return this._operation(`sp/keywords/${keywordId}`);
    }
    getBiddableKeywordEx(keywordId) {
        return this._operation(`sp/keywords/extended/${keywordId}`);
    }
    createBiddableKeywords(data) {
        return this._operation(`sp/keywords`, data, `POST`);
    }
    updateBiddableKeywords(data) {
        return this._operation(`sp/keywords`, data, `PUT`);
    }
    archiveBiddableKeyword(keywordId) {
        return this._operation(`sp/keywords/${keywordId}`, null, `DELETE`);
    }
    listBiddableKeywords(data = null) {
        return this._operation(`sp/keywords`, data);
    }
    listBiddableKeywordsEx(data = null) {
        return this._operation(`sp/keywords/extended`, data);
    }
    getNegativeKeyword(keywordId) {
        return this._operation(`sp/negativeKeywords/${keywordId}`);
    }
    getNegativeKeywordEx(keywordId) {
        return this._operation(`sp/negativeKeywords/extended/${keywordId}`);
    }
    createNegativeKeywords(data) {
        return this._operation(`sp/negativeKeywords`, data, `POST`);
    }
    updateNegativeKeywords(data) {
        return this._operation(`sp/negativeKeywords`, data, `PUT`);
    }
    archiveNegativeKeyword(keywordId) {
        return this._operation(`sp/negativeKeywords/${keywordId}`, null, `DELETE`);
    }
    listNegativeKeywords(data = null) {
        return this._operation(`sp/negativeKeywords`, data);
    }
    listNegativeKeywordsEx(data = null) {
        return this._operation(`sp/negativeKeywords/extended`, data);
    }
    getCampaignNegativeKeyword(keywordId) {
        return this._operation(`sp/campaignNegativeKeywords/${keywordId}`);
    }
    getCampaignNegativeKeywordEx(keywordId) {
        return this._operation(`sp/campaignNegativeKeywords/extended/${keywordId}`);
    }
    createCampaignNegativeKeywords(data) {
        return this._operation(`sp/campaignNegativeKeywords`, data, `POST`);
    }
    updateCampaignNegativeKeywords(data) {
        return this._operation(`sp/campaignNegativeKeywords`, data, `PUT`);
    }
    removeCampaignNegativeKeyword(keywordId) {
        return this._operation(`sp/campaignNegativeKeywords/${keywordId}`, null, `DELETE`);
    }
    listCampaignNegativeKeywords(data = null) {
        return this._operation(`sp/campaignNegativeKeywords`, data);
    }
    listCampaignNegativeKeywordsEx(data = null) {
        return this._operation(`sp/campaignNegativeKeywords/extended`, data);
    }
    getProductAd(productAdId) {
        return this._operation(`sp/productAds/${productAdId}`);
    }
    getProductAdEx(productAdId) {
        return this._operation(`sp/productAds/extended/${productAdId}`);
    }
    createProductAds(data) {
        return this._operation(`sp/productAds`, data, `POST`);
    }
    updateProductAds(data) {
        return this._operation(`sp/productAds`, data, `PUT`);
    }
    archiveProductAd(productAdId) {
        return this._operation(`sp/productAds/${productAdId}`, null, `DELETE`);
    }
    listProductAds(data = null) {
        return this._operation(`sp/productAds`, data);
    }
    listProductAdsEx(data = null) {
        return this._operation(`sp/productAds/extended`, data);
    }
    getAdGroupBidRecommendations(adGroupId) {
        return this._operation(`sp/adGroups/${adGroupId}/bidRecommendations`);
    }
    getKeywordBidRecommendations(keywordId) {
        return this._operation(`sp/keywords/${keywordId}/bidRecommendations`);
    }
    bulkGetKeywordBidRecommendations(adGroupId, data) {
        data = {
            adGroupId: adGroupId,
            keywords: data
        }

        return this._operation(`sp/keywords/bidRecommendations`, data, `POST`);
    }
    getAdGroupKeywordSuggestions(data) {
        let adGroupId = data[`adGroupId`];
        delete data[`adGroupId`];
        return this._operation(`sp/adGroups/${adGroupId}/suggested/keywords`, data);
    }
    getAdGroupKeywordSuggestionsEx(data) {
        let adGroupId = data[`adGroupId`];
        delete data[`adGroupId`];
        return this._operation(`sp/adGroups/${adGroupId}/suggested/keywords/extended`, data);
    }
    getAsinKeywordSuggestions(data) {
        let asin = data[`asin`];
        delete data[`asin`];
        return this._operation(`sp/asins/${asin}/suggested/keywords`, data);
    }
    bulkGetAsinKeywordSuggestions(data) {
        return this._operation(`sp/asins/suggested/keywords`, data, `POST`);
    }
    requestSnapshot(recordType, data = null) {
        return this._operation(`sp/${recordType}/snapshot`, data, `POST`);
    }
    requestSnapshotBrand(recordType, data = null) {
        return this._operation(`hsa/${recordType}/snapshot`, data, 'POST');
    }
    async getSnapshot(snapshotId) {

        while (true) {

            let snapshotRequest = JSON.parse(await this._operation(`sp/snapshots/${snapshotId}`));
           
            if (snapshotRequest.status === 'SUCCESS') {
                return this._download(snapshotRequest.location);
            }

            await sleep(1000);

        }

    }
    requestReport(recordType, data = null) {
        return this._operation(`sp/${recordType}/report`, data, `POST`);
    }
    requestReportBrand(recordType, data = null) {
        return this._operation(`hsa/${recordType}/report`, data, 'POST');
    }
    async getReport(reportId) {

        while (true) {

            let reportRequest = JSON.parse(await this._operation(`sp/reports/${reportId}`));
           
            if (reportRequest.status === 'SUCCESS') {
                return this._download(reportRequest.location);
            }

            await sleep(500);

        }

    }
    _download(location, auth = true)
    {
        let headers = {}

        if (auth) {
            headers.Authorization = 'Bearer ' + this.options.accessToken;
        }

        if (this.options.profileId) {
            headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
        }

        let requestOptions = {
            url: location,
            headers: headers,
            followRedirect: false,
            gzip: true
        }

        return this._executeRequest(requestOptions);
    }

    async _executeRequest(requestOptions){

        let response = await getRequestPromise(requestOptions);

        if (response.statusCode == 307) {
            let finalResult = await this._download(response.headers.location, false);
            return finalResult;
        }

        let result={
            success: false,
            code: response.statusCode,
            response: response.body,
            requestId: 0
        };

        if (!(response.statusCode < 400 && response.statusCode >= 200)) {
            let data = JSON.parse(response.body);

            if (data && data.requestId) {
                requestId = data.requestId;
            }

            result = false;
        } else {
            result.success = true;
        }

       return result
        
    }

    async _operation(_interface, data, method = 'GET') {
        let url = `https://${this.endpoint}/v2/${_interface}`;
        let headers = {
            'Authorization': 'Bearer ' + this.options.accessToken,
            'Amazon-Advertising-API-ClientId': this.options.clientId,
            'Content-Type': 'application/json',
        }

        if (this.options.profileId) {
            headers['Amazon-Advertising-API-Scope'] = this.options.profileId;
        }

        let response = await requestPromise({
            url: url,
            headers: headers,
            json: data,
            method: method,
            gzip: true,
        })

        let resData = response.body;

        if (!resData.error) {
            return resData;
        } else {
            throw resData.error;
        }

    }
}