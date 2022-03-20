import { useState } from "react";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  console.log(votes);

  const genRandomNum = () => parseInt(Math.random() * anecdotes.length);
  const nextAnecdote = () => {
    setSelected(genRandomNum());
  };
  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const popularAnecdoteId = () => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>
        {anecdotes[selected]} has {votes[selected]} votes.
      </p>
      <Button handleClick={vote} text="Vote" />
      <Button handleClick={nextAnecdote} text="Next Anecdote" />
      <br />
      <h2>Anecdote with most votes</h2>
      {!Math.max(...votes) ? (
        <p>None yet</p>
      ) : (
        <p>
          {anecdotes[popularAnecdoteId()]} has {votes[popularAnecdoteId()]}{" "}
          votes.
        </p>
      )}
    </div>
  );
};

export default App;
