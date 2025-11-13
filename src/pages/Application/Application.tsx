import React from 'react';
import styles from './Application.module.scss';
import Card from '../../components/ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import experimentAndDeployImg from '../../assets/experiment-and-deploy.svg';
import deployedApplicationImg from '../../assets/deployed-application.svg';
import dataPreparationImg from '../../assets/data-preparation.svg';

const Application: React.FC = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Data Preparation',
      description: 'Prepare and clean your data for analysis',
      image: dataPreparationImg,
      route: '/data-preparation'
    },
    {
      title: 'Experiment and Deploy',
      description: 'Experiment and deploy your models',
      image: experimentAndDeployImg,
      route: '/experiment-deploy'
    },
    {
      title: 'Deployed Applications',
      description: 'Manage your deployed applications',
      image: deployedApplicationImg,
      route: '/deployed-application'  
    },
  ];

  return (
    <div className={styles.home}>
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

export default Application;