export const shortTermQuestions = {
  environment: [
    {
      id: 1,
      question: "What will be the output of the following code snippet?",
      // Add the code here using template literals (backticks)
      codeSnippet: `x = 10 
y = 3
print(x // y)`,
      options: ["3.33", "3", "3.0", "4"],
      correct: 1,
      explanation: "The // operator performs floor division in Python.",
    },
    {
      id: 2,
      question:
        "What is the primary purpose of a 'Virtual Environment' in Python development?",
      options: [
        "To make code execution faster",
        "To isolate project-specific dependencies",
        "To hide the source code from users",
        "To run Python on multiple CPUs",
      ],
      correct: 1,
      explanation:
        "Virtual environments prevent version conflicts by isolating libraries for specific projects.",
    },
    {
      id: 3,
      question:
        "Which file is commonly used to list all project dependencies for installation via pip?",
      options: [
        "config.py",
        "dependencies.xml",
        "requirements.txt",
        "setup.log",
      ],
      correct: 2,
      explanation:
        "requirements.txt allows users to install all necessary libraries using 'pip install -r'.",
    },
    {
      id: 4,
      question:
        "Which environment variable is used to tell Python where to look for modules?",
      options: ["PATH", "PYTHONPATH", "PY_HOME", "MODULE_PATH"],
      correct: 1,
      explanation:
        "PYTHONPATH augments the default search path for module files.",
    },
    {
      id: 5,
      question: "Which of these is the default package manager for Python?",
      options: ["npm", "apt-get", "pip", "brew"],
      correct: 2,
      explanation:
        "pip (Package Installer for Python) is the standard tool for managing Python libraries.",
    },
    {
      id: 6,
      question:
        "In the terminal, which command activates a virtual environment named 'venv' on Windows?",
      options: [
        "source venv/bin/activate",
        "venv\\Scripts\\activate",
        "start venv",
        "python activate venv",
      ],
      correct: 1,
      explanation:
        "On Windows, the activation script is located in the Scripts folder.",
    },
    {
      id: 7,
      question: "What does the 'REPL' stand for in Python?",
      options: [
        "Run Execute Print Loop",
        "Read Eval Print Loop",
        "Real-time Engine Programming Link",
        "Remote Environment Programming Language",
      ],
      correct: 1,
      explanation:
        "REPL is the interactive shell that Reads, Evaluates, Prints, and Loops.",
    },
    {
      id: 8,
      question:
        "Which tool is commonly used in AI/ML for interactive coding and data visualization?",
      options: ["Notepad++", "Jupyter Notebook", "Command Prompt", "Eclipse"],
      correct: 1,
      explanation:
        "Jupyter is the industry standard for ML experimentation and data storytelling.",
    },
    {
      id: 9,
      question:
        "Which command would you use to uninstall a package named 'requests'?",
      options: [
        "pip remove requests",
        "pip delete requests",
        "pip uninstall requests",
        "pip kill requests",
      ],
      correct: 2,
      explanation:
        "The 'uninstall' command safely removes a package and its metadata.",
    },
    {
      id: 10,
      question: "What is 'Anaconda' in the context of Python AI/ML?",
      options: [
        "A Python web framework",
        "A distribution including Python and ML libraries",
        "A Python-to-C++ compiler",
        "A database engine",
      ],
      correct: 1,
      explanation:
        "Anaconda simplifies package management and deployment for scientific computing.",
    },
    {
      id: 11,
      question: "Which file extension is used for Jupyter Notebook files?",
      options: [".py", ".ipynb", ".jup", ".notebook"],
      correct: 1,
      explanation: ".ipynb stands for Interactive Python Notebook.",
    },
    {
      id: 12,
      question:
        "How do you check which packages are currently installed in your environment?",
      options: ["pip list", "pip show", "pip check", "pip env"],
      correct: 0,
      explanation:
        "pip list displays all installed packages and their versions.",
    },
    {
      id: 13,
      question: "Which command updates pip to the latest version?",
      options: [
        "pip update",
        "python -m pip install --upgrade pip",
        "pip upgrade self",
        "python get-pip.py",
      ],
      correct: 1,
      explanation:
        "Using the -m (module) flag ensures you are upgrading the pip associated with that specific Python instance.",
    },
    {
      id: 14,
      question: "What does 'IDLE' stand for in Python?",
      options: [
        "Integrated Development and Learning Environment",
        "Interactive Data Logging Engine",
        "Internal Dependency Logic Editor",
        "Integrated Debugging Linkage",
      ],
      correct: 0,
      explanation:
        "IDLE is Python’s built-in integrated development and learning environment.",
    },
    {
      id: 15,
      question: "Which command runs a python script named 'train_model.py'?",
      options: [
        "run train_model.py",
        "python train_model.py",
        "start train_model",
        "exec train_model",
      ],
      correct: 1,
      explanation:
        "Calling the python interpreter followed by the filename executes the script.",
    },
    {
      id: 16,
      question:
        "Which module allows you to access command-line arguments in a script?",
      options: ["os", "sys", "path", "arg"],
      correct: 1,
      explanation:
        "sys.argv is the list of command-line arguments passed to a Python script.",
    },
    {
      id: 17,
      question: "What is the purpose of the 'pip freeze' command?",
      options: [
        "To stop all running Python scripts",
        "To output installed packages in requirements.txt format",
        "To lock the environment for editing",
        "To compress the Python library",
      ],
      correct: 1,
      explanation:
        "pip freeze is primarily used to generate the content for requirements.txt.",
    },
    {
      id: 18,
      question:
        "Which built-in function shows the list of names in the current local scope?",
      options: ["list()", "dir()", "show()", "help()"],
      correct: 1,
      explanation: "dir() is used to find out which names a module defines.",
    },
    {
      id: 19,
      question: "What is the 'Global Interpreter Lock' (GIL)?",
      options: [
        "A security feature for passwords",
        "A mechanism that allows only one thread to execute Python bytecode at a time",
        "A tool to lock the version of a library",
        "A cloud-based Python storage",
      ],
      correct: 1,
      explanation:
        "The GIL ensures thread safety but can limit multi-threaded performance in CPU-bound tasks.",
    },
    {
      id: 20,
      question:
        "Which command is used to create a new virtual environment named 'myenv'?",
      options: [
        "pip create myenv",
        "python -m venv myenv",
        "new-env myenv",
        "python -build myenv",
      ],
      correct: 1,
      explanation:
        "The venv module is the standard way to create virtual environments since Python 3.3.",
    },
    // ... add other 19 questions for Environment
  ],
  typing: [
    {
      id: 1,
      question: "Which of these is an immutable data type?",
      options: ["List", "Set", "Tuple", "Dictionary"],
      correct: 2,
      explanation: "Tuples cannot be changed after creation.",
    },
    {
      id: 2,
      question: "What is the output of 'type(10.5)'?",
      options: [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'decimal'>",
        "<class 'number'>",
      ],
      correct: 1,
      explanation:
        "Floating point numbers (decimals) belong to the 'float' class.",
    },
    {
      id: 3,
      question:
        "Which collection is unordered and does not allow duplicate elements?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      correct: 2,
      explanation: "Sets are collections of unique, unordered items.",
    },
    {
      id: 4,
      question:
        "How do you access the value associated with the key 'name' in dictionary 'd'?",
      options: ["d['name']", "d.name", "d(name)", "d{name}"],
      correct: 0,
      explanation:
        "Dictionary values are accessed using square brackets and the key name.",
    },
    {
      id: 5,
      question: "Which data type is used to represent True or False values?",
      options: ["String", "Logic", "Boolean", "Bit"],
      correct: 2,
      explanation: "The 'bool' type represents truth values.",
    },
    {
      id: 6,
      question: "Which method adds an element to the end of a list?",
      options: ["add()", "push()", "append()", "insert()"],
      correct: 2,
      explanation: "append() adds a single item to the end of a list.",
    },
    {
      id: 7,
      question: "What is the result of 'len([1, 2, 3, 4])'?",
      options: ["3", "4", "5", "Error"],
      correct: 1,
      explanation: "len() returns the number of items in the container.",
    },
    {
      id: 8,
      question: "Which of these is a mutable data type?",
      options: ["String", "Tuple", "Integer", "List"],
      correct: 3,
      explanation:
        "Lists can be modified (elements added, removed, or changed) after creation.",
    },
    {
      id: 9,
      question: "What is the correct syntax for a tuple?",
      options: ["[1, 2]", "{1, 2}", "(1, 2)", "<1, 2>"],
      correct: 2,
      explanation: "Tuples are defined using parentheses.",
    },
    {
      id: 10,
      question:
        "In AI/ML, which data type is primarily used for storing image pixel data?",
      options: ["Strings", "Dictionaries", "NumPy Arrays", "Booleans"],
      correct: 2,
      explanation:
        "NumPy arrays are the standard for high-performance numerical data like pixels.",
    },
    {
      id: 11,
      question:
        "What happens if you try to change a character in a string like 's[0] = 'a''?",
      options: [
        "It works normally",
        "It returns None",
        "It raises a TypeError",
        "It creates a new string automatically",
      ],
      correct: 2,
      explanation: "Strings are immutable; you cannot modify them in place.",
    },
    {
      id: 12,
      question:
        "Which data type would you use to map Student IDs to their Names?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      correct: 1,
      explanation:
        "Dictionaries are 'Key-Value' pairs perfect for mapping unique identifiers to data.",
    },
    {
      id: 13,
      question: "What is 'None' in Python?",
      options: [
        "Zero",
        "An empty string",
        "A special constant representing the absence of a value",
        "A boolean False",
      ],
      correct: 2,
      explanation:
        "None signifies that a variable has no value or a function returns nothing.",
    },
    {
      id: 14,
      question: "How do you create an empty set in Python?",
      options: ["{}", "set()", "[]", "empty_set()"],
      correct: 1,
      explanation:
        "{} creates an empty dictionary. You must use set() for an empty set.",
    },
    {
      id: 15,
      question: "Which method returns all keys in a dictionary?",
      options: ["d.all_keys()", "d.keys()", "d.get_keys()", "d.list()"],
      correct: 1,
      explanation: "d.keys() returns a view object of all keys.",
    },
    {
      id: 16,
      question: "What is the result of 'bool(0)'?",
      options: ["True", "False", "None", "Error"],
      correct: 1,
      explanation: "In Python, the number 0 is falsy.",
    },
    {
      id: 17,
      question:
        "Which built-in function converts a string '123' to an integer?",
      options: ["string_to_int()", "int()", "convert(int)", "num()"],
      correct: 1,
      explanation: "The int() function performs type casting to integer.",
    },
    {
      id: 18,
      question: "What is a 'f-string'?",
      options: [
        "A failed string",
        "A formatted string literal",
        "A fast string",
        "A functional string",
      ],
      correct: 1,
      explanation:
        "f-strings (e.g., f'{var}') provide a concise way to embed expressions inside string literals.",
    },
    {
      id: 19,
      question: "What is the data type of the result of '5 / 2'?",
      options: ["Integer", "Float", "Double", "String"],
      correct: 1,
      explanation: "In Python 3, division always returns a float (e.g., 2.5).",
    },
    {
      id: 20,
      question:
        "Which collection allows you to store items as (Index, Value) pairs automatically?",
      options: ["List", "Dictionary", "Set", "None of these"],
      correct: 0,
      explanation:
        "Lists are indexed sequences where the position (0, 1, 2...) acts as the key.",
    },
    // ... add other 19 questions for Typing
  ],
  arithmetic: [
    {
      id: 1,
      question: "Result of 10 // 3?",
      options: ["3.33", "3", "3.0", "4"],
      correct: 1,
      explanation: "// is floor division, returning the largest integer.",
    },
    {
      id: 2,
      question: "Which operator is used for exponentiation (power)?",
      options: ["^", "**", "*", "exp"],
      correct: 1,
      explanation: "2 ** 3 results in 8.",
    },
    {
      id: 3,
      question: "What is the result of 10 % 3?",
      options: ["3", "1", "0.33", "0"],
      correct: 1,
      explanation:
        "The modulo operator (%) returns the remainder of the division.",
    },
    {
      id: 4,
      question: "Which of the following is an invalid variable name?",
      options: ["_my_var", "myVar2", "2myVar", "my_var_name"],
      correct: 2,
      explanation: "Variable names cannot start with a number.",
    },
    {
      id: 5,
      question: "What is the value of 'x' after: x = 5; x += 3?",
      options: ["5", "3", "8", "15"],
      correct: 2,
      explanation: "x += 3 is shorthand for x = x + 3.",
    },
    {
      id: 6,
      question:
        "In Python arithmetic, which operation is performed first based on PEMDAS?",
      options: ["Addition", "Multiplication", "Parentheses", "Subtraction"],
      correct: 2,
      explanation: "Parentheses always have the highest priority.",
    },
    {
      id: 7,
      question: "What is the result of '3 * 'ABC''?",
      options: ["ABCABCABC", "Error", "ABC 3", "9"],
      correct: 0,
      explanation: "The * operator with a string performs repetition.",
    },
    {
      id: 8,
      question: "Which function allows you to get user input as a string?",
      options: ["get()", "read()", "input()", "scan()"],
      correct: 2,
      explanation: "input() reads a line from the console.",
    },
    {
      id: 9,
      question: "What is the result of 'float(5)'?",
      options: ["5", "5.0", "5.5", "Error"],
      correct: 1,
      explanation: "Casting an int to a float adds a decimal point.",
    },
    {
      id: 10,
      question: "What does the '=' operator do?",
      options: [
        "Checks equality",
        "Assigns a value to a variable",
        "Adds two numbers",
        "Creates a constant",
      ],
      correct: 1,
      explanation: "A single '=' is the assignment operator.",
    },
    {
      id: 11,
      question: "What is the result of '10 / 2'?",
      options: ["5", "5.0", "2", "2.5"],
      correct: 1,
      explanation: "Division in Python 3 returns a float.",
    },
    {
      id: 12,
      question: "Which of these is used for 'Not Equal' comparison?",
      options: ["<>", "==", "!=", "not="],
      correct: 2,
      explanation: "!= checks if two values are different.",
    },
    {
      id: 13,
      question: "What is the result of 'round(3.7)'?",
      options: ["3", "4", "3.0", "4.0"],
      correct: 1,
      explanation: "round() returns the nearest integer.",
    },
    {
      id: 14,
      question: "How do you calculate the absolute value of -5?",
      options: ["abs(-5)", "absolute(-5)", "val(-5)", "neg(-5)"],
      correct: 0,
      explanation: "abs() is a built-in function for absolute values.",
    },
    {
      id: 15,
      question: "What is the result of 2 + 3 * 4?",
      options: ["20", "14", "24", "18"],
      correct: 1,
      explanation:
        "Multiplication happens before addition (3*4 = 12, 12+2 = 14).",
    },
    {
      id: 16,
      question: "Which keyword is used to create a constant in Python?",
      options: [
        "const",
        "final",
        "static",
        "Python has no real constant keyword",
      ],
      correct: 3,
      explanation:
        "Python uses naming conventions (UPPER_CASE) for constants but doesn't enforce them.",
    },
    {
      id: 17,
      question: "What is 'snake_case'?",
      options: [
        "Writing like a snake",
        "Variables separated by underscores",
        "Capitalizing every word",
        "Starting with a number",
      ],
      correct: 1,
      explanation:
        "snake_case is the standard naming convention for variables in Python.",
    },
    {
      id: 18,
      question: "What is the result of 'min(5, 10, 2)'?",
      options: ["5", "10", "2", "Error"],
      correct: 2,
      explanation: "min() returns the smallest value.",
    },
    {
      id: 19,
      question: "What is the binary representation of the integer 5?",
      options: ["101", "111", "011", "100"],
      correct: 0,
      explanation: "5 in binary (base 2) is 101.",
    },
    {
      id: 20,
      question: "What is the value of 'a' after: a, b = 1, 2?",
      options: ["1", "2", "1, 2", "Error"],
      correct: 0,
      explanation: "This is tuple unpacking for multiple assignment.",
    },
  ],
  memory: [
    {
      id: 1,
      question: "Which module provides a GC interface?",
      options: ["sys", "os", "gc", "memory"],
      correct: 2,
      explanation: "The 'gc' module exposes the garbage collector.",
    },
    {
      id: 2,
      question:
        "Which mechanism in Python handles objects that point to each other (Circular References)?",
      options: [
        "Reference Counting",
        "Cyclic Garbage Collector",
        "Stack Allocation",
        "Memory Buffering",
      ],
      correct: 1,
      explanation:
        "While ref-counting handles most things, the Cyclic GC detects and fixes circular loops.",
    },
    {
      id: 3,
      question: "What does an object's 'Reference Count' represent?",
      options: [
        "The number of times it was used",
        "The number of variables/pointers pointing to it",
        "Its size in bytes",
        "Its memory address",
      ],
      correct: 1,
      explanation: "When the count reaches zero, the object is deallocated.",
    },
    {
      id: 4,
      question:
        "Which of the following is stored in the 'Private Heap' in Python?",
      options: [
        "Only integers",
        "Python objects and data structures",
        "The operating system files",
        "The source code text",
      ],
      correct: 1,
      explanation:
        "All Python objects are kept in a private heap managed by the Python Memory Manager.",
    },
    {
      id: 5,
      question: "What is 'Memory Leak' in Python?",
      options: [
        "Python script running too fast",
        "Memory that is no longer needed but not released",
        "A computer virus",
        "The hard drive failing",
      ],
      correct: 1,
      explanation:
        "Leaks happen when objects stay in memory because references to them are never deleted.",
    },
    {
      id: 6,
      question: "Which function returns the size of an object in bytes?",
      options: ["sys.getsizeof()", "os.size()", "mem.size()", "len()"],
      correct: 0,
      explanation:
        "getsizeof() from the sys module is the standard way to check memory footprint.",
    },
    {
      id: 7,
      question:
        "Where are 'local variables' typically stored during function execution?",
      options: ["On the Heap", "On the Stack", "In a database", "In the cloud"],
      correct: 1,
      explanation:
        "Stacks are used for temporary data like local variables and function calls.",
    },
    {
      id: 8,
      question: "What is the purpose of the 'del' statement?",
      options: [
        "To delete a file",
        "To remove a reference to an object",
        "To clear the screen",
        "To uninstall Python",
      ],
      correct: 1,
      explanation:
        "del decreases the reference count of an object by removing a variable name.",
    },
    {
      id: 9,
      question: "What are 'Generations' in Python's Garbage Collector?",
      options: [
        "Versions of Python",
        "A way to categorize objects by how long they survive collection",
        "Different user accounts",
        "Types of memory chips",
      ],
      correct: 1,
      explanation:
        "Objects move from Gen 0 to Gen 2 the longer they stay active.",
    },
    {
      id: 10,
      question: "What is 'Integer Interning'?",
      options: [
        "Converting int to float",
        "Caching small integers (-5 to 256) to save memory",
        "Calculating large prime numbers",
        "Encrypting numbers",
      ],
      correct: 1,
      explanation:
        "Python reuses memory for small integers frequently used in code.",
    },
    {
      id: 11,
      question: "Which command manually triggers a garbage collection?",
      options: ["gc.collect()", "gc.start()", "mem.clear()", "sys.gc()"],
      correct: 0,
      explanation: "You can force a collection using gc.collect().",
    },
    {
      id: 12,
      question: "What is the 'PyObject' in CPython?",
      options: [
        "A Python library",
        "The base structure for all Python objects",
        "A type of variable",
        "A cloud object",
      ],
      correct: 1,
      explanation:
        "In the C source code, every Python object is a variation of PyObject.",
    },
    {
      id: 13,
      question: "What is 'Object Pooling'?",
      options: [
        "Sharing objects in a cloud",
        "Reusing certain immutable objects like small integers and strings",
        "Deleting all objects at once",
        "Creating objects in a list",
      ],
      correct: 1,
      explanation:
        "Reusing objects saves the overhead of creating new ones constantly.",
    },
    {
      id: 14,
      question: "Why does Python use a 'Heap' instead of just a 'Stack'?",
      options: [
        "Heaps are faster",
        "Stacks cannot handle dynamic memory allocation",
        "Heaps are more secure",
        "Python doesn't use a Heap",
      ],
      correct: 1,
      explanation:
        "Heaps allow for objects that live beyond the life of a single function call.",
    },
    {
      id: 15,
      question:
        "Which tool can help visualize memory usage in a Python script?",
      options: ["Memory Profiler", "Web Browser", "Text Editor", "Calculator"],
      correct: 0,
      explanation: "Memory profiler libraries help developers find leaks.",
    },
    {
      id: 16,
      question: "What happens when reference count of an object becomes zero?",
      options: [
        "The computer restarts",
        "The memory is immediately freed",
        "The object becomes global",
        "Nothing happens",
      ],
      correct: 1,
      explanation: "Deallocation happens as soon as an object is unreachable.",
    },
    {
      id: 17,
      question: "What is 'Fragmentation' in memory?",
      options: [
        "Breaking a computer",
        "Small gaps of unused memory that cannot be allocated",
        "Merging two files",
        "Fast memory access",
      ],
      correct: 1,
      explanation:
        "Fragmentation can make memory allocation fail even if free space exists.",
    },
    {
      id: 18,
      question:
        "Does Python allow users to manually manage pointers like in C++?",
      options: ["Yes", "No", "Only for integers", "Only in Jupyter"],
      correct: 1,
      explanation:
        "Python abstracts away pointers to make development safer and easier.",
    },
    {
      id: 19,
      question:
        "Which data type consumes more memory: Tuple or List (of same size)?",
      options: ["Tuple", "List", "They are equal", "Depends on OS"],
      correct: 1,
      explanation:
        "Lists are slightly larger because they over-allocate memory to handle future appends.",
    },
    {
      id: 20,
      question: "What is the primary role of the 'Python Memory Manager'?",
      options: [
        "Updating Python",
        "Handling the allocation and deallocation of the heap",
        "Managing internet connection",
        "Calculating math problems",
      ],
      correct: 1,
      explanation:
        "It sits between the OS and the Python interpreter to manage memory efficiently.",
    },
  ],
};

