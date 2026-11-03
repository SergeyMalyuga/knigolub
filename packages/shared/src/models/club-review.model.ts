export interface ClubReview {
  id: string;
  text: string;
  rating: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}
