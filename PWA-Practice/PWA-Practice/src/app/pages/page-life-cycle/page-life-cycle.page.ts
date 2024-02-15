import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-life-cycle',
    templateUrl: './page-life-cycle.page.html',
    styleUrls: ['./page-life-cycle.page.scss'],
})
export class PageLifeCyclePage implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    gohome() {
        this.router.navigate(['/home']);
    }

    //What's Ionic-Page-Life-Cycle?
    IPLC(){
        window.open('https://ionicframework.com/docs/angular/lifecycle', '_blank');
    }

}
