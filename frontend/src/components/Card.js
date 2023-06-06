import {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({card, onCardLike, onCardDelete, onCardClick}) {
    const currentUser = useContext(CurrentUserContext);
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const likeButtonClassName = `cards__item-like pointer ${isLiked ? 'cards__item-like_active' : ''}`;
    const isOwner = card.owner._id === currentUser._id;
    const deleteButtonClassName = `cards__delete pointer ${isOwner ? 'cards__delete_active' : ''}`;

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="cards__item">
            <button
                type="button"
                className={deleteButtonClassName}
                onClick={handleDeleteClick}/>
            <img
                className="cards__item-image"
                alt={card.name}
                src={card.link}
                onClick={handleCardClick}
            />
            <div className="cards__item-description">
                <h2 className="cards__item-title">{card.name}</h2>
                <div className="cards__item-likes">
                    <button
                        type="button"
                        className={likeButtonClassName}
                        onClick={handleLikeClick}/>
                    <p className="cards__item-number-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
