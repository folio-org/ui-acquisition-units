import { ACQUISITIONS_UNITS_API } from '../../../../src/settings/AcquisitionUnits/constants';

const configUnits = server => {
  server.get(ACQUISITIONS_UNITS_API, (schema) => {
    return schema.units.all();
  });

  server.post(ACQUISITIONS_UNITS_API, (schema, request) => {
    const attrs = JSON.parse(request.requestBody) || {};
    const unit = schema.units.create(attrs);

    return unit.attrs;
  });

  server.put(`${ACQUISITIONS_UNITS_API}/:id`, () => null);

  server.get(`${ACQUISITIONS_UNITS_API}/:id`, (schema, request) => {
    return schema.units.find(request.params.id).attrs;
  });

  server.delete(`${ACQUISITIONS_UNITS_API}/:id`, 'unit');
};

export default configUnits;
