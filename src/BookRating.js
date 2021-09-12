import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import firebase from "firebase";

export function BookRating(props) {
  const [value, setValue] = useState(props.book.rating);

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

  var bookRef;
  if (props.book.id) {
    bookRef = db.collection("books").doc(props.book.id);
  } else {
    bookRef = db.collection("books").doc("0mdaHk4kLY3Jku7FatRQ");
  }

  return (
    <Rating
      value={value}
      name={props.book.name}
      precision={0.5}
      onChange={(event, newValue) => {
        console.log(newValue);
        setValue(newValue);
        console.log(bookRef);
        bookRef.update({
          rating: newValue,
        });
      }}
    />
  );
}
