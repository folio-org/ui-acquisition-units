import { ACQUISITIONS_UNIT_MEMBERSHIPS_API } from '../../../../src/settings/AcquisitionUnits/constants';

const configMemberships = server => {
  server.get(ACQUISITIONS_UNIT_MEMBERSHIPS_API, (schema) => {
    return schema.memberships.all();
  });

  server.post(ACQUISITIONS_UNIT_MEMBERSHIPS_API, (schema, request) => {
    const attrs = JSON.parse(request.requestBody) || {};
    const unit = schema.memberships.create(attrs);

    return unit.attrs;
  });

  server.put(`${ACQUISITIONS_UNIT_MEMBERSHIPS_API}/:id`, () => null);

  server.get(`${ACQUISITIONS_UNIT_MEMBERSHIPS_API}/:id`, (schema, request) => {
    return schema.memberships.find(request.params.id).attrs;
  });

  server.delete(`${ACQUISITIONS_UNIT_MEMBERSHIPS_API}/:id`, 'membership');
};

export default configMemberships;
