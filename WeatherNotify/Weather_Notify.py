# %%
import requests
from pathlib import Path
from datetime import datetime
import json
from googletrans import Translator
import asyncio
import time
import telebot
##4469160
##1670310
##8097937503:AAGihoDqtkUqXT2qI73wnBp8fuj8Y_ruHaw
##url = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

##url = str.format('api.openweathermap.org/data/2.5/weather?q=Puli,uk&APPID=5e7982dc6f9b409d80ba738747194be8') 
#url = str.format('https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&units=metric&appid={}',23.95,120.97,'5e7982dc6f9b409d80ba738747194be8')
url = str.format('https://api.openweathermap.org/data/2.5/forecast?id={}&units=metric&appid={}','####','######')

##Telegram 機器人ID
bot = telebot.TeleBot('#####')

def SetTextFile(file_name,data):
    ## 建立檔案
    file_path = Path(str.format('C:\work\\anaconda\TestProject\{0}',file_name))
    file_path.touch(exist_ok=True)
    
    
    open(file_path,'w').close()

    with open (file_path,'w') as file:
        file.write(str(data))
        file.close()
    
    ##delete file
    file_path.unlink()

    return

async def SetTextMessage(str_inpute):
    translator = Translator()
    result = await translator.translate(str_inpute, dest='en')  ##zh-tw , en-us
    return result.text

##寄送圖片-Telegram
def SendPhotoTelegramNotify(msgString,imagePath):
    chat_ID = '####'
    with open(imagePath, 'rb') as photo:
        bot.send_message(chat_ID, msgString)
        bot.send_photo(chat_ID, photo)

    print('Send Telegram Success!!')

##寄送文字訊息-Telegram
def SendTextTelegramNotify(msgString):
    chat_ID = '####'           ##1541917393
    bot.send_message(chat_ID, msgString)


response = requests.get(url)
##print('response_status_code',response.status_code)
print('Today is :', datetime.today())
if response.status_code == 200:
    response_data = response.json()
    print(response_data)
    slist =  response_data['list']

     # 篩選出dt_txt 大於當前時間的資料
    sslist = [item for item in slist if item['dt_txt'] > datetime.today().strftime('%Y-%m-%d %H:%M:%S')]

    # 找到最接近當前時間的那筆資料
    closest_item = min(sslist, key=lambda x: abs(datetime.strptime(x['dt_txt'], '%Y-%m-%d %H:%M:%S') - datetime.today()))

    j = sslist[0]['weather']
    str_main = j[0]['main'] #天氣概況
    str_desc = j[0]['description'] #天氣描述
    str_temp = sslist[0]['main']['temp'] #氣溫
    str_city = response_data['city']['name'] #城市
    
    #str_msg = str.format('今日天氣概況:{}-{}',str_main,str_desc)

    if (str_main !=''):
        str_main = asyncio.run(SetTextMessage(str_main))
        str_desc = asyncio.run(SetTextMessage(str_desc))
        str_inpute = str.format('{}-Today {} the weather is:{}-{},Temp:{}',datetime.today().strftime('%Y-%m-%d'),str_city,str_main,str_desc,str_temp)
        
        print('訊息內容:', str_inpute)
    else:
        print(str.format('今日天氣概況:{}-{}',str_main,str_desc))


    SetTextFile('weatherDate.txt',response_data)
    SendTextTelegramNotify(str_inpute)





