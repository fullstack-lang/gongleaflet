import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GongleafletdatamodelComponent } from './gongleafletdatamodel.component';

describe('GongleafletdatamodelComponent', () => {
  let component: GongleafletdatamodelComponent;
  let fixture: ComponentFixture<GongleafletdatamodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GongleafletdatamodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GongleafletdatamodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
