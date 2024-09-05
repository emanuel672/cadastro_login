import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ListaTarefas({ userId, tarefas, onEdit, onDelete, showCompleted, onUpdate }) {
  const [tarefasLocal, setTarefasLocal] = useState(tarefas);

  useEffect(() => {
    setTarefasLocal(tarefas);
  }, [tarefas]);

  const handleConcluir = (id) => {
    const data_conclusao = new Date().toISOString().split('T')[0]; // Data atual
    Axios.patch(`http://localhost:3001/api/tarefas/${id}/concluir`, { data_conclusao })
      .then(response => {
        alert(response.data.msg);
        if (onUpdate) onUpdate(); // Notifica que a lista de tarefas precisa ser atualizada
      })
      .catch(error => {
        console.error('Erro ao concluir tarefa:', error);
      });
  };

  return (
    <div className="lista-tarefas">
      <h2>{showCompleted ? "Tarefas Concluídas" : "Minhas Tarefas"}</h2>
      <ul>
        {tarefasLocal.map(tarefa => (
          <li key={tarefa.id}>
            <h3>{tarefa.titulo}</h3>
            <p>{tarefa.descricao}</p>
            {tarefa.data_conclusao && <p>Concluída em: {new Date(tarefa.data_conclusao).toLocaleDateString()}</p>}
            {!tarefa.concluida && (
              <>
                <button className="botao-tarefa" onClick={() => handleConcluir(tarefa.id)}>Concluir</button>
                <button className="botao-tarefa" onClick={() => onEdit(tarefa)}>Editar</button>
                <button className="botao-tarefa" onClick={() => onDelete(tarefa.id)}>Excluir</button>
              </>
            )}
            {tarefa.concluida && (
              <>
                <button className="botao-tarefa" onClick={() => onEdit(tarefa)}>Editar</button>
                <button className="botao-tarefa" onClick={() => onDelete(tarefa.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefas;
