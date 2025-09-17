import Footer from './layout/Footer';
import Container from './layout/Container';
import HashtagList from './hashtags/HashtagList';
import { useEffect, useState } from 'react';
import { TFeedbackItem } from '../lib/types';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const filteredFeedbackItems = selectedCompany
    ? feedbackItems.filter(
        (feedbackItem) =>
          feedbackItem.company.toLowerCase() === selectedCompany.toLowerCase()
      )
    : feedbackItems;

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const companyList = feedbackItems
    .map((item) => item.company)
    .filter(
      (companyName, index, array) => array.indexOf(companyName) === index
    );

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word: string) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company.substring(0, 1).toUpperCase(),
      company: company,
      text: text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
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
        feedbackItems={filteredFeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
