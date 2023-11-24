import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import user from '@folio/jest-config-stripes/testing-library/user-event';
import { waitFor, render, act } from '@folio/jest-config-stripes/testing-library/react';
import { queryHelpers } from '@folio/jest-config-stripes/testing-library/dom';
import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';
import { handleKeyCommand } from '@folio/stripes-acq-components';

import AcquisitionUnitEditor from './AcquisitionUnitEditor';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  handleKeyCommand: jest.fn(fn => fn),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  ...jest.requireActual('@folio/stripes-components/lib/Commander'),
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Layer', () => {
  // eslint-disable-next-line react/prop-types
  return ({ children }) => (
    <>{children}</>
  );
});
jest.mock('../AcquisitionUnitMemberships', () => {
  return () => 'AcquisitionUnitMemberships';
});

if (global.document?.originalCreateRange) {
  global.document.createRange = global.document.originalCreateRange;
}

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const defaultProps = {
  acquisitionUnit: {},
  handleSubmit: jest.fn(),
  close: jest.fn(),
  pristine: true,
  submitting: false,
};

const renderAcquisitionUnitEditor = (props = {}) => render(
  <Provider store={createStore(() => {})}>
    <MemoryRouter>
      <AcquisitionUnitEditor
        {...defaultProps}
        {...props}
      />
    </MemoryRouter>
  </Provider>,
);

describe('AcquisitionUnitEditor', () => {
  describe('Sections toggle', () => {
    it('should render component', async () => {
      const { getByText } = renderAcquisitionUnitEditor();

      const nameInput = getByText('ui-acquisition-units.unit.name');
      const descriptionInput = getByText('ui-acquisition-units.unit.description');

      expect(nameInput).toBeDefined();
      expect(descriptionInput).toBeDefined();
    });

    it('should collapse sections when Collapse all button is pressed', async () => {
      const { getByText, container } = renderAcquisitionUnitEditor();

      await act(async () => user.click(getByText('stripes-components.collapseAll')));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse signle section when section title is pressed', async () => {
      const { getByText, container } = renderAcquisitionUnitEditor();

      await act(async () => user.click(getByText('stripes-components.collapseAll')));
      await act(async () => user.click(getByText('ui-acquisition-units.accordion.generalInfo')));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length - 1);
    });
  });

  describe('AcquisitionUnitMemberships section', () => {
    it('should be displayed when unit is not new', () => {
      const { getByText } = renderAcquisitionUnitEditor({ acquisitionUnit: { id: 5 } });

      expect(getByText('AcquisitionUnitMemberships')).toBeDefined();
    });

    it('should not be displayed when unit is new', () => {
      const { queryByText } = renderAcquisitionUnitEditor();

      expect(queryByText('AcquisitionUnitMemberships')).toBeNull();
    });
  });

  describe('Metadata view', () => {
    it('should be displayed when metadata is available', () => {
      const { getByText } = renderAcquisitionUnitEditor({
        acquisitionUnit: {
          metadata: {},
        },
      });

      expect(getByText('ViewMetaData')).toBeDefined();
    });
  });

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
      handleKeyCommand.mockClear();
    });

    it('should expand all sections', async () => {
      renderAcquisitionUnitEditor();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler());

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should collapse all sections', async () => {
      renderAcquisitionUnitEditor();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler());

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should close form', async () => {
      renderAcquisitionUnitEditor();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'cancel').handler());

      expect(defaultProps.close).toHaveBeenCalled();
    });

    it('should handle form submitting', async () => {
      renderAcquisitionUnitEditor();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'save').handler());

      expect(defaultProps.handleSubmit).toHaveBeenCalled();
    });
  });
});
