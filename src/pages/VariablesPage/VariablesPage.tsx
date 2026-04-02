import { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { VariablesContext } from '../../contexts/VariablesContext';
import './VariablesPage.css';

function VariablesPage() {
  const { variables, loading, error } = useContext(VariablesContext);
  const [search, setSearch] = useState('');

  const filteredVariables = useMemo(() => {
    if (!search.trim()) return variables;
    const lowerSearch = search.toLowerCase();
    return variables.filter(v => 
      v.Name?.toLowerCase().includes(lowerSearch)
    );
  }, [variables, search]);

  if (loading) return <div>Loading variables...</div>;
  if (error) return <div className="variables-page__error">{error}</div>;

  return (
    <div className="variables-page">
      <h1>Vehicle Variables</h1>
      
      <div className="variables-page__search">
        <input 
          type="text" 
          placeholder="Search variables by name..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <ul className="variables-page__list">
        {filteredVariables.map((v) => (
          <li key={v.ID} className="variables-page__item">
            <Link to={`/variables/${v.ID}`}>
              <strong>{v.Name}</strong>
            </Link>
          </li>
        ))}
        {filteredVariables.length === 0 && (
          <div>No variables found matching "{search}".</div>
        )}
      </ul>
    </div>
  );
}

export default VariablesPage;