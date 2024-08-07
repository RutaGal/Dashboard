import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(protected router: Router) {
  }

  navigateToGamesList() {
    this.router.navigate(['/games']).then();
  }

  navigateToFeedbackList() {
    this.router.navigate(['/']).then();
  }
}
