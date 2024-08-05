import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
          feedbackId: feedback.id,
          creationDate: feedback.created_at,
          gameName: feedback.game_id,
          feedbackState: feedback.feedbackState,
          platform: feedback.platform,
          version: feedback.version,
          category: feedback.category,
          content: feedback.content
        }))
      ));
  }
}
