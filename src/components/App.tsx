import Footer from './Footer';
import Container from './Container';
import HashtagList from './HashtagList';
import { useEffect, useState } from 'react';
import { TFeedbackItem } from '../lib/types';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(' ')
      .find((word: string) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      companyName: companyName,
      text: text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);
  };

  useEffect(
    // the traditional way to fetch data with an async function uses .then and .catch
    //   () => {
    //   setIsLoading(true);
    //   fetch(
    //     'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
    //   )
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error();
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       setFeedbackItems(data.feedbacks);
    //       setIsLoading(false);
    //     })
    //     .catch(() => {
    //       setErrorMessage('Something went wrong');
    //       setIsLoading(false);
    //     });
    // }
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
          );
          if (!response.ok) {
            throw new Error();
          }
          const data = await response.json();
          setFeedbackItems(data.feedbacks);
        } catch {
          setErrorMessage('Something went wrong, try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    },
    []
  );

  return (
    <div className="app">
      <Footer />
      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
