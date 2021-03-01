import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnits from './AcquisitionUnits';

jest.mock('./AcquisitionUnitsList', () => {
  return () => <span>AcquisitionUnitsList</span>;
});
jest.mock('./AcquisitionUnitDetails', () => {
  return () => <span>AcquisitionUnitDetails</span>;
});
jest.mock('./AcquisitionUnitEditor', () => {
  return () => <span>AcquisitionUnitEditor</span>;
});

const locationMock = {
  hash: '',
  pathname: '',
  search: '',
};

const renderAcquisitionUnits = (path) => (render(
  <MemoryRouter
    initialEntries={[path]}
    initialIndex={0}
  >
    <AcquisitionUnits
      match={{
        path: '',
        params: {},
        url: '/',
      }}
      history={{
        action: 'PUSH',
        block: jest.fn(),
        createHref: jest.fn(),
        go: jest.fn(),
        listen: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        location: locationMock,
      }}
      location={locationMock}
    />
  </MemoryRouter>,
));

describe('AcquisitionUnits', () => {
  it('should be display AcquisitionUnitEditor when path is /create', () => {
    const { getByText } = renderAcquisitionUnits('/create');

    expect(getByText('AcquisitionUnitEditor')).toBeDefined();
  });

  it('should be display AcquisitionUnitEditor when path is /:id/edit', () => {
    const { getByText } = renderAcquisitionUnits('/5/edit');

    expect(getByText('AcquisitionUnitEditor')).toBeDefined();
  });

  it('should be display AcquisitionUnitsList when path is /', () => {
    const { getByText } = renderAcquisitionUnits('/');

    expect(getByText('AcquisitionUnitsList')).toBeDefined();
  });

  it('should be display AcquisitionUnitsList when path is /:id/view', () => {
    const { getByText } = renderAcquisitionUnits('/5/view');

    expect(getByText('AcquisitionUnitsList')).toBeDefined();
  });

  it('should be display AcquisitionUnitDetails when path is /:id/view', () => {
    const { getByText } = renderAcquisitionUnits('/5/view');

    expect(getByText('AcquisitionUnitDetails')).toBeDefined();
  });
});
