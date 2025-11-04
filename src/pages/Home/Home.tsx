import React from 'react';
import styles from './Home.module.scss';
import Card from '../../components/ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import talkToDocumentImg from '../../assets/talk-to-document.svg';
import talkToDataImg from '../../assets/talk-to-data.svg';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Talk to Document',
      description: 'Conversation AI bot for unstructured data',
      image: talkToDocumentImg,
      route: '/talk-to-document'
    },
    {
      title: 'Talk to Data',
      description: 'Conversation AI bot for structured data',
      image: talkToDataImg,
      route: '/talk-to-data'
    },
    // {
    //   title: 'View Data',
    //   description: 'To view data from Snowflake.',
    //   image: '/src/assets/view-data.svg', // placeholder
    //   route: '/view-data'
    // },
    // {
    //   title: 'Execute Query',
    //   description: 'To execute generic queries.',
    //   image: '/src/assets/execute-query.svg', // placeholder
    //   route: '/execute-query'
    // }
  ];

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to RAISE</h1>
        <p className={styles.tagline}>
          From idea to AI - design, test, and deploy on a single platform.
        </p>
      </div>
      <div className={styles.cards}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            onClick={() => navigate(card.route)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;