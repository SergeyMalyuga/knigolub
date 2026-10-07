import { ReviewCard } from '@knigolub/shared';

export const REVIEW_CARDS_MOCK: ReviewCard[] = [
  {
    id: '1',
    comment:
      'Впервые нашла клуб, где о книгах спорят без снобизма. ' +
      'За полгода прочитала больше, чем за три года до этого.',
    owner: {
      id: '1',
      email: 's@s.ru',
      firstName: 'Дарья',
      lastName: 'Константинова',
      avatar: null,
      registrationAt: 2023,
      reviews: 34,
    },
  },
  {
    id: '2',
    comment:
      'Подборки здесь честные: если книга слабая, об этом говорят прямо. Мой список «прочитать» вырос втрое.',
    owner: {
      id: '2',
      email: 's@s.ru',
      firstName: 'Илья',
      lastName: 'Терешков',
      avatar: null,
      registrationAt: 2021,
      reviews: 71,
    },
  },
  {
    id: '3',
    comment:
      'Слайдер и список — мелочь, но именно из-за них я перестала терять книги в закладках браузера.',
    owner: {
      id: '3',
      email: 's@s.ru',
      firstName: 'Марина',
      lastName: 'Сергеевна',
      avatar: null,
      registrationAt: 2022,
      reviews: 52,
    },
  },
];
