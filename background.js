// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({willhaben_read_background_color: '#e0e0e0'}, () => {
    console.log('Successfully set new background color in storage.');
  });
});

chrome.tabs.onUpdated.addListener(
  function (activeInfo) {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
        url: 'https://*.willhaben.at/iad/immobilien/d/mietwohnungen/*',
      },
      function (tabs) {
        if (tabs[0]) {
          let url = tabs[0].url;
          let product_url = url.match('willhaben\\.at([^?]*)')[0];
          console.log("Current product url: " + product_url);

          chrome.storage.sync.get('urls', function (items) {
            let url_list = items['urls'];
            console.log("url list: " + url_list);
            if (url_list) {
              url_list.push(product_url);
            } else {
              url_list = {};
            }
            chrome.storage.sync.set({'urls': url_list});
            console.log("Successfully set storage to: " + url_list);
          });
        }

        chrome.storage.sync.getBytesInUse((bytesInUse => {
          console.log("current storage usage: " + bytesInUse);
        }));
      }
    );
  }
);
