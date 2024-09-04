import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import ListaTarefas from './ListaTarefas';
import EditarTarefa from './EditarTarefa';

function GerenciamentoTarefas({ userId }) {
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetchTarefas();
  }, [userId, showCompleted]);

  const fetchTarefas = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/api/tarefas?usuario_id=${userId}&showCompleted=${showCompleted}`);
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleSubmitTarefa = (values) => {
    Axios.post('http://localhost:3001/api/tarefas', { usuario_id: userId, titulo: values.titulo, descricao: values.descricao })
      .then(response => {
        alert(response.data.msg);
        fetchTarefas(); // Atualiza a lista de tarefas após adicionar
      })
      .catch(error => {
        console.error('Erro ao adicionar tarefa:', error);
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/tarefas/${id}`)
      .then(response => {
        alert(response.data.msg);
        fetchTarefas(); // Atualiza a lista de tarefas após excluir
      })
      .catch(error => {
        console.error('Erro ao excluir tarefa:', error);
      });
  };

  const handleSaveEdit = () => {
    setTarefaParaEditar(null);
    fetchTarefas(); // Atualiza a lista de tarefas após salvar edição
  };

  const handleUpdateTarefas = () => {
    fetchTarefas(); // Atualiza a lista de tarefas quando uma tarefa é concluída
  };

  return (
    <div className="gerenciamento-tarefas">
      <h2>Gerenciamento de Tarefas</h2>
      <Formik
        initialValues={{ titulo: '', descricao: '' }}
        onSubmit={handleSubmitTarefa}
        validationSchema={yup.object().shape({
          titulo: yup.string().required("*Obrigatório"),
          descricao: yup.string(),
        })}
      >
        <Form className="form-tarefa">
          <div className='form-group-tarefa'>
            <Field name="titulo" className="form-field-tarefa" placeholder="Título" />
            <ErrorMessage component="span" name="titulo" className="form-error-tarefa" />
          </div>
          <div className='form-group-tarefa'>
            <Field name="descricao" className="form-field-tarefa" placeholder="Descrição" />
            <ErrorMessage component="span" name="descricao" className="form-error-tarefa" />
          </div>
          <button className='botao-tarefa' type='submit'>Adicionar Tarefa</button>
          <button className='botao-tarefa' type='button' onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Mostrar Tarefas Pendentes" : "Mostrar Tarefas Concluídas"}
          </button>
        </Form>
      </Formik>

      <ListaTarefas 
        userId={userId} 
        tarefas={tarefas} 
        onEdit={setTarefaParaEditar} 
        onDelete={handleDelete} 
        showCompleted={showCompleted} 
        onUpdate={handleUpdateTarefas} // Passa a função de atualização
      />

      {tarefaParaEditar && (
        <EditarTarefa tarefa={tarefaParaEditar} onSave={handleSaveEdit} onCancel={() => setTarefaParaEditar(null)} />
      )}
    </div>
  );
}

export default GerenciamentoTarefas;
