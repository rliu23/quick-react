type Course = {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseListProps {
  courses: Record<string, Course>
}

const CourseList = ({courses}: CourseListProps ) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Object.entries(courses).map(([id, course]) => (
      <li
        key={id}
        className="border rounded-sm p-4"
      >
        <div className="flex flex-col gap-2 h-full">
          <div className="text-lg">
            {course.term} CS {course.number}
          </div>

          <div className="flex-grow">{course.title}</div>

          <div className="flex-grow border-t border-gray-400"></div>
          {course.meets}
        </div>
      </li>
    ))}
  </ul>
);

export default CourseList;