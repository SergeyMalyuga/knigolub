import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { selectCurrentPage } from '../../../../store/book/selectors/book.selectors';

@Component({
  selector: 'app-swiper',
  imports: [],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  private store = inject(Store<AppState>);
  private page = this.store.selectSignal(selectCurrentPage);
  private isInitialized = false;
  private swiper!: Swiper;

  constructor() {
    effect(() => {
      const page = this.page();

      if (page && this.swiper && this.isInitialized) {
        this.swiper.slideTo(0, 0);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Pagination, Navigation],
      speed: 600,
      slidesPerView: 4,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1290: {
          slidesPerView: 4,
        },
      },
      on: {
        init: () => (this.isInitialized = true),
      },
    });
  }

  public ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }
}
