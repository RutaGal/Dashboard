import { Component, model } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FeedbackService } from "../services/feedback.service";
import { HttpClient } from "@angular/common/http";
import { Feedback } from "../data/feedback.model";
import { CommonModule } from "@angular/common";
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";
import { FeedbackState } from "../data/feedback-state.enum";
import { SelectComponent } from "../select/select.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [CommonModule, DashboardItemComponent, SelectComponent, FormsModule],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss'
})
export class DashboardTableComponent {
  feedbackList: Feedback[];
  filteredFeedbackList: Feedback[] = [];
  filterCriteriaOptions = [
    {
      name: 'Game',
      value: 'gameName',
    },
    {
      name: 'Feedback State',
      value: 'feedbackState',
    },
    {
      name: 'Platform',
      value: 'platform',
    },
    {
      name: 'Category',
      value: 'category',
    }
  ];
  selectedFilterCriteria = this.filterCriteriaOptions[0].value;
  feedbackStateOptions = [
    {
      name: 'New',
      value: FeedbackState.New,
    },
    {
      name: 'In Progress',
      value: FeedbackState.InProgress,
    },
    {
      name: 'Completed',
      value: FeedbackState.Completed,
    }
  ];

  value = model<string>('');
  constructor(private httpClient: HttpClient,
              private feedbackService: FeedbackService) {
    this.feedbackService.getFeedbackList().pipe(takeUntilDestroyed())
      .subscribe((feedbacks: Feedback[]) => {
        this.feedbackList = feedbacks;
        this.filteredFeedbackList = feedbacks;
      })
  }

  onInputChanged() {
    if (this.value().length === 0) {
      this.filteredFeedbackList = this.feedbackList;
    } else {
      this.filteredFeedbackList = this.feedbackList.filter(feedback => {
        const searchTerm = this.value().toLowerCase();
        switch (this.selectedFilterCriteria) {
          case 'gameName':
            return feedback.gameName && feedback.gameName.toLowerCase().includes(searchTerm);
          case 'feedbackState':
            return feedback.feedbackState && feedback.feedbackState.toLowerCase().includes(searchTerm);
          case 'platform':
            return feedback.platform && feedback.platform.toLowerCase().includes(searchTerm);
          case 'category':
            return feedback.category && feedback.category.toLowerCase().includes(searchTerm);
          default:
            return [];
        }
      });
    }
  }

  onFilterCriteriaSelected(value: string) {
    this.selectedFilterCriteria = value;
    this.value.set('');
    this.onInputChanged();
  }
}
