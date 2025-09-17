import Header from './Header';
import FeedbackList from '../feedback/FeedbackList';
import { TFeedbackItem } from '../../lib/types';

export default function Container({
  feedbackItems,
  isLoading,
  errorMessage,
  handleAddToList,
}: {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  handleAddToList: (text: string) => void;
}) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </main>
  );
}
