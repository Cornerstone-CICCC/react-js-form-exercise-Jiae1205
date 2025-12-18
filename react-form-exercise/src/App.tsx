import { useState, type ChangeEvent } from 'react';

type FormData = {
  firstname: string;
  lastname: string;
  age: string;
  favoriteFoods: string[];
};

const App = () => {
  // ✅ 수업 스타일: 하나의 객체로 form state 관리
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    age: '',
    favoriteFoods: [],
  });

  const [showUser, setShowUser] = useState<boolean>(false);

  // ✅ input / checkbox 공용 change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === 'favoriteFoods') {
      setFormData((current) => ({
        ...current,
        favoriteFoods: checked
          ? [...current.favoriteFoods, value]
          : current.favoriteFoods.filter((food) => food !== value),
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleDisplayUser = () => {
    setShowUser(true);
  };

  const handleClear = () => {
    setFormData({
      firstname: '',
      lastname: '',
      age: '',
      favoriteFoods: [],
    });
    setShowUser(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Form</h1>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label>
          First Name:
          <input
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>

        <label>
          Age:
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
        </label>

        <fieldset>
          <legend>Favorite Foods:</legend>

          {['Chicken', 'Beef', 'Vegetables', 'Dessert', 'Pork'].map((food) => (
            <label key={food}>
              <input
                type="checkbox"
                name="favoriteFoods"
                value={food}
                checked={formData.favoriteFoods.includes(food)}
                onChange={handleChange}
              />
              {food}
            </label>
          ))}
        </fieldset>
      </form>

      <button onClick={handleDisplayUser}>Display User</button>
      <button onClick={handleClear}>Clear</button>

      <div className="output" style={{ marginTop: '16px' }}>
        {showUser && (
          <p>
            Hello {formData.firstname} {formData.lastname}. You are{' '}
            {formData.age} years old and your favorite foods are:{' '}
            {formData.favoriteFoods.length > 0
              ? formData.favoriteFoods.join(', ')
              : 'None'}
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
