import { SortOrder } from '../types/SortOrder';

type Props = {
  sortOrder: SortOrder;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const ToggleSortOrderButton = ({ sortOrder, onClick }: Props) => (
  <>
    <label htmlFor="sort-order-icon">Sort:</label>
    <input
      className="sort-order-icon"
      type="image"
      id="sort-order-icon"
      alt="sort order"
      src={sortOrder === 'ascending' ? '/ascending.svg' : '/descending.svg'}
      onClick={onClick}
    />
  </>
);

export default ToggleSortOrderButton;
