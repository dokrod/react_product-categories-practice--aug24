import cn from 'classnames';

export const CategoryList = ({
  categoriesFromServer,
  selectedCategoryIds,
  setSelectedCategoryIds,
}) => {
  const handleSelectCategoryId = categoryId => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter(id => id !== categoryId),
      );
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCategoryIds.length === categoriesFromServer.length) {
      setSelectedCategoryIds([]);
    } else {
      const allCategoryIds = categoriesFromServer.map(category => category.id);

      setSelectedCategoryIds(allCategoryIds);
    }
  };

  return (
    <>
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6 is-outlined', {
          'is-active':
            selectedCategoryIds.length === categoriesFromServer.length,
        })}
        onClick={handleSelectAll}
      >
        All
      </a>

      {categoriesFromServer.map(category => {
        const isSelected = selectedCategoryIds.includes(category.id);

        return (
          <a
            key={category.id}
            data-cy="Category"
            className={cn('button mr-2 my-1', {
              'is-info': isSelected,
            })}
            href="#/"
            onClick={() => handleSelectCategoryId(category.id)}
          >
            {category.title}
          </a>
        );
      })}
    </>
  );
};
