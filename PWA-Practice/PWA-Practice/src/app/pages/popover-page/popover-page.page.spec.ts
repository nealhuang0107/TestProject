import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverPagePage } from './popover-page.page';

describe('PopoverPagePage', () => {
  let component: PopoverPagePage;
  let fixture: ComponentFixture<PopoverPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
