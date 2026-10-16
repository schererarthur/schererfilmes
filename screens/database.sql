-- Cria o banco de dados para o catálogo de filmes
CREATE DATABASE IF NOT EXISTS catalogo_filmes;
USE catalogo_filmes;

-- Cria a tabela de filmes com os campos solicitados na atividade
CREATE TABLE IF NOT EXISTS filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    sinopse TEXT NOT NULL,
    ano_lancamento INT NOT NULL
);

-- Inserção de exemplo para teste
INSERT INTO filmes (nome, genero, sinopse, ano_lancamento) 
VALUES ('Interestelar', 'Ficção Científica', 'Um grupo de astronautas viaja através de um buraco de minhoca.', 2014);

select * from filmes