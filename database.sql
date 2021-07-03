--add database name: weekend-to-do-app

-- query to make table
CREATE TABLE toDoList (
    "id" serial PRIMARY KEY,
    "task" varchar(80) NOT NULL,
    "notes" varchar(250), 
    "completed" boolean
);

-- query to populate table
INSERT INTO toDoList ("task", "notes", "completed")
VALUES ('Laundry', 'kids clothes', 'FALSE'),
('Fix kayak', 'cracked hull', 'FALSE'),
('Grocery store', 'week food supply', 'FALSE'),
('Wash the car', 'Wife''s car dirty', 'FALSE'),
('Walk the dog', 'half mile walk', 'TRUE');  

