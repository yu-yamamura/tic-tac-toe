import { SortOrder } from '../types/SortOrder';
import styles from './ToggleSortOrderButton.module.css';

type Props = {
  sortOrder: SortOrder;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const ToggleSortOrderButton = ({ sortOrder, onClick }: Props) => (
  <>
    <label htmlFor="sort-order-icon">Sort:</label>
    <input
      className={styles.sortOrderIcon}
      type="image"
      id="sort-order-icon"
      alt="sort order"
      src={sortOrder === 'ascending' ? '/ascending.svg' : '/descending.svg'}
      onClick={onClick}
    />
  </>
);

export default ToggleSortOrderButton;
