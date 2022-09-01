import { SortOrder } from '../types/SortOrder';
import styles from './SortOrderToggle.module.css';

type Props = {
  sortOrder: SortOrder;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const SortOrderToggle = ({ sortOrder, onClick }: Props) => (
  <>
    <label htmlFor="icon">Sort:</label>
    <input
      className={styles.icon}
      type="image"
      id="icon"
      alt="sort order"
      src={sortOrder === 'ascending' ? '/ascending.svg' : '/descending.svg'}
      onClick={onClick}
    />
  </>
);

export default SortOrderToggle;
