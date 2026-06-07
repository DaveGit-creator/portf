-- Seed data for portfolio app

INSERT INTO users (email, password_hash) VALUES ('demo@example.com', 'password');

INSERT INTO messages (name, email, phone, subject, message, category) VALUES
('Test User', 'test@example.com', '+1234567890', 'Hello', 'This is a test message.', 'Other');
