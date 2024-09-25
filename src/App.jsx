import React, { useState } from 'react';
import './App.scss';

import { UsersList } from './components/UserList';
import { CategoryList } from './components/CategoryList';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchChange = event => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const resetFilters = () => {
    setSelectedUserId(null);
    setSelectedCategoryIds([]);
    clearSearch();
  };

  const filteredProducts = productsFromServer.filter(product => {
    if (selectedUserId) {
      const foundCategory = categoriesFromServer.find(
        cat => cat.id === product.categoryId,
      );

      if (!foundCategory || foundCategory.ownerId !== selectedUserId) {
        return false;
      }
    }

    if (
      selectedCategoryIds.length > 0 &&
      !selectedCategoryIds.includes(product.categoryId)
    ) {
      return false;
    }

    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <UsersList
                usersFromServer={usersFromServer}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={searchChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchTerm && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={clearSearch}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <CategoryList
                categoriesFromServer={categoriesFromServer}
                selectedCategoryIds={selectedCategoryIds}
                setSelectedCategoryIds={setSelectedCategoryIds}
              />
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!filteredProducts.length ? (
            <p data-cy="NoMatchingMessage">No results</p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(product => {
                  const foundCategory = categoriesFromServer.find(
                    cat => cat.id === product.categoryId,
                  );
                  const foundUser = usersFromServer.find(
                    user => user.id === foundCategory.ownerId,
                  );
                  const userClass =
                    foundUser.sex === 'm' ? 'has-text-link' : 'has-text-danger';

                  return (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">
                        {foundCategory.icon} - {foundCategory.title}
                      </td>

                      <td data-cy="ProductUser" className={userClass}>
                        {foundUser.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
