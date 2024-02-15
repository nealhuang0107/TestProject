import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';

@Component({
    selector: 'app-popover-page',
    templateUrl: './popover-page.page.html',
    styleUrls: ['./popover-page.page.scss'],
})
export class PopoverPagePage implements OnInit {
    //回傳結果, can be any type
    result = { result1: '回傳一', result2: [] };
    ReceivedParam1: string;
    ReceivedParam2: string;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
    ) { }

    ngOnInit() {
        //接收參數
        this.ReceivedParam1 = this.navParams.get('Param1');
        this.ReceivedParam2 = this.navParams.get('Param2');
    }

    //Close
    async Close() {
        this.result["result1"] = "Cancel";
        await this.modalController.dismiss(this.result);
    }

    //確定
    async OK() {
        this.result["result1"] = "OK";
        await this.modalController.dismiss(this.result);
    }

}
