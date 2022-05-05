import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RtoinfoPage } from './rtoinfo.page';

describe('RtoinfoPage', () => {
  let component: RtoinfoPage;
  let fixture: ComponentFixture<RtoinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtoinfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RtoinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
