import {
  collection,
  interactor,
  Interactor,
  isPresent,
} from '@bigtest/interactor';

export default interactor(class AcquisitionUnitsListInteractor {
  static defaultScope = '#pane-ac-units-list';

  newUnitButton = new Interactor('[data-test-new-ac-unit]');

  units = collection('[class*=NavListItem---]');

  isLoaded = isPresent('[data-test-ac-units-nav-list]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
