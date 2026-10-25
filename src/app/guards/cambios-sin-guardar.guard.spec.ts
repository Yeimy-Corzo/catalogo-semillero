import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { cambiosSinGuardarGuard } from './cambios-sin-guardar.guard';

describe('cambiosSinGuardarGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cambiosSinGuardarGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
