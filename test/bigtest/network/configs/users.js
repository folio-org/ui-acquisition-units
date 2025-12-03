import { USERS_API } from '@folio/stripes-acq-components';

const configUsers = server => {
  server.get(USERS_API);
};

export default configUsers;
