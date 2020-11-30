import { useDatabase } from '../context/database';
import Select from '../components/system/Select';

const CategoriesSelector = ({
  category, setCategory
}) => {
  const database = useDatabase();

  const categories = Array.from(
    (new Set(Object.values(database).flatMap(book => book.volumeInfo.categories ?? []))).values()
  ).sort()

  return (
    <Select value={category} onChange={event => setCategory(event.target.value)}>
      <option value="">Select a category</option>
      {categories.map(category => (
        <option value={category} key={category}>{category}</option>
      ))}
    </Select>
  )
}

export default CategoriesSelector;