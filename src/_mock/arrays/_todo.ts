import { add, subDays } from 'date-fns';
//
import _mock from '@yourapp/src/_mock';
import { randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _todo = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index + 1),
  createDate: subDays(new Date(), index),
  dueDate: add(new Date(), { days: index + 15, hours: index }),
  status: randomInArray(['completed', 'progressing', 'overdue']),
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit iste cupiditatevoluptas enim neque ea, dolorum consequuntur unde facere quidem dolore abnihil distinctio alias non commodi harum. Officoptio, saepe libero, accusamuseius soluta cum labore consectetur suscipit aspvoluptatibus? Iure,perspiciatis. Obcaecati pariatur ab deRepudiandae nihil esse consectetur,tempora officiis saepe enim rerum deleniti. Nobiillo sunt omnis, non placeatfugiat cupiditate. Quibusdam, voluptates accusPossimus, perferendisdistinctio. Quis voluptas autem dicta cum illumassumenda, debitis minima,voluptate provident numquam possimus consequatur?',
}));
