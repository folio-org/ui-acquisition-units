import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: faker.random.uuid,
  acquisitionsUnitId: faker.random.uuid,
  userId: faker.random.uuid,
});
