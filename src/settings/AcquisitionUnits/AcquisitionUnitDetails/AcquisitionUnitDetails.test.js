import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { queryHelpers } from '@testing-library/dom';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitDetails from './AcquisitionUnitDetails';
import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

jest.mock('../AcquisitionUnitMemberships', () => {
  return () => 'AcquisitionUnitMemberships';
});
jest.mock('./AcquisitionUnitDetailsActions', () => {
  return jest.fn(() => 'AcquisitionUnitDetailsActions');
});

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const renderAcquisitionUnitDetails = ({
  acquisitionUnit = {},
  close = jest.fn(),
  getEditPath = jest.fn(() => '/'),
  deleteUnit = jest.fn(),
  canDelete,
} = {}) => (render(
  <AcquisitionUnitDetails
    acquisitionUnit={acquisitionUnit}
    close={close}
    getEditPath={getEditPath}
    deleteUnit={deleteUnit}
    canDelete={canDelete}
  />,
));

describe('AcquisitionUnitDetails', () => {
  it('should display units membership', () => {
    const { getByText } = renderAcquisitionUnitDetails();

    expect(getByText('AcquisitionUnitMemberships')).toBeDefined();
  });

  describe('Sections toggle', () => {
    it('should collapse sections when Collapse all button is pressed', () => {
      const { getByText, container } = renderAcquisitionUnitDetails();

      user.click(getByText('stripes-components.collapseAll'));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse signle section when section title is pressed', () => {
      const { getByText, container } = renderAcquisitionUnitDetails();

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

  describe('Layout', () => {
    it('should display actions', () => {
      AcquisitionUnitDetailsActions.mockClear();

      const actionsProps = {
        editUnitPath: '/edit/5',
        deleteUnit: jest.fn(),
        canDelete: false,
      };
      const { getByText } = renderAcquisitionUnitDetails({
        acquisitionUnit: {},
        getEditPath: jest.fn(() => actionsProps.editUnitPath),
        ...actionsProps,
      });

      expect(AcquisitionUnitDetailsActions.mock.calls[0][0]).toEqual(actionsProps);
      expect(getByText('AcquisitionUnitDetailsActions')).toBeDefined();
    });

    it('should display metadata view when metadata is availalbe', () => {
      const { getByText } = renderAcquisitionUnitDetails({
        acquisitionUnit: {
          metadata: {},
        },
      });

      expect(getByText('ViewMetaData')).toBeDefined();
    });

    it('should not display metadata view when metadata is availalbe', () => {
      const { queryByText } = renderAcquisitionUnitDetails({
        acquisitionUnit: {
          metadata: undefined,
        },
      });

      expect(queryByText('ViewMetaData')).toBeNull();
    });
  });
});
