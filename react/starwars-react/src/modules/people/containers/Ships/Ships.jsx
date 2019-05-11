import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { swAPI } from '../../../swapi';
import { Button } from '../../../common-ui';
import { addFavoriteShip, removeFavoriteShip } from '../../../user/actions';
import Styles from './styles.scss';

export const ShipsComponent = ({ onFav, onUnFav, favoriteShips }) => {
  const [ships, setShips] = useState([]);

  const getShips = () => {
    swAPI.getStarshipList().then(res => {
      setShips(res.results);
    });
  };

  useEffect(() => {
    getShips();
  }, []);

  return (
    <div className={Styles.ships}>
      <div className={Styles.list}>
        <h2>Favorite ships</h2>
        {favoriteShips &&
          favoriteShips.map(ship => (
            <div key={ship.url} className={Styles.listItem}>
              <span>{ship.name}</span>
              <Button onClick={() => onUnFav(ship)}>-★</Button>
            </div>
          ))}
      </div>
      <div className={Styles.list}>
        <h2>Ships</h2>
        {ships
          .filter(s => !favoriteShips.includes(s))
          .map(ship => (
            <div key={ship.url} className={Styles.listItem}>
              <span>{ship.name}</span>
              <Button onClick={() => onFav(ship)}>+★</Button>
            </div>
          ))}
      </div>
    </div>
  );
};

ShipsComponent.propTypes = {
  onFav: PropTypes.func.isRequired,
  onUnFav: PropTypes.func,
  favoriteShips: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

ShipsComponent.defaultProps = {
  favoriteShips: [],
  onUnFav: undefined,
};

const dispatchToProps = dispatch => ({
  onFav: ship => dispatch(addFavoriteShip(ship)),
  onUnFav: ship => dispatch(removeFavoriteShip(ship)),
});

const stateToProps = state => ({
  favoriteShips: state.user.favoriteShips,
});

export const Ships = connect(
  stateToProps,
  dispatchToProps
)(ShipsComponent);