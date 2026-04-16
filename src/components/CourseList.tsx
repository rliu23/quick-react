import { useJsonQuery } from "../utilities/fetch";
import RadioControl from "./RadioControl";
import { useState } from "react";

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

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
  const [selected, setSelected] = useState('Fall');
  const [courseCart, setCourseCart] = useState<String[]>([]);
  const toggleCart = (id: string) => {
    setCourseCart(courseCart => toggleList(id, courseCart));
  };
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;
  //console.log(courseCart);
  const collection = json as courseCollection;
  const selectedCourses = selected === '' ? collection.courses : 
  Object.fromEntries(Object.entries(collection.courses).filter(([_, course]) => course.term === selected));
  return (
    <div>
    <RadioControl name="term" options={["Fall", "Winter", "Spring"]} selected={selected} setSelected={setSelected}/>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {Object.entries(selectedCourses).map(([id, course]) => (
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
            <input type="checkbox" onChange={() => toggleCart(id)} checked={courseCart.includes(id)}/>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default CourseList;