import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.memberships)) {
      return {
        acquisitionsUnitMemberships: json.memberships,
        totalRecords: json.memberships.length,
      };
    }

    return json.memberships;
  },
});