// Standard Long Term Exams (Can follow same topic pattern or be general)
export const longTermQuestions = {
  // Assignment ID 5: AI/ML Comprehensive Foundation (50 Questions)
  5: [
    {
      id: 1,
      question:
        "In an AI workflow, why is it preferred to use a Virtual Environment for Python projects?",
      options: [
        "To increase the execution speed of NumPy",
        "To isolate project dependencies and avoid library version conflicts",
        "To bypass Python's Global Interpreter Lock (GIL)",
        "To automatically encrypt the dataset",
      ],
      correct: 1,
      explanation:
        "Virtual environments ensure that different projects can use different versions of packages like scikit-learn or TensorFlow without interfering with each other.",
    },
    {
      id: 2,
      question:
        "Which data type is most efficient for storing large, multi-dimensional numerical arrays in ML?",
      options: ["List of Lists", "Dictionary", "NumPy Array (ndarray)", "Set"],
      correct: 2,
      explanation:
        "NumPy arrays are stored in contiguous memory blocks, making them significantly faster and more memory-efficient than standard Python lists for mathematical operations.",
    },
    {
      id: 3,
      question:
        "What happens during 'Integer Interning' in Python's memory management?",
      options: [
        "Small integers are pre-allocated to fixed memory addresses",
        "Large integers are compressed to save space",
        "Integers are converted to floats automatically",
        "All integers are deleted after the function ends",
      ],
      correct: 0,
      explanation:
        "Python interns a range of small integers (typically -5 to 256) to save memory and time, as these values are frequently used.",
    },
    {
      id: 4,
      question:
        "When working with large datasets in AI, why is 'Generator' expressions preferred over 'List Comprehensions'?",
      options: [
        "Generators are faster at mathematical calculations",
        "Generators use lazy evaluation and significantly less memory",
        "Generators are compatible with deep learning frameworks only",
        "List comprehensions are deprecated in Python 3.10+",
      ],
      correct: 1,
      explanation:
        "Generators yield items one at a time (lazy evaluation), whereas lists store all items in memory at once, which can cause a MemoryError with large datasets.",
    },
    {
      id: 5,
      question:
        "Which Python feature allows a function to accept a variable number of keyword arguments, often used in ML model configurations?",
      options: ["*args", "**kwargs", "lambda", "global"],
      correct: 1,
      explanation:
        "**kwargs allows a function to receive any number of named arguments as a dictionary, providing flexibility for model hyperparameters.",
    },
    {
      id: 6,
      question:
        "What is the purpose of the 'with' statement when opening a dataset file in Python?",
      options: [
        "To speed up the file reading process",
        "To ensure the file is automatically closed after execution, even if an error occurs",
        "To encrypt the file data before processing",
        "To allow multiple users to edit the file simultaneously",
      ],
      correct: 1,
      explanation:
        "The 'with' statement acts as a context manager, ensuring resource cleanup (closing the file) is handled automatically.",
    },
    {
      id: 7,
      question:
        "In the context of AI libraries, what does 'Vectorization' refer to?",
      options: [
        "Converting code into arrows",
        "Executing operations on entire arrays at once rather than using explicit loops",
        "Drawing graphs for data visualization",
        "Sorting data in alphabetical order",
      ],
      correct: 1,
      explanation:
        "Vectorization leverages optimized C/Fortran code in libraries like NumPy to perform parallel-style operations on arrays.",
    },
    {
      id: 8,
      question:
        "How does 'Deep Copy' differ from 'Shallow Copy' when duplicating complex data structures?",
      options: [
        "Deep copy only works for integers",
        "Shallow copy is faster but creates references; Deep copy creates entirely independent objects",
        "There is no difference in modern Python",
        "Deep copy is only used for cloud-based data",
      ],
      correct: 1,
      explanation:
        "A deep copy recursively clones every object found in the original, ensuring no shared memory exists between the two structures.",
    },
    {
      id: 9,
      question:
        "Which of the following describes the 'Lambda' function correctly?",
      options: [
        "A function that runs on a separate server",
        "An anonymous, one-line function defined without the 'def' keyword",
        "A function used specifically for cleaning text data",
        "A function that cannot return any value",
      ],
      correct: 1,
      explanation:
        "Lambda functions are small, restricted functions that can be defined in a single line, often used as arguments for high-order functions like map() or filter().",
    },
    {
      id: 10,
      question:
        "What is the significance of 'Double Underscore' (dunder) methods like __init__ in AI model classes?",
      options: [
        "They are used for security encryption",
        "They are 'Magic Methods' that define how objects behave with built-in Python operations",
        "They mark the code as 'deprecated'",
        "They prevent the code from being imported as a module",
      ],
      correct: 1,
      explanation:
        "Dunder methods allow developers to implement operator overloading and define initialization logic for class instances.",
    },
    {
      id: 11,
      question:
        "Which module is used to measure the execution time of small code snippets for performance benchmarking?",
      options: ["time", "datetime", "timeit", "chrono"],
      correct: 2,
      explanation:
        "The 'timeit' module provides a simple way to time small bits of Python code while avoiding common pitfalls in measurement.",
    },
    {
      id: 12,
      question: "In Python, 'Decorator' is used to:",
      options: [
        "Change the color of the IDE",
        "Modify or extend the behavior of a function or class without permanently changing its source code",
        "Add comments to the code automatically",
        "Link the code to a CSS file",
      ],
      correct: 1,
      explanation:
        "Decorators wrap another function, allowing you to run code before or after the wrapped function executes.",
    },
    {
      id: 13,
      question:
        "What is the result of the expression: [x for x in range(5) if x % 2 == 0]?",
      options: ["[0, 2, 4]", "[1, 3]", "[0, 1, 2, 3, 4]", "[2, 4]"],
      correct: 0,
      explanation:
        "This is a list comprehension that filters the range to include only even numbers.",
    },
    // ... continue adding up to 50 questions
  ],

  // Assignment ID 6: Advanced Python Memory Logic (40 Questions)
  6: [
    {
      id: 1,
      question:
        "How does the 'refcount' in Python's CAPI help in memory management?",
      options: [
        "It counts how many times a loop runs",
        "It tracks the number of references pointing to an object",
        "It determines the size of the stack",
        "It measures the latency of the garbage collector",
      ],
      correct: 1,
      explanation:
        "When the reference count (refcount) of an object drops to zero, Python immediately deallocates the memory associated with that object.",
    },
    {
      id: 2,
      question:
        "Which of the following scenarios can lead to a memory leak even with a Garbage Collector?",
      options: [
        "Assigning a variable to None",
        "Using local variables inside a function",
        "Circular references where two objects point to each other",
        "Deleting a dictionary entry",
      ],
      correct: 2,
      explanation:
        "Circular references can prevent reference counts from hitting zero, requiring the cyclic garbage collector to intervene and clean them up.",
    },
    {
      id: 3,
      question:
        "What is the role of the 'Arenas' in the CPython memory allocator?",
      options: [
        "They are used to store global variables only",
        "They are the largest chunks of memory (256 KB) requested from the OS to be subdivided into pools",
        "They act as a backup when the RAM is full",
        "They are used to store compiled bytecode",
      ],
      correct: 1,
      explanation:
        "CPython requests memory from the OS in 'Arenas'. These are then subdivided into 'Pools', which contain 'Blocks'.",
    },
    {
      id: 4,
      question:
        "Which generation in Python's Cyclic Garbage Collector is collected most frequently?",
      options: [
        "Generation 0",
        "Generation 1",
        "Generation 2",
        "All are collected equally",
      ],
      correct: 0,
      explanation:
        "Generation 0 contains young objects; the GC runs most frequently on this generation based on the 'threshold' setting.",
    },
    {
      id: 5,
      question:
        "What is 'Memory Fragmentation' in the context of Python long-running processes?",
      options: [
        "The hard drive failing to save data",
        "Unused gaps between allocated memory blocks that cannot be used for new objects",
        "A security breach in the RAM",
        "Splitting code into multiple files",
      ],
      correct: 1,
      explanation:
        "Fragmentation happens when memory is allocated and freed in a way that leaves small, unusable gaps, potentially causing a MemoryError despite having free total RAM.",
    },
    {
      id: 6,
      question: "Why does assigning 'x = None' help in memory management?",
      options: [
        "It deletes the variable from the script",
        "It reduces the reference count of the object previously held by 'x'",
        "It clears the cache of the CPU",
        "It makes the script run faster",
      ],
      correct: 1,
      explanation:
        "By reassigning the name 'x' to None, the previous object loses a reference. If its count hits zero, it is eligible for deallocation.",
    },
    {
      id: 7,
      question: "What does the term 'Interning' mean for strings in Python?",
      options: [
        "Translating strings into other languages",
        "Storing only one copy of certain identical strings in memory to save space",
        "Turning strings into integers",
        "Calculating the length of a string",
      ],
      correct: 1,
      explanation:
        "Python interns short strings and those that look like identifiers to optimize memory and speed up comparisons.",
    },
    {
      id: 8,
      question:
        "In CPython, every object header contains which two pieces of critical information?",
      options: [
        "Variable name and line number",
        "Reference count and a pointer to the object's type",
        "Created date and encrypted ID",
        "Owner name and memory size",
      ],
      correct: 1,
      explanation:
        "The 'PyObject' header contains 'ob_refcnt' (reference count) and 'ob_type' (type pointer), which are essential for the interpreter to function.",
    },
    {
      id: 9,
      question:
        "Which of these functions can be used to manually disable the automatic Garbage Collector?",
      options: ["gc.stop()", "gc.disable()", "gc.off()", "sys.gc_disable()"],
      correct: 1,
      explanation:
        "gc.disable() stops the cyclic garbage collector, which can be useful in performance-critical code where no circular references exist.",
    },
    {
      id: 10,
      question:
        "What is the 'Global Interpreter Lock' (GIL) impact on memory access?",
      options: [
        "It prevents memory from being accessed by the user",
        "It ensures only one thread interacts with Python objects/memory at a time, preventing race conditions",
        "It encrypts the heap memory",
        "It limits the amount of RAM Python can use",
      ],
      correct: 1,
      explanation:
        "The GIL simplifies memory management by ensuring that thread-safe reference counting is maintained without complex locking mechanisms.",
    },
    {
      id: 11,
      question: "What is a 'Memory Profile' analysis used for?",
      options: [
        "To check the user's login history",
        "To trace memory allocation over time and identify leaks or high-usage areas",
        "To change the theme of the application",
        "To increase the speed of the internet",
      ],
      correct: 1,
      explanation:
        "Memory profiling helps developers understand how their application consumes RAM, identifying specific lines of code that cause spikes.",
    },
    {
      id: 12,
      question:
        "Which of the following describes the 'Object Pool' for small integers?",
      options: [
        "It is a database of all numbers used in the script",
        "A pre-allocated array of integer objects for values -5 to 256",
        "A cloud storage for numeric data",
        "A way to turn integers into binary",
      ],
      correct: 1,
      explanation:
        "Small integers are so common that CPython creates them once at startup and reuses them throughout the session to avoid repeated allocation overhead.",
    },
    // ... continue adding up to 40 questions
  ],
};
