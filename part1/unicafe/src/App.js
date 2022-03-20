import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value, postfix }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {postfix}
      </td>
    </tr>
  );
};

const Statistics = ({ statistics }) => {
  const { good, neutral, bad } = statistics;

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  const format = (value) => value.toFixed(1);

  if (!total) return <h3>No Feedback Given</h3>;

  return (
    <div>
      <br />
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={format(average)} />
          <StatisticLine text="Positive" value={format(positive)} postfix="%" />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="Good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      </div>
      <div>
        <Statistics statistics={{ good, neutral, bad }} />
      </div>
    </div>
  );
};

export default App;
