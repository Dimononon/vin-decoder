import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import type { VinDecodeResult } from '../../services/api';
import { useVinHistory } from '../../hooks/useVinHistory';
import './HomePage.css';

function HomePage() {
  const [vin, setVin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<VinDecodeResult[]>([]);
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  
  const { history, addHistory } = useVinHistory();

  const validateVin = (v: string): string | null => {
    if (!v) return 'VIN cannot be empty';
    if (v.length > 17) return 'VIN cannot be longer than 17 characters';
    if (/[^a-zA-Z0-9]/.test(v)) return 'VIN can only contain alphanumeric characters';
    if (/[IOQioq]/.test(v)) return 'VIN cannot contain letters I, O, or Q';
    return null;
  };

  const decodeVin = async (vinToDecode: string) => {
    const validationError = validateVin(vinToDecode);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await api.decodeVin(vinToDecode);
      setApiMessage(response.Message);
      
      const validResults = response.Results.filter(r => r.Value !== null && r.Value !== '');
      setResults(validResults);
      
      if (validResults.length > 0) {
        addHistory(vinToDecode.toUpperCase());
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during decoding');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    decodeVin(vin);
  };

  return (
    <div>
      <h1>VIN Decoder</h1>
      
      <div className="home-page">
        <div className="home-page__col-left">
          <form onSubmit={handleSubmit} className="home-page__form">
            <div className="home-page__form-row">
              <input 
                id="vin-input"
                type="text" 
                value={vin} 
                onChange={(e) => setVin(e.target.value.toUpperCase())} 
                placeholder="17-character VIN"
                maxLength={17}
              />
              <button type="submit" disabled={loading} className="home-page__submit-btn">
                {loading ? 'Decoding...' : 'Decode'}
              </button>
            </div>
            {error && <div className="home-page__error">{error}</div>}
          </form>

          {history.length > 0 && (
            <div className="home-page__history">
              <h3>Recent Searches</h3>
              <ul>
                {history.map((h, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => { setVin(h); decodeVin(h); }}>{h}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="home-page__col-right">
          {apiMessage && (
            <div className="home-page__api-message">
              {"API Message: " + apiMessage}
            </div>
          )}

          {results.length > 0 && (
            <div>
              <h3>Results</h3>
              <table className="home-page__table">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <Link to={`/variables/${r.VariableId}`}>
                          {r.Variable}
                        </Link>
                      </td>
                      <td>{r.Value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

