import cn from 'classnames';

export const UsersList = ({
  usersFromServer,
  selectedUserId,
  setSelectedUserId,
}) => {
  const handleSelectUserId = user => {
    setSelectedUserId(user.id === selectedUserId ? null : user.id);
  };

  return (
    <>
      <a
        data-cy="FilterAllUsers"
        href="#/"
        className={cn({ 'is-active': selectedUserId === null })}
        onClick={() => setSelectedUserId(null)}
      >
        All
      </a>

      {usersFromServer.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          className={cn({ 'is-active': selectedUserId === user.id })}
          onClick={() => handleSelectUserId(user)}
        >
          {user.name}
        </a>
      ))}
    </>
  );
};
