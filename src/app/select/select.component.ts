import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() options: any[];
  @Input() label: string = '';
  @Input() currentOption: string = '';
  @Output() valueChange: EventEmitter<FeedbackState> = new EventEmitter<FeedbackState>();
  selectedOption: any;

  ngOnInit() {
    this.selectedOption = this.options.find(option => option.value === this.currentOption)?.value;
  }

  onSelectionChange(selected: FeedbackState) {
    this.selectedOption = selected;
    this.valueChange.emit(selected);
  }
}
