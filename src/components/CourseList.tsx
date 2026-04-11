import { useJsonQuery } from "../utilities/fetch";

type Course = {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface courseCollection {
  courses: Record<string, Course>
}

const CourseList = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;

  const collection = json as courseCollection;
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(collection.courses).map(([id, course]) => (
        <li
          key={id}
          className="border rounded-sm p-4"
        >
          <div className="flex flex-col gap-2 h-full">
            <div className="text-lg">
              {course.term} CS {course.number}
            </div>

            <div className="flex-grow">{course.title}</div>

            <div className="border-t border-gray-400"></div>
            {course.meets}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CourseList;