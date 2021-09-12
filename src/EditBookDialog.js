import React from "react";
import { Button, DialogTitle, TextField } from "@material-ui/core";
import firebase from "firebase";
import Dialog from "@material-ui/core/Dialog";

export default function SimpleDialogDemo(props) {
  var firebaseConfig = {
    apiKey: "AIzaSyD3wYGfzzoMtt2AAfbCr2ubYsoqvfrT75g",
    authDomain: "book-site-6b76c.firebaseapp.com",
    databaseURL: "https://book-site-6b76c-default-rtdb.firebaseio.com",
    projectId: "book-site-6b76c",
    storageBucket: "book-site-6b76c.appspot.com",
    messagingSenderId: "701453654538",
    appId: "1:701453654538:web:214986cbf7f8ccc7a85df3",
    measurementId: "G-XZ28S34HXP",
  };

  //set up db
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const db = firebase.firestore();

  const { open } = props;

  console.log();

  var BookRef;
  if (props.id) {
    BookRef = db.collection("books").doc(props.id);
  } else {
    BookRef = db.collection("books").doc("0mdaHk4kLY3Jku7FatRQ");
  }

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Edit Book</DialogTitle>
      <TextField
        label="TItle"
        value={props.title}
        onChange={(e) => props.titleChager(e.target.value)}
        style={{ paddingRight: 8 }}
      />
      <TextField
        label="Author"
        value={props.author}
        onChange={(e) => props.authorChanger(e.target.value)}
        style={{ paddingRight: 8 }}
      />
      <TextField
        label="Genre"
        value={props.genres}
        onChange={(e) => props.genreChanger(e.target.value)}
        style={{ paddingRight: 8 }}
      />
      <TextField
        label="Image URL"
        value={props.image}
        onChange={(e) => props.imageChanger(e.target.value)}
        style={{ paddingRight: 8 }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          BookRef.update({
            name: props.title,
            author: props.author,
            picture: props.image,
            genres: firebase.firestore.FieldValue.arrayUnion(props.genres),
          });
        }}
      >
        Edit
      </Button>
    </Dialog>
  );
}
