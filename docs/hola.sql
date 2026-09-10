CREATE TABLE Usuarios (
    id_user INT AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(50),
    mail VARCHAR(100) UNIQUE,
    contra VARCHAR(255),
    foto VARCHAR(255),
    PRIMARY KEY(id_user)
);

CREATE TABLE Chats (
    id_chat INT AUTO_INCREMENT UNIQUE NOT NULL,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    foto VARCHAR(255),        
    es_grupo BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id_chat)
);

CREATE TABLE chat_participantes (
	id INT AUTO_INCREMENT UNIQUE NOT NULL,
    id_chat INT NOT NULL,
    id_user INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_chat) REFERENCES Chats(id_chat),
    FOREIGN KEY (id_user) REFERENCES Usuarios(id_user)
);

CREATE TABLE Mensajes (
    id_mensaje INT AUTO_INCREMENT UNIQUE NOT NULL,
    id_chat INT NOT NULL,
    id_user INT NOT NULL,
    contenido TEXT,
    fecha_hora DATETIME,
    PRIMARY KEY (id_mensaje),
    FOREIGN KEY (id_chat) REFERENCES Chats(id_chat),
    FOREIGN KEY (id_user) REFERENCES Usuarios(id_user)
);


INSERT INTO Usuarios (username, mail, contra, foto) VALUES
('Docente', 'Docente@pioix.edu.ar', '1234', NULL),
('Juani', 'Juani@pioix.edu.ar', '1234', NULL),
('Claudio', 'Claudio@pioix.edu.ar', '1234', NULL);

INSERT INTO Chats (nombre, descripcion, foto, es_grupo) VALUES
("si", NULL, "https://tse1.mm.bing.net/th/id/OIP.lkSInaf-1W_LyPuAJs9NiQHaFb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", FALSE), 
('Grupo TP', "este grupo es SERIO", "https://i.pinimg.com/originals/1a/7e/8a/1a7e8a39c8532194c2536d36904198ba.jpg", TRUE);

INSERT INTO Chat_participantes (id_chat, id_user) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(2, 3);

INSERT INTO mensajes (id_chat, id_user, contenido, fecha_hora) VALUES
(1, 1, 'GENIO!', '2026-09-01 10:00:00'),
(1, 2, 'Claro amigo, sos un crack', '2026-09-01 10:02:00'),
(2, 1, 'Alguien me socorre?', '2026-09-02 09:00:00'),
(2, 3, 'Voy!', '2026-09-02 09:01:00');
