import FeedbackItem from './FeedbackItem';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { TFeedbackItem } from '../../lib/types';

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage,
}: {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
}) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
