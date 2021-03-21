import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KazirangaComponent } from './kaziranga.component';

describe('KazirangaComponent', () => {
  let component: KazirangaComponent;
  let fixture: ComponentFixture<KazirangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KazirangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KazirangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
