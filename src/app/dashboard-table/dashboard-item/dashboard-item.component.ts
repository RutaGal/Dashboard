import { Component, Input } from '@angular/core';
import { SelectComponent } from "../../select/select.component";
import { Feedback } from "../../data/feedback.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'tr[app-dashboard-item]',
  standalone: true,
  imports: [
    SelectComponent,
    DatePipe
  ],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.scss'
})
export class DashboardItemComponent {
  @Input() item: Feedback;
}
