import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { queryHelpers } from '@testing-library/dom';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitEditor from './AcquisitionUnitEditor';

jest.mock('@folio/stripes-components/lib/Layer', () => {
  // eslint-disable-next-line react/prop-types
  return ({ children }) => (
    <>{children}</>
  );
});
jest.mock('../AcquisitionUnitMemberships', () => {
  return () => 'AcquisitionUnitMemberships';
});

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const renderAcquisitionUnitEditor = ({
  acquisitionUnit = {},
  handleSubmit = jest.fn(),
  close = jest.fn(),
  pristine = true,
  submitting = false,
} = {}) => (render(
  <Provider store={createStore(() => {})}>
    <MemoryRouter>
      <AcquisitionUnitEditor
        acquisitionUnit={acquisitionUnit}
        handleSubmit={handleSubmit}
        close={close}
        pristine={pristine}
        submitting={submitting}
      />
    </MemoryRouter>
  </Provider>,
));

describe('AcquisitionUnitEditor', () => {
  describe('Sections toggle', () => {
    it('should collapse sections when Collapse all button is pressed', () => {
      const { getByText, container } = renderAcquisitionUnitEditor();

      user.click(getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse signle section when section title is pressed', () => {
      const { getByText, container } = renderAcquisitionUnitEditor();

      user.click(getByText('stripes-components.collapseAll'));
      user.click(getByText('ui-acquisition-units.accordion.generalInfo'));

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
    it('should be displayed when metadata is availalbe', () => {
      const { getByText } = renderAcquisitionUnitEditor({
        acquisitionUnit: {
          metadata: {},
        },
      });

      expect(getByText('ViewMetaData')).toBeDefined();
    });
  });
});
