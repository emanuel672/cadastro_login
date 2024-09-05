import './App.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useState } from 'react';
import GerenciamentoTarefas from './GerenciamentoTarefas';

function App() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (endpoint, values, callback) => {
    Axios.post(`https://cadastro-login-sable.vercel.app/${endpoint}`, values)
      .then(response => {
        alert(response.data.msg);
        if (response.data.userId) {
          setUserId(response.data.userId);
          setIsAuthenticated(true);
        }
        if (callback) callback(response);
      })
      .catch(error => {
        console.error(`Erro ao ${endpoint}:`, error);
      });
  };

  const validadelogin = yup.object().shape({
    email: yup.string().email("Não é válido").required("*Obrigatório"),
    password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("*Obrigatório"),
  });

  const validadecadastro = yup.object().shape({
    email: yup.string().email("Não é válido").required("*Obrigatório"),
    password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("*Obrigatório"),
    confirmesenha: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
  });

  return (
    <div className="container">
      {!isAuthenticated ? (
        <>
          <h1>Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleSubmit('login', values)}
            validationSchema={validadelogin}
          >
            <Form className="login-form">
              <div className='login-form-group'>
                <Field name="email" className="form-field-login" placeholder="email" />
                <ErrorMessage component="span" name="email" className="form-error-login" />
              </div>
              <div className='login-form-group'>
                <Field name="password" className="form-field-login" placeholder="senha" />
                <ErrorMessage component="span" name="password" className="form-error-login" />
              </div>
              <button className='botao-login' type='submit'>Login</button>
            </Form>
          </Formik>

          <h1>Cadastro</h1>
          <Formik
            initialValues={{ email: '', password: '', confirmesenha: '' }}
            onSubmit={values => handleSubmit('cadastro', values)}
            validationSchema={validadecadastro}
          >
            <Form className="login-form">
              <div className='login-form-group'>
                <Field name="email" className="form-field-login" placeholder="email" />
                <ErrorMessage component="span" name="email" className="form-error-login" />
              </div>
              <div className='login-form-group'>
                <Field name="password" className="form-field-login" placeholder="senha" />
                <ErrorMessage component="span" name="password" className="form-error-login" />
              </div>
              <div className='login-form-group'>
                <Field name="confirmesenha" className="form-field-login" placeholder="confirme sua senha" />
                <ErrorMessage component="span" name="confirmesenha" className="form-error-login" />
              </div>
              <button className='botao-login' type='submit'>Cadastro</button>
            </Form>
          </Formik>
        </>
      ) : (
        <GerenciamentoTarefas userId={userId} />
      )}
    </div>
  );
}

export default App;