# Hasteglary
## DESCRIPTION
A simple web application to manage your library. Users can add, modify, and remove books from their library. In addition, each user wants to keep track of the number of readings for each book.

## Entity Description
Each book is identified by the following attributes:
- Title
- Author
- ISBN code
- Date added to the library
- Date of deletion (if deleted)
- Plot
- Number of complete readings

The user is instead identified by:
- Name
- Surname
- Email

## Technical specifications
The application consists of a server part (BE) and a client part (FE).

### Frontend
The Frontend consists of only three screens:
- login
- the list of books in the possession of the logged-in user
- the book detail page, where all information can be viewed

### Backend
The Backend exposes some APIs that allow the Frontend to access the data stored in the database.

## Technologies
- BACKEND: SpringBoot
- FRONTEND: Angular
- DATABASE: PostgreSQL


