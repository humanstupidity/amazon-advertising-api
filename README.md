## Synopsis

Amazon Advertising API NodeJS client library.

## Documentation

[API Reference](https://advertising.amazon.com/API/docs)<br/>
[Access Request](https://advertising.amazon.com/API)<br/>
[Getting Started](https://advertising.amazon.com/API/docs/v2/guides/get_started)

## Tutorials
[Register Sandbox Profile](https://git.io/vPKMl) - This tutorial will show you how to register a profile in sandbox using CURL.<br/>
[Generate and download a report using CURL](https://git.io/vPKPW) - You will need to complete registering a profile in sandbox prior to doing this tutorial.

## Sandbox self-service
If you would like to test the API in sandbox you will need to register a profile for the region in which you would like to test. The `registerProfile` API call can be made to do this. Make sure you instantiate the client in `sandbox` mode before making this call or it will fail.
<br/><br/>
The following country codes are available for testing.
<br/>
> US, CA, UK, DE, FR, ES, IT, IN, CN, JP<br/>

```Javascript
client.registerProfile({"countryCode": "IT"});
```
>
```JSON
{
  "registerProfileId": "5cf1aca5-4ab8-4489-8c33-013d1f85c586JP",
  "status": "IN_PROGRESS",
  "statusDetails": "Registration workflow has been started"
}
```

## Quick Start
#### Instantiate the client
> You can pass in `profileId` later. You can get all available profiles with `listProfiles`.

```Javascript

let AdvertisingClient = require('amz-advertising-api');

let config = {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
    accessToken: "ACCESS_TOKEN",
    refreshToken: "REFRESH_TOKEN",
    profileId: "PROFILE_ID",
    sandbox: false,
    region: 'eu'
}

let client = new AdvertisingClient(config);
```
#### Refresh access token
> You can refresh your access token when it expires by using the following method. The new access token will be in the request response. This method will set it for you so it's mainly for reference if you need it.

```Javascript
let refreshTokenObject = await client.refresh();
```
>
```JSON
{
  "access_token": "Atza|IQEBLjAsAhRmHjNgHpi0U-Dme37rR6CuUpSR…",
  "expires_in": 3600
}
```
#### Get a list of profiles
```Javascript
let profiles = await client.listProfiles();
```
>
```JSON
[
  {
    "profileId":1234567890,
    "countryCode":"US",
    "currencyCode":"USD",
    "dailyBudget":10.00,
    "timezone":"America/Los_Angeles",
    "accountInfo":{
      "marketplaceStringId":"ABC123",
      "sellerStringId":"DEF456"
    }
  }
]
```

#### Set profile Id
```Javascript
client.options.profileId = "1234567890";
```

> Once you've set the profile Id you are ready to start making API calls.

## Example API Calls

* Profiles
    * [listProfiles](#get-a-list-of-profiles)
    * [getProfile](#getprofile)
    * [updateProfiles](#updateprofiles)
* Campaigns
    * [listCampaigns](#listcampaigns)
    * [getCampaign](#getcampaign)
    * [createCampaigns](#createcampaigns)
    * [updateCampaigns](#updatecampaigns)
    * [archiveCampaign](#archivecampaign)
    * [listCampaigns Sponsored Brands](#listcampaignsBrand)
    * [getCampaign Sponsored Brands](#getcampaignBrand)
    * [updateCampaigns Sponsored Brands](#updatecampaignsBrand)
    * [archiveCampaign Sponsored Brands](#archivecampaignBrand)
* Ad Groups
    * [listAdGroups](#listadgroups)
    * [getAdGroup](#getadgroup)
    * [createAdGroups](#createadgroups)
    * [updateAdGroups](#updateadgroups)
    * [archiveAdGroup](#archiveadgroup)
* Biddable Keywords
    * [listBiddableKeywords](#listbiddablekeywords)
    * [getBiddableKeyword](#getbiddablekeyword)
    * [createBiddableKeywords](#createbiddablekeywords)
    * [updateBiddableKeywords](#updatebiddablekeywords)
    * [archiveBiddableKeyword](#archivebiddablekeyword)
    * [getBiddableKeyword Sponsored Brands](#getbiddablekeywordBrand)
    * [createBiddableKeywords Sponsored Brands](#createbiddablekeywordsBrand)
    * [updateBiddableKeywords Sponsored Brands](#updatebiddablekeywordsBrand)
    * [archiveBiddableKeyword Sponsored Brands](#archivebiddablekeywordBrand)
* Negative Keywords
    * [listNegativeKeywords](#listnegativekeywords)
    * [getNegativeKeyword](#getnegativekeyword)
    * [createNegativeKeywords](#createnegativekeywords)
    * [updateNegativeKeywords](#updatenegativekeywords)
    * [archiveNegativeKeyword](#archivenegativekeyword)
* Campaign Negative Keywords
    * [listCampaignNegativeKeywords](#listcampaignnegativekeywords)
    * [getCampaignNegativeKeyword](#getcampaignnegativekeyword)
    * [createCampaignNegativeKeywords](#createcampaignnegativekeywords)
    * [updateCampaignNegativeKeywords](#updatecampaignnegativekeywords)
    * [removeCampaignNegativeKeyword](#removecampaignnegativekeyword)
* Product Ads
    * [listProductAds](#listproductads)
    * [getProductAd](#getproductad)
    * [createProductAds](#createproductads)
    * [updateProductAds](#updateproductads)
    * [archiveProductAd](#archiveproductad)
* Snapshots
    * [requestSnapshot](#requestsnapshot)
    * [getSnapshot](#getsnapshot)
    * [requestSnapshot Sponsored Brands](#requestsnapshotBrand)
* Reports
    * [requestReport](#requestreport)
    * [getReport](#getreport)
    * [requestReport Sponsored Brands](#requestreportBrand)
* Bid Recommendations
    * [getAdGroupBidRecommendations](#getadgroupbidrecommendations)
    * [getKeywordBidRecommendations](#getkeywordbidrecommendations)
    * [bulkGetKeywordBidRecommendations](#bulkgetkeywordbidrecommendations)
* Keyword Suggestions
  * [getAdGroupKeywordSuggestions](#getadgroupkeywordsuggestions)
  * [getAdGroupKeywordSuggestionsEx](#getadgroupkeywordsuggestionsex)
  * [getAsinKeywordSuggestions](#getasinkeywordsuggestions)
  * [bulkGetAsinKeywordSuggestions](#bulkgetasinkeywordsuggestions)

#### getProfile
> Retrieves a single profile by Id.

```Javascript
await client.getProfile("1234567890");
```
>
```JSON
{
  "profileId": 1234567890,
  "countryCode": "US",
  "currencyCode": "USD",
  "dailyBudget": 3.99,
  "timezone": "America/Los_Angeles",
  "accountInfo": {
    "marketplaceStringId": "ABC123",
    "sellerStringId": "DEF456"
  }
}
```

---
#### updateProfiles
> Updates one or more profiles.  Advertisers are identified using their `profileIds`.

```Javascript
await client.updateProfiles(
  [
    {
      "profileId": client.profileId,
      "dailyBudget": 3.99
    },
    {
      "profileId": 11223344,
      "dailyBudget": 6.00
    }
  ]
);

```
>
```JSON
[
  {
    "code": "SUCCESS",
    "profileId": 1234567890
  },
  {
    "code": "NOT_FOUND",
    "description": "Profile with id 11223344 was not found for this advertiser.",
    "profileId": 0
  }
]
```

---
#### listCampaigns
> Retrieves a list of campaigns satisfying optional criteria.

```Javascript
await client.listCampaigns({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "campaignId": 59836775211065,
    "name": "CampaignOne",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 15.0,
    "startDate": "20160330",
    "state": "enabled"
  },
  {
    "campaignId": 254238342004647,
    "name": "CampaignTwo",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 5.0,
    "startDate": "20160510",
    "state": "enabled"
  }
]
```

---
#### getCampaign
> Retrieves a campaign by Id. Note that this call returns the minimal set of campaign fields, but is more efficient than  `getCampaignEx`.

```Javascript
await client.getCampaign(1234567890);
```
>
```JSON
{
  "campaignId": 1234567890,
  "name": "CampaignOne",
  "campaignType": "sponsoredProducts",
  "targetingType": "manual",
  "dailyBudget": 15.0,
  "startDate": "20160330",
  "state": "enabled"
}
```

---
#### createCampaigns
> Creates one or more campaigns. Successfully created campaigns will be assigned unique `campaignId`s.

```Javascript
await client.createCampaigns(
  [
    {
      "name": "My Campaign One",
      "campaignType": "sponsoredProducts",
      "targetingType": "manual",
      "state": "enabled",
      "dailyBudget": 5.00,
      "startDate": date("Ymd")
    },
    {
      "name": "My Campaign Two",
      "campaignType": "sponsoredProducts",
      "targetingType": "manual",
      "state": "enabled",
      "dailyBudget": 15.00,
      "startDate": date("Ymd")
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "campaignId": 173284463890123
  },
  {
    "code": "SUCCESS",
    "campaignId": 27074907785456
  }
]
```

---
#### updateCampaigns
> Updates one or more campaigns. Campaigns are identified using their `campaignId`s.

```Javascript
await client.updateCampaigns(
  [
    {
      "campaignId": 173284463890123,
      "name": "Update Campaign One",
      "state": "enabled",
      "dailyBudget": 10.99
    },
    {
      "campaignId": 27074907785456,
      "name": "Update Campaign Two",
      "state": "enabled",
      "dailyBudget": 99.99
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "campaignId": 173284463890123
  },
  {
    "code": "SUCCESS",
    "campaignId": 27074907785456
  }
]
```

---
#### archiveCampaign
> Sets the campaign status to archived. This same operation can be performed via an update, but is included for completeness.

```Javascript
await client.archiveCampaign(1234567890);
```
>
```JSON
{
  "code": "SUCCESS",
  "campaignId": 1234567890
}
```
---
#### listCampaignsBrand
> Retrieves a list of campaigns satisfying optional criteria. Used for Sponsored Brands.
```Javascript
await client.listCampaignsBrand({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "campaignId": 59836775211065,
    "name": "CampaignOne",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 15.0,
    "startDate": "20160330",
    "state": "enabled"
  },
  {
    "campaignId": 254238342004647,
    "name": "CampaignTwo",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 5.0,
    "startDate": "20160510",
    "state": "enabled"
  }
]
```
---
#### getCampaignBrand
> Retrieves a campaign by Id. Used for Sponsored Brands.
```Javascript
await client.getCampaignBrand(1234567890);
```
>
```JSON
{
  "campaignId": 1234567890,
  "name": "CampaignOne",
  "campaignType": "sponsoredProducts",
  "targetingType": "manual",
  "dailyBudget": 15.0,
  "startDate": "20160330",
  "state": "enabled"
}
```
---
#### updateCampaignsBrand
> Updates one or more campaigns. Campaigns are identified using their `campaignId`s.  Used for Sponsored Brands.
```Javascript
await client.updateCampaignsBrand(
  [
    {
      "campaignId": 173284463890123,
      "name": "Update Campaign One",
      "state": "enabled",
      "dailyBudget": 10.99
    },
    {
      "campaignId": 27074907785456,
      "name": "Update Campaign Two",
      "state": "enabled",
      "dailyBudget": 99.99
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "campaignId": 173284463890123
  },
  {
    "code": "SUCCESS",
    "campaignId": 27074907785456
  }
]
```
---
#### archiveCampaignBrand
> Sets the campaign status to archived. This same operation can be performed via an update, but is included for completeness.  Used for Sponsored Brands.
```Javascript
await client.archiveCampaignBrand(1234567890);
```
>
```JSON
{
  "code": "SUCCESS",
  "campaignId": 1234567890
}
```

---
#### listAdGroups
> Retrieves a list of ad groups satisfying optional criteria.

```Javascript
await client.listAdGroups({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "adGroupId": 262960563101486,
    "name": "AdGroup One",
    "campaignId": 181483024866689,
    "defaultBid": 1.0,
    "state": "enabled"
  },
  {
    "adGroupId": 52169162825843,
    "name": "AdGroup Two",
    "campaignId": 250040549047739,
    "defaultBid": 2.0,
    "state": "enabled"
  }
]
```

---
#### getAdGroup
> Retrieves an ad group by Id. Note that this call returns the minimal set of ad group fields, but is more efficient than `getAdGroupEx`.

```Javascript
await client.getAdGroup(262960563101486);
```
>
```JSON
{
  "adGroupId": 262960563101486,
  "name": "AdGroup One",
  "campaignId": 181483024866689,
  "defaultBid": 1.0,
  "state": "enabled"
}
```

---
#### createAdGroups
> Creates one or more ad groups. Successfully created ad groups will be assigned unique `adGroupId`s.

```Javascript
await client.createAdGroups(
  [       
    {
      "campaignId": 250040549047739,
      "name": "New AdGroup One",
      "state": "enabled",
      "defaultBid": 2.0
    },
    {
      "campaignId": 59836775211065,
      "name": "New AdGroup Two",
      "state": "enabled",
      "defaultBid": 5.0
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "adGroupId": 117483076163518
  },
  {
    "code": "SUCCESS",
    "adGroupId": 123431426718271
  }
]
```

---
#### updateAdGroups
> Updates one or more ad groups. Ad groups are identified using their `adGroupId`s.

```Javascript
await client.updateAdGroups(
  [
    {
      "adGroupId": 117483076163518,
      "state": "enabled",
      "defaultBid": 20.0
    },
    {
      "adGroupId": 123431426718271,
      "state": "enabled",
      "defaultBid": 15.0
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "adGroupId": 117483076163518
  },
  {
    "code": "SUCCESS",
    "adGroupId": 123431426718271
  }
]
```

---
#### archiveAdGroup
> Sets the ad group status to archived. This same operation can be performed via an update, but is included for completeness.

```Javascript
await client.archiveAdGroup(117483076163518);
```
>
```JSON
{
  "code": "SUCCESS",
  "adGroupId": 117483076163518
}
```

---
#### listBiddableKeywords
> Retrieves a list of keywords satisfying optional criteria.

```Javascript
await client.listBiddableKeywords({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "keywordId": 174140697976855,
    "adGroupId": 52169162825843,
    "campaignId": 250040549047739,
    "keywordText": "KeywordOne",
    "matchType": "exact",
    "state": "enabled"
  },
  {
    "keywordId": 118195812188994,
    "adGroupId": 52169162825843,
    "campaignId": 250040549047739,
    "keywordText": "KeywordTwo",
    "matchType": "exact",
    "state": "enabled"
  }
]
```

---
#### getBiddableKeyword
> Retrieves a keyword by Id. Note that this call returns the minimal set of keyword fields, but is more efficient than  getBiddableKeywordEx.

```Javascript
await client.getBiddableKeyword(174140697976855);
```
>
```JSON
{
  "keywordId": 174140697976855,
  "adGroupId": 52169162825843,
  "campaignId": 250040549047739,
  "keywordText": "KeywordOne",
  "matchType": "exact",
  "state": "enabled"
}
```

---
#### createBiddableKeywords
> Creates one or more keywords. Successfully created keywords will be assigned unique `keywordId`s.

```Javascript
await client.createBiddableKeywords(
  [
    {
      "campaignId": 250040549047739,
      "adGroupId": 52169162825843,
      "keywordText": "AnotherKeyword",
      "matchType": "exact",
      "state": "enabled"
    },
    {
      "campaignId": 250040549047739,
      "adGroupId": 52169162825843,
      "keywordText": "YetAnotherKeyword",
      "matchType": "exact",
      "state": "enabled"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 112210768353976
  },
  {
    "code": "SUCCESS",
    "keywordId": 249490346605943
  }
]
```

---
#### updateBiddableKeywords
> Updates one or more keywords. Keywords are identified using their `keywordId`s.

```Javascript
await client.updateBiddableKeywords(
  [
    {
      "keywordId": 112210768353976,
      "bid": 100.0,
      "state": "archived"
    },
    {
      "keywordId": 249490346605943,
      "bid": 50.0,
      "state": "archived"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 112210768353976
  },
  {
    "code": "SUCCESS",
    "keywordId": 249490346605943
  }
]
```

---
#### archiveBiddableKeyword
> Sets the keyword status to archived. This same operation can be performed via an update, but is included for completeness.

```Javascript
await client.archiveBiddableKeyword(112210768353976);
```
>
```JSON
{
  "code": "200",
  "requestId": "0TR95PJD6Z16FFCZDXD0"
}
```
---
#### getBiddableKeywordBrand
> Retrieves a keyword by Id. Note that this call returns the minimal set of keyword fields, but is more efficient than  getBiddableKeywordEx.  Used for Sponsored Brands.
```Javascript
await client.getBiddableKeywordBrand(174140697976855);
```
>
```JSON
{
  "keywordId": 174140697976855,
  "adGroupId": 52169162825843,
  "campaignId": 250040549047739,
  "keywordText": "KeywordOne",
  "matchType": "exact",
  "state": "enabled"
}
```
---
#### createBiddableKeywordsBrand
> Creates one or more keywords. Successfully created keywords will be assigned unique `keywordId`s.  Used for Sponsored Brands.
```Javascript
await client.createBiddableKeywordsBrand(
  [
    {
      "campaignId": 250040549047739,
      "adGroupId": 52169162825843,
      "keywordText": "AnotherKeyword",
      "matchType": "exact",
      "state": "enabled"
    },
    {
      "campaignId": 250040549047739,
      "adGroupId": 52169162825843,
      "keywordText": "YetAnotherKeyword",
      "matchType": "exact",
      "state": "enabled"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 112210768353976
  },
  {
    "code": "SUCCESS",
    "keywordId": 249490346605943
  }
]
```
---
#### updateBiddableKeywordsBrand
> Updates one or more keywords. Keywords are identified using their `keywordId`s.  Used for Sponsored Brands.
```Javascript
await client.updateBiddableKeywordsBrand(
  {
    {
      "keywordId": 112210768353976,
      "bid": 100.0,
      "state": "archived"
    },
    {
      "keywordId": 249490346605943,
      "bid": 50.0,
      "state": "archived"
    }
  }
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 112210768353976
  },
  {
    "code": "SUCCESS",
    "keywordId": 249490346605943
  }
]
```
---
#### archiveBiddableKeywordBrand
> Sets the keyword status to archived. This same operation can be performed via an update, but is included for completeness. Used for Sponsored Brands.

```Javascript
await client.archiveBiddableKeywordBrand(112210768353976);
```
>
```JSON
{
  "code": "200",
  "requestId": "0TR95PJD6Z16FFCZDXD0"
}
```

---
#### listNegativeKeywords
> Retrieves a list of negative keywords satisfying optional criteria.

```Javascript
await client.listNegativeKeywords({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "keywordId": 281218602770639,
    "adGroupId": 52169162825843,
    "campaignId": 250040549047739,
    "keywordText": "KeywordOne",
    "matchType": "negativeExact",
    "state": "enabled"
  },
  {
    "keywordId": 280875877064090,
    "adGroupId": 262960563101486,
    "campaignId": 181483024866689,
    "keywordText": "KeywordTwo",
    "matchType": "negativeExact",
    "state": "enabled"
  }
]
```

---
#### getNegativeKeyword
> Retrieves a negative keyword by Id. Note that this call returns the minimal set of keyword fields, but is more efficient than `getNegativeKeywordEx`.

```Javascript
await client.getNegativeKeyword(281218602770639);
```
>
```JSON
{
  "keywordId": 281218602770639,
  "adGroupId": 52169162825843,
  "campaignId": 250040549047739,
  "keywordText": "KeywordOne",
  "matchType": "negativeExact",
  "state": "enabled"
}
```

---
#### createNegativeKeywords
> Creates one or more negative keywords. Successfully created keywords will be assigned unique keywordIds.

```Javascript
await client.createNegativeKeywords(
  [
    {
      "campaignId": 250040549047739,
      "adGroupId": 52169162825843,
      "keywordText": "AnotherKeyword",
      "matchType": "negativeExact",
      "state": "enabled"
    },
    {
      "campaignId": 181483024866689,
      "adGroupId": 262960563101486,
      "keywordText": "YetAnotherKeyword",
      "matchType": "negativeExact",
      "state": "enabled"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 61857817062026
  },
  {
    "code": "SUCCESS",
    "keywordId": 147623067066967
  }
]
```

---
#### updateNegativeKeywords
> Updates one or more negative keywords. Keywords are identified using their `keywordId`s.

```Javascript
await client.updateNegativeKeywords(
  [
    {
      "keywordId": 61857817062026,
      "state": "enabled",
      "bid": 15.0
    },
    {
      "keywordId": 61857817062026,
      "state": "enabled",
      "bid": 20.0
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 61857817062026
  },
  {
    "code": "INVALID_ARGUMENT",
    "description": "Entity with id 61857817062026 already specified in this update operation."
  }
]
```

---
#### archiveNegativeKeyword
> Sets the negative keyword status to archived. This same operation can be performed via an update to the status, but is included for completeness.

```Javascript
await client.archiveNegativeKeyword(61857817062026);
```
>
```JSON
{
  "code": "SUCCESS",
  "keywordId": 61857817062026
}
```

---
#### listCampaignNegativeKeywords
> Retrieves a list of negative campaign keywords satisfying optional criteria.

```Javascript
await client.listCampaignNegativeKeywords({"matchTypeFilter": "negativeExact"});
```
>
```JSON
[
  {
    "keywordId": 131747786239884,
    "adGroupId": null,
    "campaignId": 181483024866689,
    "keywordText": "Negative Keyword",
    "matchType": "negativeExact",
    "state": "enabled"
  },
  {
    "keywordId": 197201372210821,
    "adGroupId": null,
    "campaignId": 181483024866689,
    "keywordText": "My Negative Keyword",
    "matchType": "negativeExact",
    "state": "enabled"
  }
]
```

---
#### getCampaignNegativeKeyword
> Retrieves a campaign negative keyword by Id. Note that this call returns the minimal set of keyword fields, but is more efficient than `getCampaignNegativeKeywordEx`.

```Javascript
await client.getCampaignNegativeKeyword(197201372210821);
```
>
```JSON
{
  "keywordId": 197201372210821,
  "adGroupId": null,
  "campaignId": 181483024866689,
  "keywordText": "My Negative Keyword",
  "matchType": "negativeExact",
  "state": "enabled"
}
```

---
#### createCampaignNegativeKeywords
> Creates one or more campaign negative keywords. Successfully created keywords will be assigned unique `keywordId`s.

```Javascript
await client.createCampaignNegativeKeywords(
  [
    {
      "campaignId": 181483024866689,
      "keywordText": "Negative Keyword One",
      "matchType": "negativeExact",
      "state": "enabled"
    },
    {
      "campaignId": 181483024866689,
      "keywordText": "Negative Keyword Two",
      "matchType": "negativeExact",
      "state": "enabled"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "keywordId": 196797670902082
  },
  {
    "code": "SUCCESS",
    "keywordId": 186203479904657
  }
]
```

---
#### updateCampaignNegativeKeywords
> Updates one or more campaign negative keywords. Keywords are identified using their `keywordId`s.

> Campaign negative keywords can currently only be removed.

---
#### removeCampaignNegativeKeyword
> Sets the campaign negative keyword status to deleted. This same operation can be performed via an update to the status, but is included for completeness.

```Javascript
await client.removeCampaignNegativeKeyword(186203479904657);
```
>
```JSON
{
  "code": "SUCCESS",
  "keywordId": 186203479904657
}
```

---
#### listProductAds
> Retrieves a list of product ads satisfying optional criteria.

```Javascript
await client.listProductAds({"stateFilter": "enabled"});
```
>
```JSON
[
  {
    "adId": 247309761200483,
    "adGroupId": 262960563101486,
    "campaignId": 181483024866689,
    "sku": "TEST001",
    "state": "enabled"
  }
]
```

---
#### getProductAd
> Retrieves a product ad by Id. Note that this call returns the minimal set of product ad fields, but is more efficient than `getProductAdEx`.

```Javascript
await client.getProductAd(247309761200483);
```
>
```JSON
{
  "adId": 247309761200483,
  "adGroupId": 262960563101486,
  "campaignId": 181483024866689,
  "sku": "TEST001",
  "state": "enabled"
}
```

---
#### createProductAds
> Creates one or more product ads. Successfully created product ads will be assigned unique `adId`s.

```Javascript
await client.createProductAds(
  [
    {
      "campaignId": 181483024866689,
      "adGroupId": 262960563101486,
      "sku": "TEST002",
      "state": "enabled"
    },
    {
      "campaignId": 181483024866689,
      "adGroupId": 262960563101486,
      "sku": "TEST003",
      "state": "enabled"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "adId": 239870616623537
  },
  {
    "code": "SUCCESS",
    "adId": 191456410590622
  }
]
```

---
#### updateProductAds
> Updates one or more product ads. Product ads are identified using their `adId`s.

```Javascript
await client.updateProductAds(
  [
    {
      "adId": 239870616623537,
      "state": "archived"
    },
    {
      "adId": 191456410590622,
      "state": "archived"
    }
  ]
);
```
>
```JSON
[
  {
    "code": "SUCCESS",
    "adId": 239870616623537
  },
  {
    "code": "SUCCESS",
    "adId": 191456410590622
  }
]
```

---
#### archiveProductAd
> Sets the product ad status to archived. This same operation can be performed via an update, but is included for completeness.

```Javascript
await client.archiveProductAd(239870616623537);
```
>
```JSON
{
  "code": "SUCCESS",
  "adId": 239870616623537
}
```

---
#### requestSnapshot
> Request a snapshot report for all entities of a single type.

```Javascript
await client.requestSnapshot(
  "campaigns",
  {
    "stateFilter": "enabled,paused,archived",
    "campaignType": "sponsoredProducts"
  }
);
```
>
```JSON
{
  "snapshotId": "amzn1.clicksAPI.v1.p1.573A0477.ec41773a-1659-4013-8eb9-fa18c87ef5df",
  "recordType": "campaign",
  "status": "IN_PROGRESS"
}
```

---
#### getSnapshot
> Retrieve a previously requested report.

```Javascript
await client.getSnapshot("amzn1.clicksAPI.v1.p1.573A0477.ec41773a-1659-4013-8eb9-fa18c87ef5df");
```
>
```JSON
[
  {
    "campaignId": 181483024866689,
    "name": "Campaign One",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 5.0,
    "startDate": "20160330",
    "state": "archived"
  },
  {
    "campaignId": 59836775211065,
    "name": "Campaign Two",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 10.99,
    "startDate": "20160330",
    "state": "archived"
  },
  {
    "campaignId": 254238342004647,
    "name": "Campaign Three",
    "campaignType": "sponsoredProducts",
    "targetingType": "manual",
    "dailyBudget": 99.99,
    "startDate": "20160510",
    "state": "enabled"
  }
]
```

---
#### requestSnapshotBrand
> Request a snapshot report for all entities of a single type.  Used for Sponsored Brands.
```Javascript
await client.requestSnapshotBrand(
  "campaigns",
  {
    "stateFilter": "enabled,paused,archived",
    "campaignType": "sponsoredProducts"
  }
);
```
>
```JSON
{
  "snapshotId": "amzn1.clicksAPI.v1.p1.573A0477.ec41773a-1659-4013-8eb9-fa18c87ef5df",
  "recordType": "campaign",
  "status": "IN_PROGRESS"
}
```

---
#### requestReport
> Request a customized performance report for all entities of a single type which have performance data to report.

```Javascript
await client.requestReport(
  "campaigns",
  {
    "reportDate": "20160515",
    "campaignType": "sponsoredProducts",
    "metrics": "impressions,clicks,cost"
  }
);
```
>
```JSON
{
  "reportId": "amzn1.clicksAPI.v1.m1.573A0808.32908def-66a1-4ce2-8f12-780dc4ae1d43",
  "recordType": "campaign",
  "status": "IN_PROGRESS",
  "statusDetails": "Report is submitted"
}
```

---
#### requestReportBrand
> Request a customized performance report for all entities of a single type which have performance data to report.
```Javascript
await client.requestReportBrand(
  "campaigns",
  {
    "reportDate": "20160515",
    "campaignType": "sponsoredProducts",
    "metrics": "impressions,clicks,cost"
  }
);
```
>
```JSON
{
  "reportId": "amzn1.clicksAPI.v1.m1.573A0808.32908def-66a1-4ce2-8f12-780dc4ae1d43",
  "recordType": "campaign",
  "status": "IN_PROGRESS",
  "statusDetails": "Report is submitted"
}
```

---
#### getReport
> Retrieve a previously requested report.

```Javascript
await client.getReport("amzn1.clicksAPI.v1.m1.573A0808.32908def-66a1-4ce2-8f12-780dc4ae1d43");
```
> Sandbox will return dummy data.
```JSON
[
  {
    "cost": 647.75,
    "campaignId": 230751293360275,
    "clicks": 2591,
    "impressions": 58288
  },
  {
    "cost": 619.5,
    "campaignId": 52110033002744,
    "clicks": 2478,
    "impressions": 68408
  },
  {
    "cost": 151.91,
    "campaignId": 140739567440917,
    "clicks": 633,
    "impressions": 17343
  },
  {
    "cost": 143.46,
    "campaignId": 79132327246328,
    "clicks": 797,
    "impressions": 48903
  }
]
```

---
#### getAdGroupBidRecommendations
> Request bid recommendations for specified ad group.

```Javascript
await client.getAdGroupBidRecommendations(1234509876);
```
>
```JSON
{
  "adGroupId": 1234509876,
  "suggestedBid": {
    "rangeEnd": 2.16,
    "rangeStart": 0.67,
    "suggested": 1.67
  }
}
```

---
#### getKeywordBidRecommendations
> Request bid recommendations for specified keyword.

```Javascript
await client.getKeywordBidRecommendations(85243141758914);
```
>
```JSON
{
  "keywordId": 85243141758914,
  "adGroupId": 252673310548066,
  "suggestedBid": {
    "rangeEnd": 3.18,
    "rangeStart": 0.35,
    "suggested": 2.97
  }
}
```

---
#### bulkGetKeywordBidRecommendations
> Request bid recommendations for a list of up to 100 keywords.

```Javascript
await client.bulkGetKeywordBidRecommendations(
  242783265349805,
  [
    {
      "keyword": "testKeywordOne",
      "matchType": "exact"
    },
    {
      "keyword": "testKeywordTwo",
      "matchType": "exact"
    }
  ]
);
```
>
```JSON
{
  "adGroupId": 242783265349805,
  "recommendations": [
    {
      "code": "SUCCESS",
      "keyword": "testKeywordOne",
      "matchType": "exact",
      "suggestedBid": {
        "rangeEnd": 2.67,
        "rangeStart": 0.38,
        "suggested": 2.07
      }
    },
    {
      "code": "SUCCESS",
      "keyword": "testKeywordTwo",
      "matchType": "exact",
      "suggestedBid": {
        "rangeEnd": 3.19,
        "rangeStart": 0.79,
        "suggested": 3.03
      }
    }
  ]
}
```

---
#### getAdGroupKeywordSuggestions
> Request keyword suggestions for specified ad group.

```Javascript
await client.getAdGroupKeywordSuggestions(
  {
    "adGroupId": 1234567890,
    "maxNumSuggestions": 2,
    "adStateFilter": "enabled"
  }
);
```
>
```JSON
{
  "adGroupId": 1234567890,
  "suggestedKeywords": [
    {
      "keywordText": "keyword PRODUCT_AD_A 1",
      "matchType": "broad"
    },
    {
      "keywordText": "keyword PRODUCT_AD_B 1",
      "matchType": "broad"
    }
  ]
}
```

---
#### getAdGroupKeywordSuggestionsEx
> Request keyword suggestions for specified ad group, extended version. Adds the ability to return bid recommendation for returned keywords.

```Javascript
await client.getAdGroupKeywordSuggestionsEx(
  {
    "adGroupId": 1234567890,
    "maxNumSuggestions": 2,
    "suggestBids": "yes",
    "adStateFilter": "enabled"
  }
);
```
>
```JSON
[
  {
    "adGroupId": 1234567890,
    "campaignId": 0987654321,
    "keywordText": "keyword TESTASINXX 1",
    "matchType": "broad",
    "state": "enabled",
    "bid": 1.84
  },
  {
    "adGroupId": 1234567890,
    "campaignId": 0987654321,
    "keywordText": "keyword TESTASINXX 2",
    "matchType": "broad",
    "state": "enabled",
    "bid": 1.07
  }
]
```

---
#### getAsinKeywordSuggestions
> Request keyword suggestions for specified asin.

```Javascript
await client.getAsinKeywordSuggestions(
  {
    "asin": "B00IJSNPM0",
    "maxNumSuggestions": 2
  }
);
```
>
```JSON
[
  {
    "keywordText": "keyword B00IJSNPM0 1",
    "matchType": "broad"
  },
  {
    "keywordText": "keyword B00IJSNPM0 2",
    "matchType": "broad"
  }
]
```

---
#### bulkGetAsinKeywordSuggestions
> Request keyword suggestions for a list of asin.

```Javascript
await client.bulkGetAsinKeywordSuggestions(
  {
    "asins": {
      "B00IJSNPM0",
      "B00IJSO1NM"
    },    
    "maxNumSuggestions": 2
  }
);
```
>
```JSON
[
  {
    "keywordText": "keyword B00IJSNPM0 1",
    "matchType": "broad"
  },
  {
    "keywordText": "keyword B00IJSO1NM 1",
    "matchType": "broad"
  }
]
```