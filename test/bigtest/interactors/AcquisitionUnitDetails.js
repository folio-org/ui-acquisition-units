import {
  interactor,
  isPresent,
  Interactor,
} from '@bigtest/interactor';

export default interactor(class AcquisitionUnitDetailsInteractor {
  static defaultScope = '[data-test-ac-unit-details]';

  paneHeaderCenterButton = new Interactor('[data-test-pane-header-actions-button]');
  editUnitAction = new Interactor('[data-test-ac-unit-details-edit-action]');

  isLoaded = isPresent('[data-test-ac-unit-details-accordions]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
