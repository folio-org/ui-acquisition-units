import { USER_GROUPS_API } from '../../../../src/settings/AcquisitionUnits/constants';

const configGroups = server => {
  server.get(USER_GROUPS_API);
};

export default configGroups;
