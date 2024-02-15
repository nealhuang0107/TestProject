import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HowDebugPage } from './how-debug.page';

describe('HowDebugPage', () => {
  let component: HowDebugPage;
  let fixture: ComponentFixture<HowDebugPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowDebugPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HowDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
