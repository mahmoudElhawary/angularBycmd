import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProductDetailsComponent } from './one-product-details.component';

describe('OneProductDetailsComponent', () => {
  let component: OneProductDetailsComponent;
  let fixture: ComponentFixture<OneProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
