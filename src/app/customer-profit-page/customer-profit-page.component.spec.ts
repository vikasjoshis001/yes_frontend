import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfitPageComponent } from './customer-profit-page.component';

describe('CustomerProfitPageComponent', () => {
  let component: CustomerProfitPageComponent;
  let fixture: ComponentFixture<CustomerProfitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
