const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const totalExercises = (parts) => {
    return parts.reduce((tot, cur) => tot + cur.exercises, 0);
  };
  return (
    <div>
      <h2>{course.name}</h2>
      {course.parts
        ? course.parts.map(({ id, name, exercises }) => (
            <Part key={id} name={name} exercises={exercises}></Part>
          ))
        : ""}
      <p>Total of {totalExercises(course.parts)} exercises</p>
    </div>
  );
};
export default Course;
