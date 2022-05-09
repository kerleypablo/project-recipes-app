import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CardReceita.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShareIcon from '../../images/shareIcon.svg';
import './CardReceitaDone.css';
import BtnFavorite from '../BtnFavorite/BtnFavorite';

function CardFavotiteRecipies({
  id, name, thumneal, index, nacionalidade,
  pagina, category, alcholic, type, receita }) {
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
  console.log(receita);
  return (
    <div className="boxCard-Done" key={ id } data-testid={ `${index}-recipe-card` }>
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
      <div>
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
              <BtnFavorite
                drink={ receita }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            )
            : (
              <BtnFavorite
                food={ receita }
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
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
  receita: PropTypes.shape.isRequired,
};

export default CardFavotiteRecipies;
