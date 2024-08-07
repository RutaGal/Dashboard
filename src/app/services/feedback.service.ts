import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FeedbackState } from "../data/feedback-state.enum";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private httpClient: HttpClient) {
  }

  getFeedbackList() {
    const apiUrl = 'http://localhost:3001/api/feedbackList';

    return this.httpClient.get(apiUrl)
      .pipe(map((dto: any) =>
        dto?.map((feedback: any) => ({
          id: feedback.id,
          creationDate: feedback.created_at,
          gameName: feedback.game_name,
          feedbackState: feedback.feedbackState,
          platform: feedback.platform,
          version: feedback.version,
          category: feedback.category,
          content: feedback.content
        }))
      ));
  }

  updateFeedbackItemState(id: number, state: FeedbackState): Observable<any> {
    return this.httpClient.put(
      'http://localhost:3001/api/feedback/' + id,
      {
        feedbackState: state
      }
    );
  }
}
