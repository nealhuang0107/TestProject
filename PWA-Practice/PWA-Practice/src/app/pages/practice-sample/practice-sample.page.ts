import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-practice-sample',
    templateUrl: './practice-sample.page.html',
    styleUrls: ['./practice-sample.page.scss'],
})
export class PracticeSamplePage implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    gohome() {
        this.router.navigate(['/home']);
    }

    APISampleCode() {
        window.open('https://testm.pch.org.tw/pwa/doc/PWA-Practice.zip');
    }

}
