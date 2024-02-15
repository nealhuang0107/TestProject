import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { API } from './services/public/common/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    Results: {};
    url: string;
    dataP: {};
    submenulist: {};
    totalmenulist = [];
    RootMenuPID = 'RootPractice';

    constructor(
        private MenuControl: MenuController,
        private router: Router, private route: ActivatedRoute,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private api: API,
        private http: HttpClient,

    ) {
        this.initializeApp();
     
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.GetMenu();
    }

    GetMenu2() {
        this.totalmenulist = [
            { "menu_pk": 75, "menu_id": "P1000", "menu_name": "系統環境安裝", "parent_id": "RootPractice", "link": "", "sort": 1000.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 76, "menu_id": "P1010", "menu_name": "電腦環境安裝", "parent_id": "P1000", "link": "basic-installation", "sort": 1010.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 77, "menu_id": "P1020", "menu_name": "下載範例與快速安裝", "parent_id": "P1000", "link": "practice-sample", "sort": 1020.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 79, "menu_id": "P2000", "menu_name": "開發工具與參考網站", "parent_id": "RootPractice", "link": "development-tools", "sort": 2000.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 80, "menu_id": "P3000", "menu_name": "實作之前應該知道的事", "parent_id": "RootPractice", "link": "before-starting", "sort": 3000.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 83, "menu_id": "P5000", "menu_name": "建立新專案", "parent_id": "RootPractice", "link": "new-project", "sort": 5000.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 85, "menu_id": "P6000", "menu_name": "如何與資料庫連結", "parent_id": "RootPractice", "link": "", "sort": 6000.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 86, "menu_id": "P6010", "menu_name": "資料、屬性、事件", "parent_id": "P6000", "link": "data-binding", "sort": 6010.00, "icon_name": "document", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
            { "menu_pk": 87, "menu_id": "P6020", "menu_name": "實作選單與 Web API", "parent_id": "P6000", "link": "menu-webapi", "sort": 6020.00, "icon_name": "create", "permission_id": "", "created_by": "jason", "created_time": "2020-08-12 00:00:00", "last_updated_by": "jason", "last_updated_time": "2020-08-12 00:00:00", "rec_status": "A" },
        ]
    }

    //取選單
    GetMenu() {
        this.url = this.api.apiUrl + '/pwa-guo.aspx/GetMenu';
        let p = {
            'Root': this.RootMenuPID,
        };
        this.dataP = this.api.AddAuthKey(p);

        this.http.post(this.url, this.dataP)
            .subscribe(
                data => {
                    let d = data["d"];
                    if (d.substr(0, 5) == "error") {
                        this.api.Alert('', d.replace("error,", ""));
                    }
                    else {
                        this.totalmenulist = JSON.parse(d);
                    }
                },
                err => this.api.Alert("Error: " + err.status, err.statusText)
            );
    }

    // Entry
    Entry(where: string) {
        if (where.trim() === "") {
            this.router.navigate(['/working-page']);
        } else {
            this.router.navigate(['/' + where]);
        }

        this.MenuControl.close();
    }

    //判斷主選單
    IsMainMenu(pid: any) {
        return (pid === this.RootMenuPID) ? true : false;
    }

    //判斷次選單
    IsSubMenu(pid: any) {
        return (pid === this.RootMenuPID) ? false : true;
    }

    //以傳入參數取得子選單
    async GetSubMenu(menuid: any) {
        this.submenulist = this.totalmenulist.filter(item => {
            return item.parent_id === menuid;
        })
    }

    //關閉其他子選單
    async SetOtherSubMenuHide(currentMenuID) {
        Object.keys(this.totalmenulist).forEach(e => {
            if (this.totalmenulist[e].parent_id !== currentMenuID && this.totalmenulist[e].parent_id != this.RootMenuPID) {
                var em = document.getElementById(this.totalmenulist[e].menu_id);
                if (em !== null) {
                    em.hidden = true;
                }
            }
        })
    }

    //選單click 
    async MenuClick(i: any) {
        var menuid = i.menu_id;
        var menulink = i.link;

        //關閉其他子選單
        //await this.SetOtherSubMenuHide(menuid);

        //同時導向主選單指定page及顯示子選單
        if (menulink.trim() === '') {
            this.router.navigate(['/home']);
        } else {
            this.Entry(menulink);
        }

        //取得 子選單
        await this.GetSubMenu(menuid);

        if (Object.keys(this.submenulist).length >= 0) {
            Object.keys(this.submenulist).forEach(item => {
                this.SetSubMenuHide(this.submenulist[item].menu_id);
            })
        }
    }

    //設定顯示或隱藏
    SetSubMenuHide(elementID: any) {

        var em = document.getElementById(elementID);
        if (em !== null) {
            em.hidden = !em.hidden;
        }
    }

    //子選單click 
    SubMenuClick(i) {
        this.Entry(i.link);
    }

    HasSubMenu(menuid) {
        //取得 子選單
        this.GetSubMenu(menuid);
        return (Object.keys(this.submenulist).length > 0) ? true : false;
    }

}
