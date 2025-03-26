function Profile() {
    // Пример данных, позже можешь подключить к бэкенду
    const user = { username: 'Пользователь', email: 'user@example.com' };
  
    return (
      <div>
        <h2>Профиль</h2>
        <div className="card">
          <h3>{user.username}</h3>
          <p style={{ color: '#8E8E93' }}>{user.email}</p>
        </div>
      </div>
    );
  }
  
  export default Profile;