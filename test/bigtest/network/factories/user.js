import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.datatype.uuid,
  username: faker.internet.userName,
  personal: {
    email: faker.internet.email,
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
  },
});
