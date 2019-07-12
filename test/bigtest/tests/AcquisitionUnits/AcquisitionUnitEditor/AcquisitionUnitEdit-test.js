import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import AcquisitionUnitEditorInteractor from '../../../interactors/AcquisitionUnitEditor';
import AcquisitionUnitDetailsInteractor from '../../../interactors/AcquisitionUnitDetails';
import AcquisitionUnitMembershipsInteractor from '../../../interactors/AcquisitionUnitMemberships';

describe('Acquisition unit form - edit', () => {
  setupApplication();

  const acquisitionUnitEditor = new AcquisitionUnitEditorInteractor();
  const acquisitionUnitMemberships = new AcquisitionUnitMembershipsInteractor();

  beforeEach(async function () {
    const unit = this.server.create('unit');

    this.visit(`/settings/acquisition-units/${unit.id}/edit`);
    await acquisitionUnitEditor.whenLoaded();
  });

  it('should be rendered', () => {
    expect(acquisitionUnitEditor.isPresent).to.be.true;
  });

  it('should not display memberships', () => {
    expect(acquisitionUnitMemberships.isPresent).to.be.true;
  });

  describe('save action', () => {
    const acquisitionUnitDetails = new AcquisitionUnitDetailsInteractor();

    beforeEach(async function () {
      await acquisitionUnitEditor.fillUnitName('test unit name - edit');
      await acquisitionUnitEditor.saveButton.click();
      await acquisitionUnitDetails.whenLoaded();
    });

    it('should open details view', () => {
      expect(acquisitionUnitDetails.isPresent).to.be.true;
    });
  });
});
