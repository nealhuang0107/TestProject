import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UseIonCardPage } from './use-ion-card.page';

describe('UseIonCardPage', () => {
  let component: UseIonCardPage;
  let fixture: ComponentFixture<UseIonCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseIonCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UseIonCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
