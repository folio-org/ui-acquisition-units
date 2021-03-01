import {
  createGetAll,
  createGetById,
  createPost,
  createPut,
} from '@folio/stripes-acq-components/test/bigtest/network/configs';

import { ACQUISITIONS_UNITS_API as API } from '../../../../src/settings/AcquisitionUnits/constants';

const SCHEMA_NAME = 'units';

const configUnits = server => {
  server.get(API, createGetAll(SCHEMA_NAME));
  server.get(`${API}/:id`, createGetById(SCHEMA_NAME));
  server.put(`${API}/:id`, createPut(SCHEMA_NAME));
  server.delete(`${API}/:id`, 'unit');
  server.post(`${API}`, createPost(SCHEMA_NAME));
};

export default configUnits;
