import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import AcquisitionUnitDetailsInteractor from '../../../interactors/AcquisitionUnitDetails';
import AcquisitionUnitEditorInteractor from '../../../interactors/AcquisitionUnitEditor';

describe('Acquisition unit details', () => {
  setupApplication();

  const acquisitionUnitDetails = new AcquisitionUnitDetailsInteractor();

  beforeEach(async function () {
    const unit = this.server.create('unit');

    this.visit(`/settings/acquisition-units/${unit.id}/view`);
    await acquisitionUnitDetails.whenLoaded();
  });

  it('should be rendered', () => {
    expect(acquisitionUnitDetails.isPresent).to.be.true;
  });

  describe('edit acquisition unit action', () => {
    const acquisitionUnitEditor = new AcquisitionUnitEditorInteractor();

    beforeEach(async function () {
      await acquisitionUnitDetails.paneHeaderCenterButton.click();
      await acquisitionUnitDetails.editUnitAction.click();
      await acquisitionUnitEditor.whenLoaded();
    });

    it('should open unit editor', () => {
      expect(acquisitionUnitEditor.isVisible).to.be.true;
    });
  });
});
