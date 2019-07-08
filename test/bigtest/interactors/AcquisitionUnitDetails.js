import {
  interactor,
  isPresent,
  Interactor,
} from '@bigtest/interactor';

export default interactor(class AcquisitionUnitDetailsInteractor {
  static defaultScope = '[data-test-ac-unit-details]';

  paneHeaderCenterButton = new Interactor('[class*=paneHeaderCenterButton---]');
  editUnitAction = new Interactor('[data-test-ac-unit-details-edit-action]');

  isLoaded = isPresent('[data-test-ac-unit-details-accordions]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
