import ApplicationSerializer from './application';

const { isArray } = Array;

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);

    if (isArray(json.users)) {
      return {
        users: json.users,
        totalRecords: json.users.length,
      };
    }

    return json.users;
  },
});
