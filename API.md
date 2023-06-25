---
title: WATCH-SITE Server API v1.0
language_tabs:
  - node: Node
language_clients:
  - node: ""
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="watch-site-server-api">WATCH-SITE Server API v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

RESTFUL Backend server

Base URLs:

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="watch-site-server-api-default">Default</h1>

## AppController_getHealth

<a id="opIdAppController_getHealth"></a>

> Code samples

`GET /health`

<h3 id="appcontroller_gethealth-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="watch-site-server-api-user">user</h1>

## UserController_create

<a id="opIdUserController_create"></a>

> Code samples

`POST /user/signup`

> Body parameter

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

<h3 id="usercontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUserDto](#schemacreateuserdto)|true|none|

<h3 id="usercontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UserController_login

<a id="opIdUserController_login"></a>

> Code samples

`POST /user/login`

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="usercontroller_login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginUserDto](#schemaloginuserdto)|true|none|

<h3 id="usercontroller_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UserController_confirm

<a id="opIdUserController_confirm"></a>

> Code samples

`GET /user/confirm`

<h3 id="usercontroller_confirm-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|token|query|string|true|none|

<h3 id="usercontroller_confirm-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UserController_findOne

<a id="opIdUserController_findOne"></a>

> Code samples

`GET /user/{id}`

<h3 id="usercontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|any|true|none|

<h3 id="usercontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="watch-site-server-api-site">site</h1>

## SiteController_create

<a id="opIdSiteController_create"></a>

> Code samples

`POST /site`

> Body parameter

```json
{
  "name": "My website",
  "url": "https://www.google.com",
  "protocol": "http",
  "path": "/health-check",
  "port": 80,
  "webhook": "https://mywebhook.com",
  "timeout": 5000,
  "interval": 5,
  "threshold": 3,
  "authUsername": "string",
  "authPassword": "string",
  "httpHeaders": [
    [
      "Content-Type",
      "application/json"
    ],
    [
      "Authorization",
      "Bearer token"
    ]
  ],
  "assertCode": 0,
  "tags": [
    "tag1",
    "tag2"
  ],
  "ignoreSSL": true
}
```

<h3 id="sitecontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateSiteDto](#schemacreatesitedto)|true|none|

<h3 id="sitecontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_findAll

<a id="opIdSiteController_findAll"></a>

> Code samples

`GET /site`

<h3 id="sitecontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_findReportByTags

<a id="opIdSiteController_findReportByTags"></a>

> Code samples

`POST /site/search`

> Body parameter

```json
{
  "tags": [
    "string"
  ]
}
```

<h3 id="sitecontroller_findreportbytags-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SearchSiteReportDto](#schemasearchsitereportdto)|true|none|

<h3 id="sitecontroller_findreportbytags-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_getReports

<a id="opIdSiteController_getReports"></a>

> Code samples

`GET /site/reports`

<h3 id="sitecontroller_getreports-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_getReport

<a id="opIdSiteController_getReport"></a>

> Code samples

`GET /site/{id}/report`

<h3 id="sitecontroller_getreport-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="sitecontroller_getreport-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_findOne

<a id="opIdSiteController_findOne"></a>

> Code samples

`GET /site/{id}`

<h3 id="sitecontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="sitecontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_update

<a id="opIdSiteController_update"></a>

> Code samples

`PATCH /site/{id}`

> Body parameter

```json
{
  "name": "My website",
  "url": "https://www.google.com",
  "protocol": "http",
  "path": "/health-check",
  "port": 80,
  "webhook": "https://mywebhook.com",
  "timeout": 5000,
  "interval": 5,
  "threshold": 3,
  "authUsername": "string",
  "authPassword": "string",
  "httpHeaders": [
    [
      "Content-Type",
      "application/json"
    ],
    [
      "Authorization",
      "Bearer token"
    ]
  ],
  "assertCode": 0,
  "tags": [
    "tag1",
    "tag2"
  ],
  "ignoreSSL": true
}
```

<h3 id="sitecontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateSiteDto](#schemaupdatesitedto)|true|none|

<h3 id="sitecontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteController_remove

<a id="opIdSiteController_remove"></a>

> Code samples

`DELETE /site/{id}`

<h3 id="sitecontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="sitecontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

<h1 id="watch-site-server-api-site-report">site-report</h1>

## SiteReportController_findAll

<a id="opIdSiteReportController_findAll"></a>

> Code samples

`GET /site-report`

<h3 id="sitereportcontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

