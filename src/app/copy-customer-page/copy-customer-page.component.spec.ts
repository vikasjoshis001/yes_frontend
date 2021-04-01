import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCustomerPageComponent } from './copy-customer-page.component';

describe('CopyCustomerPageComponent', () => {
  let component: CopyCustomerPageComponent;
  let fixture: ComponentFixture<CopyCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyCustomerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
