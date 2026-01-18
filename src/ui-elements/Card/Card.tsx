import React from 'react';
import './Card.scss';

interface CardProps {
    title: string;
    author: string;
    cover?: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, author, cover, onClick }) => {
    return (
        <div className="transition-all duration-200 card hover:shadow-lg hover:scale-102" onClick={onClick} style={{ cursor: 'pointer' }}>
            {cover && <img src={cover} alt={title} className="card-cover" />}
            <div className="card-content">
                <h3 className="block text-lg font-bold text-center card-title">{title}</h3>
                <p className="hidden font-medium card-author sm:block sm:text-center">{author}</p>
            </div>
        </div>
    );
};

export default Card;