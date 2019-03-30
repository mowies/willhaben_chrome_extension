function getAllProducts() {
  let all_articles = document.querySelectorAll("article.search-result-entry");
  chrome.storage.sync.get('urls', (items) => {
    let url_list = items['urls'];
    all_articles.forEach((article) => {
      let link = article.querySelector("section.content-section.isRealestate div.header a");
      if(link === undefined || link === null) {
        return;
      }

      let complete_url = link.getAttribute("href");
      let product_url = complete_url.match('([^?]*)')[1];
      for(let i = 0; i < url_list.length; i++) {
        if(url_list[i] === product_url) {
          article.style.backgroundColor = "#e0e0e0";
        }
      }
    });
  });
}

getAllProducts();