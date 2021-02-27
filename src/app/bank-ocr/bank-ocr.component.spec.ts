import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOcrComponent } from './bank-ocr.component';

describe('BankOcrComponent', () => {
  let component: BankOcrComponent;
  let fixture: ComponentFixture<BankOcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankOcrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