## SiteReportController_findOne

<a id="opIdSiteReportController_findOne"></a>

> Code samples

`GET /site-report/{id}`

<h3 id="sitereportcontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="sitereportcontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearer
</aside>

# Schemas

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_LoginUserDto">LoginUserDto</h2>
<!-- backwards compatibility -->
<a id="schemaloginuserdto"></a>
<a id="schema_LoginUserDto"></a>
<a id="tocSloginuserdto"></a>
<a id="tocsloginuserdto"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_CreateSiteDto">CreateSiteDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatesitedto"></a>
<a id="schema_CreateSiteDto"></a>
<a id="tocScreatesitedto"></a>
<a id="tocscreatesitedto"></a>

```json
{
  "name": "My website",
  "url": "https://www.google.com",
  "protocol": "http",
  "path": "/health-check",
  "port": 80,
  "webhook": "https://mywebhook.com",
  "timeout": 5000,
  "interval": 5,
  "threshold": 3,
  "authUsername": "string",
  "authPassword": "string",
  "httpHeaders": [
    [
      "Content-Type",
      "application/json"
    ],
    [
      "Authorization",
      "Bearer token"
    ]
  ],
  "assertCode": 0,
  "tags": [
    "tag1",
    "tag2"
  ],
  "ignoreSSL": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|The name of the check.|
|url|string|true|none|The URL to be monitored.|
|protocol|string|true|none|The resource protocol name.|
|path|string|true|none|A specific path to be monitored.|
|port|number|true|none|The server port number.|
|webhook|string|true|none|A webhook URL to receive a notification on.|
|timeout|number|true|none|The timeout of the polling request.|
|interval|number|true|none|The time interval (minutes) for polling requests. (min: 5 mins)|
|threshold|number|true|none|The threshold of failed requests that will create an alert.|
|authUsername|string|true|none|The authentication username.|
|authPassword|string|true|none|The authentication password.|
|httpHeaders|[string]|true|none|none|
|assertCode|number|true|none|The response assertion to be used on the polling response.|
|tags|[string]|true|none|A list of the check tags.|
|ignoreSSL|boolean|true|none|A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol.|

#### Enumerated Values

|Property|Value|
|---|---|
|protocol|http|
|protocol|https|
|protocol|tcp|

<h2 id="tocS_SearchSiteReportDto">SearchSiteReportDto</h2>
<!-- backwards compatibility -->
<a id="schemasearchsitereportdto"></a>
<a id="schema_SearchSiteReportDto"></a>
<a id="tocSsearchsitereportdto"></a>
<a id="tocssearchsitereportdto"></a>

```json
{
  "tags": [
    "string"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tags|[string]|true|none|Tags to search for|

<h2 id="tocS_UpdateSiteDto">UpdateSiteDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatesitedto"></a>
<a id="schema_UpdateSiteDto"></a>
<a id="tocSupdatesitedto"></a>
<a id="tocsupdatesitedto"></a>

```json
{
  "name": "My website",
  "url": "https://www.google.com",
  "protocol": "http",
  "path": "/health-check",
  "port": 80,
  "webhook": "https://mywebhook.com",
  "timeout": 5000,
  "interval": 5,
  "threshold": 3,
  "authUsername": "string",
  "authPassword": "string",
  "httpHeaders": [
    [
      "Content-Type",
      "application/json"
    ],
    [
      "Authorization",
      "Bearer token"
    ]
  ],
  "assertCode": 0,
  "tags": [
    "tag1",
    "tag2"
  ],
  "ignoreSSL": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|The name of the check.|
|url|string|false|none|The URL to be monitored.|
|protocol|string|false|none|The resource protocol name.|
|path|string|false|none|A specific path to be monitored.|
|port|number|false|none|The server port number.|
|webhook|string|false|none|A webhook URL to receive a notification on.|
|timeout|number|false|none|The timeout of the polling request.|
|interval|number|false|none|The time interval (minutes) for polling requests. (min: 5 mins)|
|threshold|number|false|none|The threshold of failed requests that will create an alert.|
|authUsername|string|false|none|The authentication username.|
|authPassword|string|false|none|The authentication password.|
|httpHeaders|[string]|false|none|none|
|assertCode|number|false|none|The response assertion to be used on the polling response.|
|tags|[string]|false|none|A list of the check tags.|
|ignoreSSL|boolean|false|none|A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol.|

#### Enumerated Values

|Property|Value|
|---|---|
|protocol|http|
|protocol|https|
|protocol|tcp|

