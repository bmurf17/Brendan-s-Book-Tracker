import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomePage } from "./HomePage";
import { BookPage } from "./BookPage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import TBRPage from "./TBRPage";
import firebase from "firebase";
import { firebaseConfig } from "./Util/dbConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const db = firebase.firestore();

  const booksRef = db.collection("books");
  const bookQuery = booksRef.orderBy("author");
  const [books] = useCollectionData(bookQuery, { idField: "id" });
  const sortedBookQuery = booksRef.orderBy("dateRead");
  const [sortedBooks] = useCollectionData(sortedBookQuery, { idField: "id" });

  const tbrRef = db.collection("tbr");
  const tbrQuery = tbrRef.orderBy("author");
  const [tbr] = useCollectionData(tbrQuery, { idField: "id" });

  const authorsRef = db.collection("authors");
  const authorQuery = authorsRef.orderBy("sortCount");
  const [authors] = useCollectionData(authorQuery, { idField: "id" });

  return (
    <Router>
      <Box display="flex" justifyContent="flex-end">
        <AppBar position="static">
          <Toolbar>
            <Box display="flex" alignItems="center">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="h5"
                  color="inherit"
                  style={{ paddingRight: 12 }}
                >
                  Brendan's Book Tracker
                </Typography>
              </Link>
            </Box>

            <Box display="flex" justifySelf="end">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: 12,
                }}
              >
                <Typography variant="h5" color="inherit">
                  Home
                </Typography>
              </Link>

              <Link
                to="/book"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: 12,
                }}
              >
                <Typography variant="h5" color="inherit">
                  Books
                </Typography>
              </Link>

              <Link
                to="/tbr"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: 12,
                }}
              >
                <Typography variant="h5" color="inherit">
                  TBR
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Switch>
        <Route path="/book">
          <BookPage
            db={db}
            books={books}
            booksRef={booksRef}
            authors={authors}
            authorsRef={authorsRef}
          />
        </Route>
        <Route path="/tbr">
          <TBRPage
            db={db}
            tbr={tbr}
            tbrRef={tbrRef}
            booksRef={booksRef}
            authors={authors}
            authorsRef={authorsRef}
          />
        </Route>
        <Route path="/">
          <HomePage
            db={db}
            books={books}
            booksRef={booksRef}
            authors={authors}
            sortedBooks={sortedBooks}
          />
        </Route>
      </Switch>
    </Router>
  );
}
