import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.random.uuid,
  name: () => faker.company.companyName(),
  protectRead: faker.random.boolean,
  protectUpdate: faker.random.boolean,
  protectCreate: faker.random.boolean,
  protectDelete: faker.random.boolean,
  metadata: () => ({
    createdDate: faker.date.past(),
    updatedDate: faker.date.past(),
  }),
});
