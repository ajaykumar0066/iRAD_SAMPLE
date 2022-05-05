import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MvireminderComponent } from './mvireminder.component';

describe('MvireminderComponent', () => {
  let component: MvireminderComponent;
  let fixture: ComponentFixture<MvireminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvireminderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MvireminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
