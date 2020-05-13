---
layout: post
title: "[GCP] Nodejs Environment variables"
date: 2018-11-06 00:10
categories: gcp
tags: [nodejs-env]
---

The following environment variables are set by the runtime environment:

| Environment variable | Description                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| GAE_INSTANCE         | The name of the current instance.                                                                                           |
| GAE_MEMORY_MB        | The amount of memory available to the application process.                                                                  |
| GAE_SERVICE          | The service name specified in your application's `app.yaml` file, or if no service name is specified, it is set to default. |
| GAE_VERSION          | The version label of the current application.                                                                               |
| GOOGLE_CLOUD_PROJECT | The Project ID associated with your application, which is visible in the Google Cloud Platform Console                      |
| NODE_ENV             | When your app is deployed, the value is `production`.                                                                       |
| PORT                 | The port that will receive HTTP requests. Set to `8080`.                                                                    |

<br>
노드에선 아래와 같이 참조
```
console.log(process.env.GOOGLE_CLOUD_PROJECT);
```

<br>

#### Ref.

<https://cloud.google.com/appengine/docs/flexible/nodejs/runtime#environment_variables>
