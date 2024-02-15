import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageLifeCyclePage } from './page-life-cycle.page';

describe('PageLifeCyclePage', () => {
  let component: PageLifeCyclePage;
  let fixture: ComponentFixture<PageLifeCyclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLifeCyclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageLifeCyclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
