import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlashdataComponent } from './flashdata.component';

describe('FlashdataComponent', () => {
  let component: FlashdataComponent;
  let fixture: ComponentFixture<FlashdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashdataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlashdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
