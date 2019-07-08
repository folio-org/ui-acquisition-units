import {
  interactor,
  isPresent,
  Interactor,
  fillable,
} from '@bigtest/interactor';

export default interactor(class AcquisitionUnitEditorInteractor {
  static defaultScope = '[data-test-ac-unit-form]';

  isLoaded = isPresent('[data-test-ac-unit-form-pane]');

  saveButton = new Interactor('[data-test-save-ac-unit]');

  fillUnitName = fillable('[name="name"]');

  whenLoaded() {
    return this.timeout(5000).when(() => this.isLoaded);
  }
});
