import React from 'react';

interface CardProps {
    title: string;
    author: string;
    cover?: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, author, cover, onClick }) => {
    return (
        <div className="card flex border-2 rounded-lg" onClick={onClick} style={{ cursor: 'pointer' }}>
            {cover && <img src={cover} alt={title} className="card-cover" />}
            <div className="card-content flex-auto">
                <h3 className="card-title block text-center font-bold text-lg">{title}</h3>
                <p className="card-author font-medium hidden sm:block sm:text-center">{author}</p>
            </div>
        </div>
    );
};

export default Card;