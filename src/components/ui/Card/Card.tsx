import React from 'react';
import './Card.scss';

interface CardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card__image" />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
    </div>
  );
};

export default Card;