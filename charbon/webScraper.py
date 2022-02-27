import aiohttp
import asyncio
from requests import request
from tqdm import tqdm
from bs4 import BeautifulSoup
# class WebScraper:
    
#     @classmethod
#     async def main(self):
#         async with aiohttp.ClientSession() as session:
#             async with session.get('http://python.org') as response:

#                 print("Status:", response.status)
#                 print("Content-type:", response.headers['content-type'])

#                 html = await response.text()
#                 print("Body:", html[:15], "...")
                
                

# asyncio.run(WebScraper.main())


class WebScraper(object):
    def __init__(self, urls):
        self.urls = urls
        # Global Place To Store The Data:
        self.tqdm : tqdm = None
        self.all_data  = []
        self.master_dict = {}
        # Run The Scraper:
        asyncio.run(self.main())

    async def fetch(self, session, url):
        try:
            async with session.get(url) as response:
                # 1. Extracting the Text:
                text = await response.text()
                # 2. Extracting the  Tag:
                title_tag = await self.extract_title_tag(text)
                self.tqdm.update(1)
                return text, url, title_tag
        except Exception as e:
            print(str(e))
            
    async def extract_title_tag(self, text):
        try:
            soup = BeautifulSoup(text, 'html.parser')
            return soup.title
        except Exception as e:
            print(str(e))

    async def main(self):
        tasks = []
        headers = {
            "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}
        async with aiohttp.ClientSession(headers=headers) as session:
            for url in self.urls:
                tasks.append(self.fetch(session, url))
            self.tqdm = tqdm(len(url))
            htmls = await asyncio.gather(*tasks)
            self.tqdm.close()
            self.all_data.extend(htmls)

            # Storing the raw HTML data.
            for html in htmls:
                if html is not None:
                    url = html[1]
                    self.master_dict[url] = {'Raw Html': html[0], 'Title': html[2]}
                else:
                    continue

                
# 1. Create a list of URLs for our scraper to get the data for:
urls = ['https://understandingdata.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/' , 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/', 'http://twitter.com/']

# 2. Create the scraper class instance, this will automatically create a new event loop within the __init__ method:
scraper = WebScraper(urls = urls)

# 3. Notice how we have a list length of 2:
len(scraper.all_data)