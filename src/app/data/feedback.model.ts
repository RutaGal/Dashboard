import { Platform } from "./platform.enum";
import { Category } from "./category.enum";
import { FeedbackState } from "./feedback-state.enum";

export class Feedback {
  id: number = 0;
  creationDate: Date = new Date();
  gameName: string = '';
  feedbackState: FeedbackState = FeedbackState.New;
  platform: Platform = Platform.iOS;
  version: string = '';
  category: Category = Category.Bug;
  content: string = '';
}
