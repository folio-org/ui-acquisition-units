import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.datatype.uuid,
  name: () => faker.company.companyName(),
  protectRead: faker.datatype.boolean,
  protectUpdate: faker.datatype.boolean,
  protectCreate: faker.datatype.boolean,
  protectDelete: faker.datatype.boolean,
  metadata: () => ({
    createdDate: faker.date.past(),
    updatedDate: faker.date.past(),
  }),
});
