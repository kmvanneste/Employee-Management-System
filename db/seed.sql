USE employees;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("HR"),
    ("IT");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Person", 50000, 1),
    ("Mechanical Engineer", 120000, 2),
    ("Software Engineer", 100000, 2),
    ("Junior Engineer", 85000, 2),
    ("HR Drone" 80000, 3),
    ("IT Hero", 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Erin", "Platvoet", 1, 1),
    ("Manoli", "Kouzemath", 2, 2),
    ("Hojin", "M", 2, NULL),
    ("Thomas", "Challamet", 2, NULL),
    ("Kyle", "Andie", 3, 3),
    ("Ed", "Gibbons", 4, 4);