import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const now = moment();
  const dateObj = moment()
    .subtract(30, "d") // Start from 30 days ago
    .add(x, "w") // x represents weeks
    .add(y, "d") // y represents days in the week
    .add(random.int(0, 23), "h"); // Add random hour
  const date = dateObj.isAfter(now) ? now.format() : dateObj.format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const x = random.int(0, 4); // Select random week within 4 weeks (0-4)
  const y = random.int(0, 6); // Select random day of the week (0-6)
  const now = moment();
  const dateObj = moment()
    .subtract(30, "d") // Start from 30 days ago
    .add(x, "w") // x represents weeks
    .add(y, "d") // y represents days in the week
    .add(random.int(0, 23), "h"); // Add random hour
  const date = dateObj.isAfter(now) ? now.format() : dateObj.format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);
