import React, { useState } from "react";
import { Typography, TextField, Button, Box, Grid } from "@material-ui/core";
import "tailwindcss/tailwind.css";
import request from "superagent";
import EditTBRDialog from "./EditTBRDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export function TBRPage(props) {
  const [bookNameValue, setBookNameValue] = useState("");
  const [authorNameValue, setAuthorNameValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [passDownTitle, setPassDownTitle] = useState("");
  const [passDownAuthor, setPassDownAuthor] = useState("");
  const [passDownImage, setPassDownImage] = useState("");
  const [passDownGenre, setPassDownGenre] = useState("");
  const [passDownID, setPassDownID] = useState("");

  const classes = useStyles();

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <form>
        <Box display="flex" align-items="center" m={1}>
          <TextField
            label="Title"
            value={bookNameValue}
            onChange={(e) => setBookNameValue(e.target.value)}
            style={{ paddingRight: 8 }}
          />
          <TextField
            label="Author"
            value={authorNameValue}
            onChange={(e) => setAuthorNameValue(e.target.value)}
            style={{ paddingRight: 8 }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              if (bookNameValue !== "" && authorNameValue !== "") {
                request
                  .get("https://www.googleapis.com/books/v1/volumes")
                  .query({
                    q: bookNameValue,
                    inauthor: authorNameValue,
                    intitle: bookNameValue,
                  })
                  .then((data) => {
                    var stuffToAdd = {
                      name: bookNameValue,
                      author: authorNameValue,
                    };
                    if (data.body.items) {
                      if (data.body.items[1].volumeInfo.categories) {
                        stuffToAdd.genres =
                          data.body.items[1].volumeInfo.categories;
                      }
                      if (data.body.items[1].volumeInfo.pageCount) {
                        stuffToAdd.pageCount =
                          data.body.items[1].volumeInfo.pageCount;
                      }
                      if (data.body.items[1].volumeInfo.imageLinks.thumbnail) {
                        stuffToAdd.picture =
                          data.body.items[1].volumeInfo.imageLinks.thumbnail;
                      }
                    }

                    props.tbrRef.add(stuffToAdd);
                    toast.success("Your book was added!", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  });
              }
              setBookNameValue("");
              setAuthorNameValue("");
            }}
          >
            Add
          </Button>
          <ToastContainer />
        </Box>
      </form>

      <div>
        {props.tbr
          ? props.tbr.map((book) => (
              <Grid
                style={{ paddingTop: 6, paddingBottom: 6 }}
                key={book.id}
                container
              >
                <Grid item>
                  <img
                    src={book.picture}
                    width="250"
                    height="350"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={
                      book.genres
                        ? () => {
                            setPassDownTitle(book.name);
                            setPassDownAuthor(book.author);
                            setPassDownGenre(book.genres[0]);
                            setPassDownImage(book.picture);
                            setPassDownID(book.id);
                            setDialogOpen(true);
                          }
                        : () => {
                            setPassDownTitle(book.name);
                            setPassDownAuthor(book.author);
                            setPassDownAuthor(book.author);
                            setPassDownGenre("");
                            setPassDownImage(book.picture);
                            setPassDownID(book.id);
                            setDialogOpen(true);
                          }
                    }
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Box
                      display="flex"
                      style={{ paddingTop: 6, paddingBottom: 6 }}
                    >
                      <Typography
                        style={{
                          paddingLeft: 16,
                        }}
                        color="primary"
                        variant="h5"
                      >
                        {"Title: "}
                      </Typography>
                      <Typography variant="h5" style={{ paddingLeft: 4 }}>
                        {book.name}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      style={{ paddingTop: 6, paddingBottom: 6 }}
                    >
                      <Typography
                        style={{
                          paddingLeft: 16,
                        }}
                        color="primary"
                        variant="h5"
                      >
                        {"Author: "}
                      </Typography>
                      <Typography style={{ paddingLeft: 4 }} variant="h5">
                        {book.author}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      style={{ paddingTop: 6, paddingBottom: 6 }}
                    >
                      <Typography
                        style={{
                          paddingLeft: 16,
                        }}
                        color="primary"
                        variant="h5"
                      >
                        {" Page Count: "}
                      </Typography>
                      <Typography style={{ paddingLeft: 4 }} variant="h5">
                        {book.pageCount}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      style={{ paddingTop: 6, paddingBottom: 6 }}
                    >
                      <Typography
                        style={{
                          paddingLeft: 16,
                        }}
                        color="primary"
                        variant="h5"
                      >
                        {" Genre: "}
                      </Typography>
                      {book.genres ? (
                        <Typography style={{ paddingLeft: 4 }} variant="h5">
                          {book.genres[0]}
                        </Typography>
                      ) : (
                        <Typography style={{ paddingLeft: 4 }} variant="h5">
                          No Genre
                        </Typography>
                      )}
                    </Box>
                    <Box
                      className={classes.root}
                      display="flex"
                      style={{
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 12,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          props.booksRef.add({
                            name: book.name,
                            author: book.author,
                            pageCount: book.pageCount,
                            genres: book.genres,
                            picture: book.picture,
                          });

                          //add the book to the authors count
                          var authorExists = false;
                          props.authorsRef
                            .where("author", "==", book.author)
                            .get()
                            .then((querySnapshot) => {
                              querySnapshot.forEach((doc) => {
                                if (doc.id) {
                                  props.authorsRef.doc(doc.id).update({
                                    bookCount: doc.data().bookCount + 1,
                                    sortCount: doc.data().sortCount - 1,
                                  });
                                  authorExists = true;
                                }
                              });
                              if (!authorExists) {
                                props.authorsRef.add({
                                  author: authorNameValue,
                                  bookCount: 1,
                                  sortCount: -1,
                                });
                              }
                            })
                            .catch((error) => {
                              console.log("Error getting documents: ", error);
                            });

                          var bookToAddToRead = props.db
                            .collection("tbr")
                            .doc(book.id);
                          bookToAddToRead.delete();
                        }}
                      >
                        Add To Books
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Delete />}
                        onClick={() => {
                          var bookToDelete = props.db
                            .collection("tbr")
                            .doc(book.id);
                          bookToDelete.delete();
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))
          : null}
      </div>

      <EditTBRDialog
        open={dialogOpen}
        author={passDownAuthor}
        authorChanger={setPassDownAuthor}
        title={passDownTitle}
        titleChager={setPassDownTitle}
        image={passDownImage}
        imageChanger={setPassDownImage}
        genres={passDownGenre}
        genreChanger={setPassDownGenre}
        onClose={handleClose}
        id={passDownID}
      />
    </div>
  );
}

export default TBRPage;
