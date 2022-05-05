# cordova-plugin-wkwebview-ionic-xhr 2.1.1

## About the cordova-plugin-wkwebview-ionic-xhr

This plugin makes it possible to reap the performance benefits of using the new `Ionic` WKWebView in your Cordova app by resolving the following issues:

* The default behavior of WKWebView is to raise a cross origin exception when loading files from the main bundle using the file protocol - "file://". The Oracle `cordova-plugin-wkwebview-file-xhr` plugin and `cordova-plugin-ionic-webview` plugin try to fix these issues in various ways. Unfortunately Ionic insists on installing `cordova-plugin-ionic-webview` and Oracle's `cordova-plugin-wkwebview-file-xhr` insists on installing the standard Cordova WKWebView plugin  `cordova-plugin-wkwebview-engine`, which are mutually exclusive and cannot be run side by side. The `cordova-plugin-ionic-webview` plugin has many fixes necessary for Ionic Apps, but it doesn't fix the issue whereby the iOS WKWebView does not allow for cookies to be used via XHR requests. Oracle's `cordova-plugin-wkwebview-file-xhr` plugin does seem to fix this issue and hence this Fork attempts to bring together the best of both these worlds.

* For more information see `https://github.com/oracle/cordova-plugin-wkwebview-file-xhr` and `https://ionicframework.com/docs/wkwebview/`

## Installation

Plugin installation requires Cordova 4+ and iOS 9+. It will install the Ionic Cordova WKWebView plugin  `cordova-plugin-ionic-webview` if not already installed. Note that the `cordova-plugin-wkwebview-engine` and `cordova-plugin-ionic-webview` cannot both be loaded at the same time.

```
cordova plugin add cordova-plugin-wkwebview-ionic-xhr
```

## Supported Platforms

* iOS

## Quick Example

```
// read local resource
var xhr = XMLHttpRequest();
xhr.addEventListener("loadend", function(evt)
 {
   var data = this.responseText;
   document.getElementById("myregion").innerHtml = data;
 });
xhr.open("GET", "js/views/customers.html");
xhr.send();

// post to remote endpoint
var xhr = new XMLHttpRequest();
xhr.addEventListener("loadend", function(evt)
 {
   var product = this.response;
   document.getElementById("productId").value = product.id;
   document.getElementById("productName").value = product.name;
 });
xhr.open("POST", "https://myremote/endpoint/product");
xhr.responseType = "json";
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Accept", "application/json");
xhr.send(JSON.stringify({name: "Product 99"}));

```

## Configuration

The following configuration options modify the default behavior of the plugin.  The values are specified in
config.xml as preferences:

<ul>
 <li>AllowUntrustedCerts: on|off (default: off).  If "on", requests routed to the native implementation will accept self signed SSL certificates. This preference should only be enabled for testing purposes.</li>
 <li>InterceptRemoteRequests: all|secureOnly|none (default: secureOnly). Controls what types of remote XHR requests are intercepted and handled by the plugin. The plugin always intercepts requests with the file:// protocol and any requests to http://localhost:8080/. By default, the plugin will intercept only secure protocol requests ("https").</li>
 <li>NativeXHRLogging: none|full (default: none).  If "full" the javascript layer will produce logging of the XHR requests sent through the native to the javascript console.  Note:  natively routed XHR requests will not appear in the web inspector utility when "InterceptRemoteRequests" is "all" or "secureOnly".</li>
</ul>

### Known Issues
The plugin caches cookies at the native layer between requests but it does not attempt to sync cookies between the WKWebView and the native sessions. From the JavaScript context, this means "document.cookie" won't contain any cookies returned from XHR handled at the native layer and the native iOS XHR will not see any cookies returned from remote resources fetched by the browser context, such as images.

Whilst this plugin resolves the main issues preventing the use of the Apache Cordova WKWebView plugin, there are other [known issues](https://issues.apache.org/jira/browse/CB-12074?jql=project%20%3D%20CB%20AND%20status%20%3D%20Open%20AND%20labels%20%3D%20wkwebview-known-issues) with that plugin.

### [Changes](CHANGELOG.md)
See [CHANGELOG](CHANGELOG.md).

### [Contributing](CONTRIBUTING.md)
This is an open source project forked from `cordova-plugin-wkwebview-file-xhr` maintained by Oracle Corp. Pull Requests are currently not being accepted. See [CONTRIBUTING](CONTRIBUTING.md) for details.

### [License](LICENSE.md)
Copyright (c) 2017 Oracle and/or its affiliates
The Universal Permissive License (UPL), Version 1.0

Amendments Copyright (c) 2017 Sortd, Inc and/or its affiliates
The Universal Permissive License (UPL), Version 1.0*
