import {
  interactor,
  collection,
  Interactor,
} from '@bigtest/interactor';

export default interactor(class AcquisitionUnitMembershipsInteractor {
  static defaultScope = '[data-test-memberships]';

  memberships = collection('[class*=mclRow---]', {
    removeMembership: new Interactor('[data-test-memberships-actions-remove]'),
  });
});
