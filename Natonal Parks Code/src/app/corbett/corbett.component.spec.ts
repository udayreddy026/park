import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CorbettComponent } from './corbett.component';

describe('CorbettComponent', () => {
  let component: CorbettComponent;
  let fixture: ComponentFixture<CorbettComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorbettComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorbettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
