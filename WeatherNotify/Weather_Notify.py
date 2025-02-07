# %%
import requests
from pathlib import Path
from datetime import datetime
import json
from googletrans import Translator

##url = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'

##url = str.format('api.openweathermap.org/data/2.5/weather?q=Puli,uk&APPID=5e7982dc6f9b409d80ba738747194be8') 
#url = str.format('https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&units=metric&appid={}',23.95,120.97,'5e7982dc6f9b409d80ba738747194be8')
url = str.format('https://api.openweathermap.org/data/2.5/forecast?id={}&units=metric&appid={}','1670310','5e7982dc6f9b409d80ba738747194be8')

def SetTextFile(file_name,data):
    ## 建立檔案
    file_path = Path(str.format('C:\work\\anaconda\TestProject\{0}',file_name))
    file_path.touch(exist_ok=True)
    
    
    open(file_path,'w').close()

    with open (file_path,'w') as file:
        file.write(str(data))
        file.close()
    
    ##delete file
    ##file_path.unlink()

    return


response = requests.get(url)
print('response_status_code',response.status_code)
if response.status_code == 200:
    response_data = response.json()
    print(response_data)
    slist =  response_data['list']
    print(slist)
    j = slist[0]['weather']
    str_main = j[0]['main'] #天氣概況
    str_desc = j[0]['description'] #天氣描述
    
    str_msg = str.format('今日天氣概況:{}-{}',str_main,str_desc)

    str_inpute = str_main
    if (str_inpute !=''):
        translator = Translator()
        result = translator.translate(str_inpute, dest='zh-tw')
        print(result)
    else:
        print('input non')
        print(str_msg)
    ##SetTextFile('weatherDate.txt',response_data)





