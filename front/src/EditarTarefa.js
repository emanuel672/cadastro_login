import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function EditarTarefa({ tarefa, onSave, onCancel }) {
  const [initialValues, setInitialValues] = useState({ titulo: '', descricao: '' });

  useEffect(() => {
    if (tarefa) {
      setInitialValues({ titulo: tarefa.titulo, descricao: tarefa.descricao });
    }
  }, [tarefa]);

  const validationSchema = yup.object().shape({
    titulo: yup.string().required("*Obrigatório"),
    descricao: yup.string(),
  });

  return (
    <div className="modal">
      <h2>Editar Tarefa</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Axios.put(`http://localhost:3001/api/tarefas/${tarefa.id}`, values)
            .then(response => {
              alert(response.data.msg);
              onSave(); // Atualiza a lista de tarefas após a edição
            })
            .catch(error => {
              console.error('Erro ao editar tarefa:', error);
            });
        }}
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
          <button className='botao-tarefa' type='submit'>Salvar</button>
          <button className='botao-tarefa' type='button' onClick={onCancel}>Cancelar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditarTarefa;
