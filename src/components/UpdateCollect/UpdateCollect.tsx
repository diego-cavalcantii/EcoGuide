import { useState, useEffect } from 'react';

const UpdateCollectForm = ({ idColeta, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    complemento: '',
    telefone: '',
    imagemUrl: ''
  });

  useEffect(() => {
    // Atualize o estado do formulário com os dados existentes do ponto de coleta
    fetchCollectionPoint();
  }, []);

  const fetchCollectionPoint = async () => {
    try {
      const response = await fetch(`http://localhost:9090/ponto_coleta/${idColeta}`);
      if (!response.ok) {
        throw new Error('Failed to fetch collection point.');
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching collection point:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'cep' && value.length === 8) {
      fetchAddressFromCEP(value);
    }
  };

  const fetchAddressFromCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Failed to fetch address from CEP.');
      }
      const data = await response.json();
      setFormData(prevData => ({
        ...prevData,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      }));
    } catch (error) {
      console.error('Error fetching address from CEP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/ponto_coleta/${idColeta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update collection point.');
      }

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating collection point:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      {/* Outros campos... */}
      <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
      <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
      <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
      <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
      <input type="text" name="uf" value={formData.uf} onChange={handleChange} />
      <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
      <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
      <input type="text" name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} />

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateCollectForm;
