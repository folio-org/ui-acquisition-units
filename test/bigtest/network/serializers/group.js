import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.groups)) {
      return {
        usergroups: json.groups,
        totalRecords: json.groups.length,
      };
    }

    return json.groups;
  },
});
