import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-how-debug',
    templateUrl: './how-debug.page.html',
    styleUrls: ['./how-debug.page.scss'],
})
export class HowDebugPage implements OnInit {

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
    }

    gohome() {
        this.router.navigate(['/home']);
    }


}
