DROP TABLE IF EXISTS Molip_Challenges
CREATE TABLE Molip_Challenges (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    private BOOLEAN DEFAULT FALSE,
    password VARCHAR(255),
    creator_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status VARCHAR(15) DEFAULT 'activate'
);