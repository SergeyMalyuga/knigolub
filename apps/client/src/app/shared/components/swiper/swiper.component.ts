import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {Swiper} from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';

@Component({
  selector: 'app-swiper',
  imports: [],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements AfterViewInit {
  private swiper!: Swiper;

  ngAfterViewInit(): void {
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
      }
    })
  }
}
