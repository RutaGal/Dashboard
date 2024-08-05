import { Component } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FeedbackService } from "../feedback.service";
import { HttpClient } from "@angular/common/http";
import { Feedback } from "../data/feedback.model";
import { CommonModule } from "@angular/common";
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [CommonModule, DashboardItemComponent],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss'
})
export class DashboardTableComponent {

  feedbackList: Feedback[] = [];

  constructor(private httpClient: HttpClient, private feedbackService: FeedbackService) {
    this.feedbackService.getFeedbackList().pipe(takeUntilDestroyed())
      .subscribe((feedback) => {
        this.feedbackList = feedback;
      })
  }
}
