import {
  clickable,
  collection,
  interactor,
  Interactor,
  is,
  isPresent,
} from '@bigtest/interactor';

@interactor class AcquisitionUnits {
  static defaultScope = '[data-test-ac-units-nav-list]';
  list = collection('[class*=NavListItem---]', {
    isFocused: is(':focus'),
    click: clickable(),
  });

  addLineBtn = new Interactor('[data-test-plugin-find-po-line-button]');
}

export default interactor(class AcquisitionUnitsListInteractor {
  static defaultScope = '#pane-ac-units-list';

  newUnitButton = new Interactor('[data-test-new-ac-unit]');

  units = new AcquisitionUnits();

  isLoaded = isPresent('[data-test-ac-units-nav-list]');
  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
