import { Component, input, output, signal, effect } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.html',
})
export class PaginatorComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();
  pagesToDisplay = signal<(number | string)[]>([]);

  constructor() {
    effect(() => {
      const current = this.currentPage();
      const total = this.totalPages();
      const visiblePagesCount = 10;

      if (total <= 0) {
        this.pagesToDisplay.set([]);
        return;
      }

      const pages: (number | string)[] = [];

      pages.push(1);

      if (current > visiblePagesCount / 2 + 1 && total > visiblePagesCount) {
        pages.push('...');
      }

      const start = Math.max(2, current - Math.floor(visiblePagesCount / 2) + 2);
      const end = Math.min(total - 1, current + Math.floor(visiblePagesCount / 2) - 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - visiblePagesCount / 2 && total > visiblePagesCount) {
        pages.push('...');
      }

      if (total > 1) {
        pages.push(total);
      }

      this.pagesToDisplay.set([...new Set(pages)]);
    });
  }

  goToPage(page: number | string) {
    if (typeof page === 'number') {
      if (page >= 1 && page <= this.totalPages()) {
        this.pageChange.emit(page);
      }
    }
  }
}
