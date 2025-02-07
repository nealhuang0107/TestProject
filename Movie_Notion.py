# %%
import requests
import csv
import os
import json
import telebot
import requests
from pathlib import Path
from datetime import datetime
from bs4 import BeautifulSoup
##Telegram 機器人ID
bot = telebot.TeleBot('###')
# 2025-04-01 LINE NOTIFY API 即將關閉
# LING NOIFTY 推播功能即將結束

def GetMovieList():
    url = 'http://www.uch-movies.tw/' #'https://movies.yahoo.com.tw/movie_thisweek.html'
    response = requests.get(url=url)

    soup = BeautifulSoup(response.text, 'lxml')
    info_items = soup.find_all('div', 'mask-wrapper')
    print('info',info_items)

    SetTextFile('test.text',info_items)
    #SetCsvFile(info_items,url)
    SetMovieInfo(info_items,url)
   
        

    return

def SetTextFile(file_name,data):
    ## 建立檔案
    file_path = Path(str.format('C:\work\\anaconda\TestProject\{0}',file_name))
    file_path.touch(exist_ok=True)
    
    
    open(file_path,'w').close()

    with open (file_path,'w') as file:
        file.write(str(data))
        file.close()

    return

def SetCsvFile(info_items,url):
    with open('本月新片.csv', 'w', encoding='utf-8', newline='') as csv_file:
        movie_arry = []
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(['電影片名', '電影英文片名', '上映時間'])
        this_month = datetime.now().month


        for item in info_items:
            
            tital = item.find('div', 'mask-inner').text.strip()
            english_name = item.find('div', 'imovie_title_e').text.strip()
            release_time = item.find('div', 'movie_date').text.split('：')[-1].strip()
            name = str(tital).split(english_name)[0]
            videos_url_result = item.find('div','play_icon')
            videos_url = [result.get("video-url") for result in videos_url_result]

            releasTimeString = str(release_time).split('上映')[0]
            releasTimeMonth = int(releasTimeString[5:-4])

            #圖片
            movie_pic = item.find('div','m_pic')
            movie_pic_url = [url + result_img.get("src") for result_img in movie_pic]
            
            #本月上映電影
            if (releasTimeMonth == this_month):
                csv_writer.writerow([name, english_name, release_time, videos_url])
                #print('{}({}) \n上映日：{} \n預告片:{}\n'.format(name, english_name, releasTimeString,videos_url))
                Download_pic(movie_pic_url,english_name)
                movie_arry.append('{}({}) \n上映日：{} \n預告片:{}\n'.format(name, english_name, releasTimeString,videos_url))


    return movie_arry

##下載圖片
def Download_pic(image_links,english_name):
    english = str(english_name).replace('(','').replace(')','')
    path = str.format('C:\work\\anaconda\TestProject\images\圖檔_{}.jpg',english.replace(' ','').strip())
    for index, link in enumerate(image_links):
        
        if not os.path.exists("images"):
            os.mkdir("images") #建立資料夾
        
        img = requests.get(link,stream=True)
        print('path',path)
        if img.status_code == 200:
            with open(path,'wb') as file_path:
                print('file_path',file_path)
                for chunck in img:
                    file_path.write(chunck)
            print("The Image has been downloaded")
            return path
        else:
            print("Error!! HTTP Request failed")


##寄送圖
def SendPhotoLineNotify(msgString,imagePath):
    #lineToken = 'HcmWNJxxh6s07aL65t05LCzNudclQasRz8VoacOBRuf'  ##個人測試用
    lineToken = 'H4lHQ7oA2PHhBQraqTxiVtT16FsmpsgvCs7varGlWz4'
    url = "https://notify-api.line.me/api/notify"
    payload={'message':{msgString}}
    image = Path(imagePath).read_bytes()
    imageFile = {'imageFile' : image}
   
    headers = {'Authorization': 'Bearer ' + lineToken}
    response = requests.request("POST", url, headers=headers, data=payload, files=imageFile)
    print(response.text)

##寄送圖片-Telegram
def SendPhotoTelegramNotify(msgString,imagePath):
   
    chat_ID = '####'
    with open(imagePath, 'rb') as photo:
        bot.send_message(chat_ID, msgString)
        bot.send_photo(chat_ID, photo)

    print('Send Telegram Success!!')

##刪除圖檔
def DeletePhoto(path):
     # 刪除檔案路徑
        file = Path(path)
        file.unlink()
        strPrint = str.format('Delete{}',path)
        print(strPrint)


def SetMovieInfo(info_items,url):
     this_month = datetime.now().month

     for item in info_items:
            
            tital = item.find('div', 'mask-inner').text.strip()
            english_name = item.find('div', 'imovie_title_e').text.strip()
            release_time = item.find('div', 'movie_date').text.split('：')[-1].strip()
            name = str(tital).split(english_name)[0]
            videos_url_result = item.find('div','play_icon')
            videos_url = [result.get("video-url") for result in videos_url_result]

            releasTimeString = str(release_time).split('上映')[0]
            releasTimeMonth = int(releasTimeString[5:-4])

            #圖片
            movie_pic = item.find('div','m_pic')
            movie_pic_url = [url + result_img.get("src") for result_img in movie_pic]
                 
            #本月上映電影
            if (releasTimeMonth == this_month):
                # csv_writer.writerow([name, english_name, release_time, videos_url])
                #print('{}({}) \n上映日：{} \n預告片:{}\n'.format(name, english_name, releasTimeString,videos_url))
                path = Download_pic(movie_pic_url,english_name)
                movie_message = '{}({}) \n上映日：{} \n預告片:{}\n'.format(name, english_name, releasTimeString,videos_url)
                #movie_arry.append('{}({}) \n上映日：{} \n預告片:{}\n'.format(name, english_name, releasTimeString,videos_url))
                if (path != ''):
                    ##SendPhotoLineNotify(movie_message,path)
                    SendPhotoTelegramNotify(movie_message,path)
                    DeletePhoto(path)
    
def TextNotify():
    today = datetime.now()
    msg = '{}- 公告: LINE NOTIFY將於3月底停止使用廣播功能，故本群組即將停止服務，快樂的時間就是這麼快'.format(today)
    print('msg',msg)
    lineToken = 'H4lHQ7oA2PHhBQraqTxiVtT16FsmpsgvCs7varGlWz4'
    url = "https://notify-api.line.me/api/notify"
    payload={'message':{msg}}   
    headers = {'Authorization': 'Bearer ' + lineToken}
    response = requests.request("POST", url, headers=headers, data=payload)  
    print(response.text) 

def TextTelegramNotify():
    chat_ID = '1541917393'
    today = datetime.now().date()
    msgString = '{}- 公告: LINE NOTIFY將於3月底停止使用廣播功能，故本群組即將停止服務，快樂的時間就是這麼快'.format(today)
    print(msgString)
    ##bot.send_message(chat_ID, msgString)


GetMovieList()
##TextNotify()
##TextTelegramNotify()


