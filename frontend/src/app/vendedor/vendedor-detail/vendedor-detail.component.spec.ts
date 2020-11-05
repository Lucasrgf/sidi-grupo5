import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDetailComponent } from './vendedor-detail.component';

describe('VendedorDetailComponent', () => {
  let component: VendedorDetailComponent;
  let fixture: ComponentFixture<VendedorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendedorDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
