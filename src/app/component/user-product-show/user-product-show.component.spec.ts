import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductShowComponent } from './user-product-show.component';

describe('UserProductShowComponent', () => {
  let component: UserProductShowComponent;
  let fixture: ComponentFixture<UserProductShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
