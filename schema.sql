-- Proyecto de GraphQL

CREATE SCHEMA user_events;

CREATE TABLE user_events.ASISTENTES (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(50) NOT NULL,
    correo NVARCHAR(50) NULL,
    edad INT NOT NULL 
)

CREATE TABLE user_events.EVENTOS (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(50) NOT NULL,
    direccion NVARCHAR(100) NOT NULL,
    fecha DATE NOT NULL 
)

CREATE TABLE user_events.VALORACIONES (
    id INT IDENTITY(1,1) PRIMARY KEY,
    descripcion NVARCHAR(100) NOT NULL,
)

CREATE TABLE user_events.REGISTRO_ASISTENTES (
    id INT IDENTITY(1,1) PRIMARY KEY,
    asistente_id INT NOT NULL,
    evento_id INT NOT NULL,
    valoracion_id INT NULL,
    FOREIGN KEY (asistente_id) REFERENCES user_events.ASISTENTES (id),
    FOREIGN KEY (evento_id) REFERENCES user_events.EVENTOS (id),
    FOREIGN KEY (valoracion_id) REFERENCES user_events.VALORACIONES (id),
)

INSERT INTO user_events.ASISTENTES VALUES ('Carlos Mejia', 'cmejia@email.com', 45);
INSERT INTO user_events.ASISTENTES VALUES ('Karim Benzema', 'kbenzema@email.com', 22);
INSERT INTO user_events.ASISTENTES VALUES ('Gustavo Almada', 'galmada@email.com', 31);
INSERT INTO user_events.ASISTENTES VALUES ('Aitana Bonmati', 'abonmati@email.com', 19);
INSERT INTO user_events.ASISTENTES VALUES ('Eugenia Zambrano', 'ezambrano@email.com', 28);

INSERT INTO user_events.EVENTOS VALUES ('Fiesta de cumpleaños', 'Col. Palmira, I Calle frente a la Ferreteria El Buen Constructor', '2024-12-15');
INSERT INTO user_events.EVENTOS VALUES ('Cena de graduacion', 'Col. Kennedy, Centro Comunal entre Segunda y Tercera Entrada', '2024-12-23');

INSERT INTO user_events.VALORACIONES VALUES ('Pesimo evento');
INSERT INTO user_events.VALORACIONES VALUES ('Evento normal');
INSERT INTO user_events.VALORACIONES VALUES ('Excelente evento');

INSERT INTO user_events.REGISTRO_ASISTENTES VALUES (1, 1, 2);
INSERT INTO user_events.REGISTRO_ASISTENTES VALUES (3, 1, 1);
INSERT INTO user_events.REGISTRO_ASISTENTES VALUES (5, 1, 1);
INSERT INTO user_events.REGISTRO_ASISTENTES VALUES (2, 2, 3);
INSERT INTO user_events.REGISTRO_ASISTENTES VALUES (4, 2, 3);

select * from user_events.EVENTOS where 1=1;

select
        RA.valoracion_id
        , RA.asistente_id
        , A.nombre
        , A.correo
        , A.edad
    from user_events.REGISTRO_ASISTENTES  RA 
    inner join user_events.ASISTENTES A 
    on RA.asistente_id = A.id
    where evento_id = 2;

select * from user_events.ASISTENTES where 1=1;

select 
        RA.valoracion_id
        , RA.evento_id
        , E.titulo
        , E.direccion
        , E.fecha
    from user_events.REGISTRO_ASISTENTES RA 
    inner join user_events.EVENTOS E 
    on RA.evento_id = E.id
    where asistente_id = 4;

select * from user_events.VALORACIONES;

select * from user_events.VALORACIONES where id=2;

select 
        E.id
        , E.titulo
        , E.direccion
        , E.fecha
        , COUNT( RA.asistente_id ) conteo
    from user_events.REGISTRO_ASISTENTES RA
    INNER join user_events.EVENTOS E 
    on RA.evento_id = E.id
    GROUP BY E.id
        , E.titulo
        , E.direccion
        , E.fecha;