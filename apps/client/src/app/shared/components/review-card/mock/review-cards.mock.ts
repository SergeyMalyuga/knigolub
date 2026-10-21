import { ReviewCard } from '@knigolub/shared';
import { DEFAULT_AVATAR_URL } from '../../../../core/constants/const';

export const REVIEW_CARDS_MOCK: ReviewCard[] = [
  {
    id: '1',
    comment:
      'Впервые нашла клуб, где о книгах спорят без снобизма. ' +
      'За полгода прочитала больше, чем за три года до этого.',
    owner: {
      id: '1',
      email: 's@s.ru',
      username: 'DarSlot',
      avatarUrl: DEFAULT_AVATAR_URL,
      registrationAt: new Date(),
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
      username: 'Nigtbook',
      avatarUrl: DEFAULT_AVATAR_URL,
      registrationAt: new Date(),
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
      username: 'ANdersen',
      avatarUrl: DEFAULT_AVATAR_URL,
      registrationAt: new Date(),
      reviews: 52,
    },
  },
];
