import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShareIcon from '../../images/shareIcon.svg';
import './CardReceitaDone.css';
import BtnFavorite from '../BtnFavorite/BtnFavorite';
import Style from './CardReceitaDone.module.css';

function CardFavotiteRecipies({
  id, name, thumneal, index, nacionalidade,
  pagina, category, alcholic, type, receita, func }) {
  name.toLowerCase();
  const [CopyShare, seCopyshare] = useState('');

  useEffect(() => {

  }, [CopyShare]);

  function handleShare() {
    const page = `http://localhost:3000/${pagina.toLowerCase()}/${id}`;
    navigator.clipboard.writeText(page).then(
      seCopyshare('Link copied!'),
    ).catch((error) => console.log(error));
  }
  return (
    <div
      className={ Style.boxCard_Done }
      key={ id }
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `/${pagina.toLowerCase()}/${id}` }>
        <div className="boxCard-info">
          <div>
            <img
              className="imgThumb"
              src={ thumneal }
              alt={ name }
              data-testid={ `${index}-horizontal-image` }
            />
          </div>
          <div>
            <p
              className="nacionality"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nacionalidade} - ${category} ${alcholic}`}
            </p>
            <p
              className="NameCard"
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </p>
          </div>
        </div>
      </Link>
      <div className="sharefav">
        <button
          type="button"
          onClick={ handleShare }
          className="share"
        >
          <img
            src={ ShareIcon }
            alt="Share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          {CopyShare}
        </button>
        {
          type === 'drink'
            ? (
              <div className="favbtn-donerecipes">
                <BtnFavorite
                  drinkId={ id }
                  drink={ receita }
                  func={ func }
                  datatest={ `${index}-horizontal-favorite-btn` }
                />
              </div>
            )
            : (
              <div className="favbtn-donerecipes">
                <BtnFavorite
                  foodId={ id }
                  food={ receita }
                  func={ func }
                  datatest={ `${index}-horizontal-favorite-btn` }
                />
              </div>
            )
        }
      </div>
    </div>
  );
}

CardFavotiteRecipies.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumneal: PropTypes.string.isRequired,
  nacionalidade: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcholic: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  receita: PropTypes.shape({
    receita: PropTypes.string,
  }).isRequired,
  func: PropTypes.func.isRequired,
};

export default CardFavotiteRecipies;
