import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManageProductsComponent } from './account-manage-products.component';

describe('AccountManageProductsComponent', () => {
  let component: AccountManageProductsComponent;
  let fixture: ComponentFixture<AccountManageProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManageProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
