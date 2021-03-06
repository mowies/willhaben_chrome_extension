'use strict';

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) {
  for(let i=0; i < this.length; i++) {
    if(comparer(this[i])) return true;
  }
  return false;
};

// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element, comparer) {
  if (!this.inArray(comparer)) {
    this.push(element);
  }
};

chrome.tabs.onActivated.addListener(
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
          let product_url = url.match('willhaben\\.at([^?]*)')[1];

          chrome.storage.sync.get('urls', function (items) {
            let url_list = items['urls'];
            console.log("Url list: ");
            console.log(url_list);

            if(url_list === undefined) {
              url_list = [];
            }
            else if(!Array.isArray(url_list)) {
              chrome.storage.sync.remove('urls');
              url_list = [];
            }

            url_list.pushIfNotExist(product_url, (e) => { return e === product_url });
            chrome.storage.sync.set({'urls': url_list});
          });
        }
      }
    );

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
        url: 'https://*.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote*'
      },
      function(tabs) {
        if (tabs[0]) {

        }
      }
    )
  }
);
