import { Component, Input, OnDestroy } from '@angular/core';
import { SelectComponent } from "../../select/select.component";
import { Feedback } from "../../data/feedback.model";
import { DatePipe, NgClass } from "@angular/common";
import { FeedbackState } from "../../data/feedback-state.enum";
import { Category } from "../../data/category.enum";
import { Subscription } from "rxjs";
import { FeedbackService } from "../../services/feedback.service";

@Component({
  selector: 'tr[app-dashboard-item]',
  standalone: true,
  imports: [
    SelectComponent,
    DatePipe,
    NgClass
  ],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss'
})
export class DashboardItemComponent implements OnDestroy{
  @Input() feedbackItem: Feedback;
  @Input() options: any[];
  protected readonly FeedbackState = FeedbackState;
  protected readonly Category = Category;
  private feedbackStateSubscription: Subscription;

  constructor(private feedbackService: FeedbackService) {
  }

  ngOnDestroy() {
    this.feedbackStateSubscription?.unsubscribe();
  }

  onFeedbackStateChange(selectedState: FeedbackState) {
    this.feedbackItem.feedbackState = selectedState;
    this.feedbackStateSubscription?.unsubscribe();
    this.feedbackStateSubscription = this.feedbackService.updateFeedbackItemState(this.feedbackItem.id, selectedState)
      .subscribe();
  }
}
