import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { SlabCallendarComponent } from './slab-callendar.component';

describe('SlabCallendarComponent', () => {
  let component: SlabCallendarComponent;
  let fixture: ComponentFixture<SlabCallendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlabCallendarComponent ],
      imports: [
        MatDialogModule,
        HttpClientModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlabCallendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
