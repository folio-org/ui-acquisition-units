import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../../helpers/setup-application';
import AcquisitionUnitDetailsInteractor from '../../../interactors/AcquisitionUnitDetails';
import AcquisitionUnitMembershipsInteractor from '../../../interactors/AcquisitionUnitMemberships';

describe('Acquisition unit details - membership', () => {
  setupApplication();

  const acquisitionUnitDetails = new AcquisitionUnitDetailsInteractor();
  const acquisitionUnitMemberships = new AcquisitionUnitMembershipsInteractor();

  beforeEach(async function () {
    const unit = this.server.create('unit');
    const user = this.server.create('user');

    this.server.create('membership', {
      userId: user.id,
      acquisitionsUnitId: unit.id,
    });

    this.visit(`/settings/acquisition-units/${unit.id}/view`);
    await acquisitionUnitDetails.whenLoaded();
  });

  it('should be rendered', () => {
    expect(acquisitionUnitMemberships.isPresent).to.be.true;
  });

  it('should display create memberships', () => {
    expect(acquisitionUnitMemberships.memberships().length !== 0).to.be.true;
  });

  describe('remove action', () => {
    beforeEach(async function () {
      await acquisitionUnitMemberships.memberships(0).removeMembership.click();
    });

    it('should remove membership', () => {
      expect(acquisitionUnitMemberships.memberships().length === 0).to.be.true;
    });
  });
});
