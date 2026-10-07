import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CollectionCard, ReviewCard } from '@knigolub/shared';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { NgOptimizedImage } from '@angular/common';
import { PluralizePipe } from '../../pipes/pluralize.pipe';

@Component({
  selector: 'app-author-block',
  imports: [InitialsPipe, NgOptimizedImage, PluralizePipe],
  templateUrl: './author-block.component.html',
  styleUrl: './author-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorBlockComponent {
  @Input({ required: true }) card!: CollectionCard | ReviewCard;

  public isCollectionCard(value: CollectionCard | ReviewCard): value is CollectionCard {
    return 'books' in value;
  }

  public get authorName(): string {
    return this.isCollectionCard(this.card)
      ? this.card.author
      : `${this.card.owner.firstName} ${this.card.owner.lastName}`;
  }

  public get authorAvatar(): string | null {
    return this.isCollectionCard(this.card) ? this.card.avatar : this.card.owner.avatar;
  }
}
