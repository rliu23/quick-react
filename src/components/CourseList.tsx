import { useJsonQuery } from "../utilities/fetch";
import RadioControl from "./RadioControl";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { checkCourseOverlap } from "../utilities/timeconflict";

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
  const [courseCart, setCourseCart] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleCart = (id: string) => {
    setCourseCart(courseCart => toggleList(id, courseCart));
  };
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!json) return <h1>No user data found</h1>;
  //console.log(courseCart);
  const collection = json as courseCollection;

  const selectedCourses = useMemo(() => {
  return selected === ''
    ? collection.courses
    : Object.fromEntries(
        Object.entries(collection.courses).filter(
          ([_, course]) => course.term === selected
        )
      );
  }, [collection.courses, selected]);
  //const selectedCourses = selected === '' ? collection.courses : 
  //Object.fromEntries(Object.entries(collection.courses).filter(([_, course]) => course.term === selected));
  const courseCartData = courseCart.map(id=>collection.courses[id]).filter(Boolean);
  const isConflicting = (id: string, course: Course) :
  boolean => {
    return courseCart.some(selectedCourseID => {
      if (selectedCourseID === id) {
        return false;
      }
      const selectedCourse = collection.courses[selectedCourseID];
      if (!course.meets) return false;
      return checkCourseOverlap(course.meets, selectedCourse.meets);
    })
  }
  return (
    <div>
    <div className="flex items-center justify-center gap-20">
      <RadioControl  name="term" options={["Fall", "Winter", "Spring"]} selected={selected} setSelected={setSelected}/>
      <button className="bg-blue-300 px-1 rounded" onClick={() => setIsOpen(true)}>
        See Courses in Cart
      </button>
    </div>
    <div className="py-3"></div>
    
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {courseCart.length === 0? (
          <p>There are no courses selected. Click the checkbox on a course to select courses.</p>
        )
        :
        (
          <ul>
            {courseCartData.map(course => {
              return (
                <p>CS {course.number}: {course.title} {course.meets}</p>
              );
            })}
          </ul>
        )
      }
    </Modal>
    <div></div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {Object.entries(selectedCourses).map(([id, course]) => (
        <li
          key={id}
          className={isConflicting(id, course) ? "opacity-30 border rounded-sm p-4" : "border rounded-sm p-4"}
        >
          <div className="flex flex-col gap-2 h-full">
            <div className="text-lg">
              {course.term} CS {course.number}
            </div>

            <div className="flex-grow">{course.title}</div>

            <div className="border-t border-gray-400"></div>
            {course.meets}
            <input type="checkbox" className={isConflicting(id, course) ? "hidden" : ""} onChange={() => toggleCart(id)} checked={courseCart.includes(id)}/>
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default CourseList;