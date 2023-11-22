import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreperedGoods(goods, { sortField, reverse }) {
  const preperedGoods = goods.map(good => (
    {
      name: good,
      length: good.length,
    }
  ));

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1[sortField].localeCompare(good2[sortField]);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const localeGoods = getPreperedGoods(
    goodsFromServer, { sortField, reverse },
  );

  const handleClickReset = () => {
    setSortField('');
    setReverse(false);
  };

  const isTrue = sortField || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={
            cn('button', 'is-info', {
              'is-light': sortField !== SORT_FIELD_NAME,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={
            cn('button', 'is-info', {
              'is-light': sortField !== SORT_FIELD_LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {isTrue
          && (
            <button
              onClick={handleClickReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {localeGoods.map(good => (
          <li key={uuidv4()} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};