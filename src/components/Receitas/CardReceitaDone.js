import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShareIcon from '../../images/shareIcon.svg';
import Style from './CardReceitaDone.module.css';

function CardReceitaDone({
  id, name, thumneal, index, date, nacionalidade,
  pagina, tagsCard, category, alcholic }) {
  name.toLowerCase();
  const NUM_RESULT = 2;
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
        <div className={ Style.boxCard_info }>
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
              className={ Style.nacionality }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nacionalidade} - ${category} ${alcholic}`}
            </p>
            <p
              className={ Style.NameCard }
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{`Done in: ${date}` }</p>
            <div className={ Style.boxtags }>
              {tagsCard.filter((tag, index3) => index3 < NUM_RESULT)
                .map((tag, index2) => (
                  <div key={ index2 } className={ Style.tagsCard }>
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }

                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Link>
      <div>
        <button
          type="button"
          onClick={ handleShare }
          className={ Style.share }
        >
          <img
            src={ ShareIcon }
            alt="Share"
            data-testid={ `${index}-horizontal-share-btn` }
          />
          {CopyShare}
        </button>
      </div>
    </div>
  );
}

CardReceitaDone.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumneal: PropTypes.string.isRequired,
  nacionalidade: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcholic: PropTypes.string.isRequired,
  tagsCard: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardReceitaDone;
