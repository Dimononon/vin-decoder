import { useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VariablesContext } from '../../contexts/VariablesContext';
import type { VariableDef } from '../../services/api';
import './VariableDetailsPage.css';

function VariableDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { variables, loading: contextLoading, error: contextError } = useContext(VariablesContext);
  
  const variable = useMemo<VariableDef | null>(() => {
    if (!id || !variables.length) return null;
    const targetId = parseInt(id, 10);
    return variables.find(v => v.ID === targetId) || null;
  }, [id, variables]);

  const error = contextError || (!contextLoading && !variable ? 'Variable not found' : null);

  if (contextLoading) return <div>Loading variable details...</div>;
  if (error) return <div className="variable-details__error">{error}</div>;
  if (!variable) return <div>No variable data available.</div>;

  return (
    <div className="variable-details">
      <div className="variable-details__back">
        <Link to="/variables">Back</Link>
      </div>

      <h1>{variable.Name}</h1>
      
      <div className="variable-details__content">
        <p><strong>ID:</strong> {variable.ID}</p>
        <p><strong>Data Type:</strong> {variable.DataType || 'N/A'}</p>
        <div className="variable-details__desc-container">
          <strong>Description:</strong>
          <div 
            className="variable-details__desc-box"
            dangerouslySetInnerHTML={{ __html: variable.Description || 'No description available.' }} 
          />
        </div>
      </div>
    </div>
  );
}

export default VariableDetailsPage;