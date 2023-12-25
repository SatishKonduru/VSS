import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VssComponent } from './vss.component';

describe('VssComponent', () => {
  let component: VssComponent;
  let fixture: ComponentFixture<VssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VssComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
