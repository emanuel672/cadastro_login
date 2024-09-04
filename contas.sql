-- Cria o banco de dados
CREATE DATABASE contas;
-- Seleciona o banco de dados
USE contas;
-- Cria a tabela
CREATE TABLE usuarios( id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(45) NOT NULL, senha VARCHAR(200) NOT NULL
);
CREATE TABLE tarefas ( id INT PRIMARY KEY AUTO_INCREMENT, usuario_id INT NOT NULL, titulo VARCHAR(255) NOT NULL, 
	descricao TEXT, concluida BOOLEAN DEFAULT FALSE, FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- Insere dados na tabela
INSERT INTO usuarios (email, senha) VALUES ('emanuel@gmail.com', '123456789');
-- Consulta os dados na tabela
SELECT * FROM usuarios;
DESCRIBE usuarios;
ALTER TABLE tarefas
ADD COLUMN data_conclusao DATE;