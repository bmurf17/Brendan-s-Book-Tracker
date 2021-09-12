import React from "react";
import { Typography, Box } from "@material-ui/core";
import "tailwindcss/tailwind.css";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";

export function HomePage(props) {
  if (props.sortedBooks) {
    var count = 0;
    var bookCountArray = [];
    var labels = [];
    props.sortedBooks.forEach((book) => {
      if (count === 0) {
        bookCountArray[count] = book.pageCount;
      } else {
        bookCountArray[count] = bookCountArray[count - 1] + book.pageCount;
      }
      labels[count] = moment(book.dateRead.toDate()).calendar();
      count++;
    });

    var lineData = {
      labels: labels,
      datasets: [
        {
          label: "Total Pages Read",
          data: bookCountArray,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }

  if (props.authors) {
    var size = 5;
    var authorNames = props.authors
      .slice(0, size)
      .map((author) => author.author);
    var bookCounts = props.authors.map((author) => author.bookCount);

    var charData = {
      labels: authorNames,
      datasets: [
        {
          label: "Total Books per Author",
          data: bookCounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    };
  }

  return (
    <>
      <div>
        <Box display="flex" justifyContent="center" p={1}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h3">
              Welcome to my book tracking website
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography variant="h4">My Top 5 Authors</Typography>
        </Box>
        <Box>
          <Bar
            data={charData}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </Box>

        <Box display="flex" justifyContent="center">
          <Typography variant="h4">My Total Page Count</Typography>
        </Box>
        <Box>
          <Line data={lineData} />
        </Box>

        <Box paddingLeft={1} paddingBottom={1}>
          <Typography vairant="body1">By: Brendan Murphy</Typography>
        </Box>

        <Box paddingLeft={1} paddingBottom={5}>
          <Typography variant="body1">
            I have started this website to learn react and firebase. I really
            enjoy reading, so I am putting together this website to track the
            books I am reading. I want to give people the ability to comment on
            what I am reading, and maybe at one point allow them to post their
            own reading lists. Also, I think that it would be cool to keep stats
            on the books I am reading. Things like genre, page count, reading
            time, and other stats could be interesting. Need to add the date
            that the entry was entered. Want to improve edit feature especially
            with genres. Want to implement users. Want to improve style. Lots of
            refactoring.
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default HomePage;
