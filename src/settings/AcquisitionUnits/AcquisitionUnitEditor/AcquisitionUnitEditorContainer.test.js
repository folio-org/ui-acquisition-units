import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitEditorContainer, { NEW_UNIT_VALUES } from './AcquisitionUnitEditorContainer';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

jest.mock('./AcquisitionUnitEditor', () => {
  return jest.fn(() => 'AcquisitionUnitEditor');
});

const renderAcquisitionUnitEditorContainer = ({
  match = {
    params: {},
    path: '',
    url: '',
  },
  resources = {},
  mutator = {},
  close = jest.fn(),
} = {}) => (render(
  <AcquisitionUnitEditorContainer
    match={match}
    resources={resources}
    mutator={mutator}
    close={close}
  />,
));

describe('AcquisitionUnitEditorContainer', () => {
  beforeEach(() => {
    AcquisitionUnitEditor.mockClear();
  });

  it('should display AcquisitionUnitEditor', () => {
    const { getByText } = renderAcquisitionUnitEditorContainer();

    expect(getByText('AcquisitionUnitEditor')).toBeDefined();
  });

  it('should fetch acq unit when id is passed in params', () => {
    const record = {
      protectUpdate: false,
      protectCreate: true,
      protectDelete: false,
    };

    renderAcquisitionUnitEditorContainer({
      resources: {
        acquisitionUnit: { records: [record] },
      },
      match: {
        params: { id: 3 },
        path: '',
        url: '',
      },
    });

    expect(AcquisitionUnitEditor.mock.calls[0][0].acquisitionUnit).toEqual(record);
  });

  it('should not fetch acq unit when id is not passed in params', () => {
    renderAcquisitionUnitEditorContainer();

    expect(AcquisitionUnitEditor.mock.calls[0][0].acquisitionUnit).toEqual(NEW_UNIT_VALUES);
  });

  describe('Save unit', () => {
    it('should be passed as submit prop', () => {
      renderAcquisitionUnitEditorContainer();

      expect(AcquisitionUnitEditor.mock.calls[0][0].onSubmit).toBeDefined();
    });

    it('should make post request to save unit when id is not passed in params', async () => {
      const postMock = jest.fn(() => Promise.resolve({ id: 5 }));

      renderAcquisitionUnitEditorContainer({
        mutator: {
          acquisitionUnits: {
            POST: postMock,
          },
        },
      });

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(postMock).toHaveBeenCalled();
    });

    it('should make put request to save unit when id is passed in params', async () => {
      const putMock = jest.fn(() => Promise.resolve({ id: 3 }));

      renderAcquisitionUnitEditorContainer({
        mutator: {
          acquisitionUnit: {
            PUT: putMock,
          },
        },
        match: {
          params: { id: 3 },
          path: '',
          url: '',
        },
      });

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(putMock).toHaveBeenCalled();
    });

    it('should close editor when unit is saved', async () => {
      const postMock = jest.fn(() => Promise.resolve({ id: 5 }));
      const closeMock = jest.fn();

      renderAcquisitionUnitEditorContainer({
        mutator: {
          acquisitionUnits: {
            POST: postMock,
          },
        },
        close: closeMock,
      });

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(closeMock).toHaveBeenCalled();
    });
  });
});
