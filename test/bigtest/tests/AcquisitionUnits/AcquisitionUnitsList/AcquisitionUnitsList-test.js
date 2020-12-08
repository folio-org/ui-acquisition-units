import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import AcquisitionUnitsListInteractor from '../../../interactors/AcquisitionUnitsList';
import AcquisitionUnitEditorInteractor from '../../../interactors/AcquisitionUnitEditor';
import AcquisitionUnitDetailsInteractor from '../../../interactors/AcquisitionUnitDetails';

const UNITS_COUNT = 15;

describe('Acquisition units list', () => {
  setupApplication();

  const acquisitionUnitsList = new AcquisitionUnitsListInteractor();

  beforeEach(async function () {
    this.server.createList('unit', UNITS_COUNT);

    this.visit('/settings/acquisition-units');
    await acquisitionUnitsList.whenLoaded();
  });

  it('should show the list of acq unit items', () => {
    expect(acquisitionUnitsList.isPresent).to.be.true;
  });

  it('should render row for each invoice from the response', () => {
    expect(acquisitionUnitsList.units().length).to.be.equal(UNITS_COUNT);
  });

  it('should display create the new invoice button', () => {
    expect(acquisitionUnitsList.newUnitButton.isPresent).to.be.true;
  });

  describe('new acquisition unit action', () => {
    const acquisitionUnitEditor = new AcquisitionUnitEditorInteractor();

    beforeEach(async function () {
      await acquisitionUnitsList.newUnitButton.click();
      await acquisitionUnitEditor.whenLoaded();
    });

    it('should open unit editor', () => {
      expect(acquisitionUnitEditor.isVisible).to.be.true;
    });
  });

  describe('view acquisition unit deatils', () => {
    const acquisitionUnitDetails = new AcquisitionUnitDetailsInteractor();

    beforeEach(async function () {
      await acquisitionUnitsList.units(0).click();
      await acquisitionUnitDetails.whenLoaded();
    });

    it('should open unit details', () => {
      expect(acquisitionUnitDetails.isVisible).to.be.true;
    });
  });
});
