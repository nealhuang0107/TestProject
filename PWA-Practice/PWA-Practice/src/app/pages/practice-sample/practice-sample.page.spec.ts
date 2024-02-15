import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PracticeSamplePage } from './practice-sample.page';

describe('PracticeSamplePage', () => {
  let component: PracticeSamplePage;
  let fixture: ComponentFixture<PracticeSamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSamplePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeSamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
