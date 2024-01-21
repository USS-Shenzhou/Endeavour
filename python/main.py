import json
import shutil
import time

import requests
from bs4 import BeautifulSoup
from openai import OpenAI


def is_page_mark(css_class):
    return css_class != 'pagination_next'


def find_projects_on_page(page_response, url_list):
    s = BeautifulSoup(page_response.text, "html.parser")
    p = s.find_all("li", {"class": "resource r-data", "data-type": "resource"})
    for project in p:
        url_list.append(pmcUrlBase + project.find_next("a").attrs['href'])


def get_title_and_description(pmc_project_url):
    r = requests.get(pmc_project_url, headers=headers)
    s = BeautifulSoup(r.text, "html.parser")
    t = s.find("div", {"id": "resource-title-text"}).text
    d = s.find("div", {"id": "r-text-block"}).text
    print(f"""---------
URL: {pmc_project_url}
Title:{t}
Description{d}
    """)
    return {title: t, description: d, "url": pmc_project_url}


def get_translated_title_and_description(title_and_description):
    response = ai_client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """你将获得一个Minecraft数据包项目的标题和描述。请将标题恰当地翻译为中文，并总结项目描述的主要内容，用中文输出。"
                           "翻译标题时如果标题带有版本信息则忽略，描述总结尽量不超过100字。以含有"title"和"description"两个键的json格式输出。"""
            },
            {
                "role": "user",
                "content": str(title_and_description)
            }
        ]
    )
    c = str(response.choices[0].message.content)
    print(f"""---------
URL: {title_and_description["url"]}
Title:{title_and_description[title]}
Description:{title_and_description[title]}
Translate:{c}
    """)
    return json.loads(str(response.choices[0].message.content))


def write_md(project_json, project_url, file):
    file.write("\n<Box>\n")
    file.write("### ["
               + project_json[title]
               + "]("
               + project_url
               + ")\n")
    file.write(project_json[description])
    file.write("\n</Box>\n")


title = "title"
description = "description"
pmcUrlBase = "https://www.planetminecraft.com"
pmcUrl = "https://www.planetminecraft.com/data-packs/?time_machine=last3d"
headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Dnt': '1',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0}'}
ai_client = OpenAI()
mainResponse = requests.get(pmcUrl, headers=headers)
soup = BeautifulSoup(mainResponse.text, "html.parser")
pages = len(soup.find("p", class_="white_btnset").find_all("a", class_=is_page_mark))
urls = []
for i in range(pages):
    if i == 0:
        find_projects_on_page(mainResponse, urls)
    else:
        find_projects_on_page(requests.get(pmcUrl + "&p={}".format(i + 1), headers=headers), urls)
projects = []
for url in urls:
    projects.append(get_title_and_description(url))
shutil.copyfile("python/plm_template.md", "docs/plm.md")
plm_md = open("docs/plm.md", mode="a+")
i = 0
for project in projects:
    try:
        time.sleep(15)
        j = get_translated_title_and_description(project)
        write_md(j, urls[i], plm_md)
    except Exception as e:
        print(e)
    finally:
        i = i + 1
plm_md.close()
