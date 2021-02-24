INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Lisa", "Black", 1, 2), 
		("Barry", "White", 2, 6), 
        ("Isabella", "Knowles", 3, 2), 
        ("Ryan", "Gold", 4, 6),
        ("Ephraim", "Tshabalala", 5, 6),
        ("Natasha", "Zule", 6, null),
        ("Sifiso", "Nkabinde", 7, 6);

INSERT INTO roles (title, salary, department_id)
VALUES ("Personal Assistant", 150000, 1), ("General Manager", 250000, 2), ("Accountant", 200000, 3), ("Full Stack Developer", 300000, 4), ("Sales Rep", 180000, 5), ("CEO", 1000000, 6), ("HR Manager", 450000, 7);

INSERT INTO department (id,name)
VALUES (1,"Administration"), (2,"Marketing / Sales"), (3,"IT"), (4, "Human Resources"), (5, "Management");