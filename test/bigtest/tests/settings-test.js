import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import SettingsInteractor from '../interactors/Settings';

describe('Settings - Acquisition units', () => {
  const settings = new SettingsInteractor();

  setupApplication();

  beforeEach(function () {
    this.visit('/settings/acquisition-units');
  });

  it('should be displayed', () => {
    expect(settings.isPresent).to.be.true;
  });
});
