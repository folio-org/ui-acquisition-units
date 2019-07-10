import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: faker.random.uuid,
  acquisitionsUnitId: faker.random.uuid,
  userId: faker.random.uuid,
});
