import { USERS_API } from '../../../../src/settings/AcquisitionUnits/constants';

const configUsers = server => {
  server.get(USERS_API);
};

export default configUsers;
