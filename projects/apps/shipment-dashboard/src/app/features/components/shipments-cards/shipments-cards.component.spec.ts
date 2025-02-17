import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { provideInternationalizationConfig } from '#sd/app/core/configuration/internationalization/internationalization-config.provider';
import { provideUiConfig } from '#sd/app/core/configuration/ui/ui-config.provider';

import { ShipmentCard, ShipmentsCardsComponent } from './shipments-cards.component';

const shipments: ShipmentCard[] = [
  {
    id: '1',
    barcode: 'barcode 1',
    trackingUrl: 'trackingUrl 1',
    brand: {
      id: '1',
      name: 'brand 1'
    },
    receiverContact: {
      id: '1',
      name: 'receiver name',
      companyname: 'company name',
      street: 'street',
      housenumber: 'house number',
      postalcode: '1234AB',
      locality: 'Rotterdam',
      country: 'NL',
      created: new Date(),
      modified: new Date()
    }
  },
  {
    id: '2',
    barcode: 'barcode 2',
    trackingUrl: 'trackingUrl 2',
    brand: {
      id: '2',
      name: 'brand 2'
    },
    receiverContact: {
      id: '2',
      name: 'receiver name',
      companyname: 'company name',
      street: 'street',
      housenumber: 'house number',
      postalcode: '1234AB',
      locality: 'Rotterdam',
      country: 'NL',
      created: new Date(),
      modified: new Date()
    }
  },
  {
    id: '3',
    barcode: 'barcode 3',
    trackingUrl: 'trackingUrl 3',
    brand: {
      id: '3',
      name: 'brand 3'
    },
    receiverContact: {
      id: '3',
      name: 'receiver name',
      companyname: 'company name',
      street: 'street',
      housenumber: 'house number',
      postalcode: '1234AB',
      locality: 'Rotterdam',
      country: 'NL',
      created: new Date(),
      modified: new Date()
    }
  }
];

describe('ShipmentsCardsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsCardsComponent],
      providers: [provideHttpClient(), provideUiConfig(), provideInternationalizationConfig()]
    }).compileComponents();
  });

  it('should create shipments cards component', () => {
    const fixture = TestBed.createComponent(ShipmentsCardsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render with shipments', () => {
    const fixture = TestBed.createComponent(ShipmentsCardsComponent);
    fixture.componentInstance.shipments = shipments;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('qls-card')?.length).toBe(shipments.length);
  });

  it('should call navigateToShipmentDetail on button click', () => {
    const fixture = TestBed.createComponent(ShipmentsCardsComponent);
    fixture.componentInstance.shipments = shipments;
    fixture.componentInstance.navigateToShipmentDetail = jasmine.createSpy();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector(`qls-button[data-test="card-button-${shipments[0].id}"]`)?.dispatchEvent(new Event('click'));
    expect(fixture.componentInstance.navigateToShipmentDetail).toHaveBeenCalledWith(shipments[0].id);
  });
});
