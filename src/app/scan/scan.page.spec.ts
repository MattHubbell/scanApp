import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPage } from './scan.page';
import { CardIO } from '@ionic-native/card-io/ngx';
import { ToastController } from '@ionic/angular';

describe('ScanPage', () => {
  let component: ScanPage;
  let fixture: ComponentFixture<ScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [CardIO, ToastController]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
