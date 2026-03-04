-- =========================================
-- TRADERS
-- =========================================

INSERT INTO traders (name, username, email, password_hash)
VALUES
('Dan Plumbing', 'danplumb', 'dan@traders.com', '$2b$10$seedpassword'),
('Sarah Sparks', 'sarahsparks', 'sarah@traders.com', '$2b$10$seedpassword'),
('Mike Heating', 'mikeheat', 'mike@traders.com', '$2b$10$seedpassword'),
('Laura Electric', 'lauraelec', 'laura@traders.com', '$2b$10$seedpassword'),
('James Builder', 'jamesbuild', 'james@traders.com', '$2b$10$seedpassword'),
('Chris Gas', 'chrisgas', 'chris@traders.com', '$2b$10$seedpassword'),
('Emma Decor', 'emmadecor', 'emma@traders.com', '$2b$10$seedpassword'),
('Tom Roofing', 'tomroof', 'tom@traders.com', '$2b$10$seedpassword'),
('Oliver Flooring', 'olifloor', 'oliver@traders.com', '$2b$10$seedpassword'),
('Jack Handyman', 'jackfix', 'jack@traders.com', '$2b$10$seedpassword');


-- =========================================
-- TRADER PROFILES
-- =========================================

INSERT INTO trader_profiles (trader_id, trade_type, region, availability, bio)
VALUES
(1, 'Plumber', 'London', 'Mon-Fri 8am-6pm', 'Experienced plumber specialising in kitchens and bathrooms.'),
(2, 'Electrician', 'Manchester', 'Mon-Sat 9am-6pm', 'Certified electrician with 10 years experience.'),
(3, 'Plumber', 'London', 'Mon-Fri 8am-5pm', 'Boiler repairs and heating system installations.'),
(4, 'Electrician', 'Birmingham', 'Weekdays', 'Domestic electrical repairs and installations.'),
(5, 'Builder', 'Leeds', 'Mon-Sat', 'Home renovations and structural work.'),
(6, 'Roofer', 'Liverpool', 'Mon-Fri', 'Gas safety checks and boiler servicing.'),
(7, 'Decorator', 'London', 'Flexible', 'Interior painting and decorating specialist.'),
(8, 'Roofer', 'Manchester', 'Mon-Fri', 'Roof repairs and installations.'),
(9, 'Handyman', 'Bristol', 'Mon-Fri', 'Wood flooring and laminate installations.'),
(10, 'Handyman', 'London', 'Flexible', 'General household repairs and odd jobs.');


-- =========================================
-- SERVICES
-- =========================================

INSERT INTO services (trader_id, title, description, pricing_type, base_price)
VALUES
(1, 'Sink Repair', 'Fix leaking or broken sinks.', 'fixed', 80),
(1, 'Toilet Installation', 'Install new toilet units.', 'fixed', 120),

(2, 'Light Installation', 'Install ceiling or wall lighting.', 'fixed', 60),
(2, 'Fuse Box Upgrade', 'Upgrade electrical fuse boxes.', 'fixed', 250),

(3, 'Boiler Repair', 'Diagnose and repair boiler faults.', 'fixed', 150),
(3, 'Radiator Installation', 'Install new radiators.', 'fixed', 200),

(4, 'Socket Replacement', 'Replace damaged wall sockets.', 'fixed', 50),
(4, 'Electrical Inspection', 'Full home electrical inspection.', 'fixed', 180),

(5, 'Wall Construction', 'Build interior partition walls.', 'fixed', 500),
(5, 'Kitchen Renovation', 'Complete kitchen renovation.', 'fixed', 3500),

(6, 'Gas Safety Check', 'Annual landlord gas safety check.', 'fixed', 90),
(6, 'Boiler Service', 'Full boiler maintenance service.', 'fixed', 110),

(7, 'Room Painting', 'Paint single rooms.', 'fixed', 200),
(7, 'Wallpaper Installation', 'Install decorative wallpaper.', 'fixed', 180),

(8, 'Roof Leak Repair', 'Fix leaking roofs.', 'fixed', 300),
(8, 'Roof Tile Replacement', 'Replace broken tiles.', 'fixed', 220),

(9, 'Laminate Flooring', 'Install laminate flooring.', 'fixed', 600),
(9, 'Hardwood Flooring', 'Install hardwood floors.', 'fixed', 1200),

(10, 'Furniture Assembly', 'Assemble flat-pack furniture.', 'hourly', 40),
(10, 'General Repairs', 'Various small home repairs.', 'hourly', 35);


-- =========================================
-- BOOKINGS
-- =========================================

INSERT INTO bookings
(service_id, trader_id, client_name, client_email, requested_date, requested_time, job_description, status)
VALUES
(1,1,'Natasha','natasha@email.com','2026-03-10','13:00:00','Kitchen sink leaking badly','pending'),
(2,1,'David','david@email.com','2026-03-11','09:30:00','Need new toilet installed','confirmed'),

(3,2,'Mark','mark@email.com','2026-03-12','14:00:00','Install new pendant light','pending'),
(4,2,'Jenny','jenny@email.com','2026-03-15','11:00:00','Fuse box needs upgrading','pending'),

(5,3,'Oliver','oliver@email.com','2026-03-16','10:00:00','Boiler stopped working','confirmed'),
(6,3,'Hannah','hannah@email.com','2026-03-18','12:00:00','Add radiator to bedroom','pending'),

(7,4,'Luke','luke@email.com','2026-03-20','15:30:00','Replace broken wall socket','pending'),
(8,4,'Emily','emily@email.com','2026-03-21','13:00:00','Electrical inspection before sale','confirmed'),

(9,5,'Tom','tom@email.com','2026-03-22','09:00:00','Build small partition wall','pending'),
(10,5,'Laura','laura@email.com','2026-03-23','08:30:00','Kitchen renovation consultation','pending'),

(11,6,'James','james@email.com','2026-03-24','10:30:00','Gas safety certificate needed','confirmed'),
(12,6,'Sophia','sophia@email.com','2026-03-25','14:00:00','Annual boiler service','pending'),

(13,7,'Michael','michael@email.com','2026-03-26','11:00:00','Paint living room','pending'),
(14,7,'Rachel','rachel@email.com','2026-03-27','16:00:00','Wallpaper hallway','confirmed'),

(15,8,'Daniel','daniel@email.com','2026-03-28','12:00:00','Roof leak after storm','pending'),
(16,8,'Chloe','chloe@email.com','2026-03-29','13:30:00','Replace broken roof tiles','pending'),

(17,9,'Alex','alex@email.com','2026-03-30','09:30:00','Install laminate flooring','confirmed'),
(18,9,'Isabella','isabella@email.com','2026-04-01','10:30:00','Hardwood flooring quote','pending'),

(19,10,'Ben','ben@email.com','2026-04-02','11:00:00','Assemble IKEA wardrobe','pending'),
(20,10,'Grace','grace@email.com','2026-04-03','15:00:00','Fix door hinge','confirmed');
