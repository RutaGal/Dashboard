import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FeedbackState } from "../data/feedback-state.enum";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit{
  options: FeedbackState[] = [FeedbackState.New, FeedbackState.InProgress, FeedbackState.Completed];
  currentFeedbackState = input<string>('');

  selectedOption: any;

  ngOnInit() {
    this.selectedOption = this.options.find(option => option === this.currentFeedbackState());
  }

  onSelectionChange(selected: FeedbackState) {
    this.selectedOption = selected;
  }
}
