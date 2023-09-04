import { useHistory } from 'react-router-dom';

import user from '@folio/jest-config-stripes/testing-library/user-event';
import { act, render, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { queryHelpers } from '@folio/jest-config-stripes/testing-library/dom';
import {
  HasCommand,
  expandAllSections,
  collapseAllSections,
} from '@folio/stripes/components';

import AcquisitionUnitDetails from './AcquisitionUnitDetails';
import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
  expandAllSections: jest.fn(),
  collapseAllSections: jest.fn(),
}));
jest.mock('../AcquisitionUnitMemberships', () => {
  return () => 'AcquisitionUnitMemberships';
});
jest.mock('./AcquisitionUnitDetailsActions', () => {
  return jest.fn(() => 'AcquisitionUnitDetailsActions');
});

const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, 'class');

const defaultProps = {
  acquisitionUnit: {},
  close: jest.fn(),
  getEditPath: jest.fn(() => '/'),
  deleteUnit: jest.fn(),
  canDelete: true,
};

const renderAcquisitionUnitDetails = (props = {}) => (render(
  <AcquisitionUnitDetails
    {...defaultProps}
    {...props}
  />,
));

if (global.document?.originalCreateRange) {
  global.document.createRange = global.document.originalCreateRange;
}

describe('AcquisitionUnitDetails', () => {
  it('should display units membership', () => {
    const { getByText } = renderAcquisitionUnitDetails();

    expect(getByText('AcquisitionUnitMemberships')).toBeDefined();
  });

  describe('Sections toggle', () => {
    it('should collapse sections when Collapse all button is pressed', async () => {
      const { getByText, container } = renderAcquisitionUnitDetails();

      await act(async () => user.click(getByText('stripes-components.collapseAll')));

      const sections = queryAllByClass(container, 'defaultCollapseButton');

      expect(
        sections
          .filter(collapseButton => collapseButton.getAttribute('aria-expanded') === 'false')
          .length,
      ).toBe(sections.length);
    });

    it('should collapse signle section when section title is pressed', async () => {
      const { getByText, container } = renderAcquisitionUnitDetails();

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

  describe('Shortcuts', () => {
    beforeEach(() => {
      HasCommand.mockClear();
    });

    it('should expand all sections', async () => {
      renderAcquisitionUnitDetails({
        acquisitionUnit: {
          metadata: {},
        },
      });

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'expandAllSections').handler());

      expect(expandAllSections).toHaveBeenCalled();
    });

    it('should collapse all sections', async () => {
      renderAcquisitionUnitDetails({
        acquisitionUnit: {
          metadata: {},
        },
      });

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'collapseAllSections').handler());

      expect(collapseAllSections).toHaveBeenCalled();
    });

    it('should translate to edit form', async () => {
      const pushMock = jest.fn();

      useHistory.mockClear().mockReturnValue({
        push: pushMock,
      });
      renderAcquisitionUnitDetails();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'edit').handler());

      expect(pushMock).toHaveBeenCalled();
    });
  });
});
