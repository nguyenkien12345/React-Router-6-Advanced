import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Navigate, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='home' element={<Navigate replace to='/'/>}></Route>

        <Route path='learn' element={<Learn/>}>
          <Route path='courses' element={<Courses/>}>
            <Route path=':courseId' element={<Course/>}/>
          </Route>
          <Route path='bundles' element={<Bundles/>}></Route>
        </Route>
        <Route path='study' element={<Navigate replace to='/learn'/>}></Route>

        <Route path='dashboard' element={<Dashboard/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

var courses = [
  { id: 1, name: 'React', price: 1000 },
  { id: 2, name: 'Angular', price: 1500 },
  { id: 3, name: 'NodeJS', price: 800 },
  { id: 4, name: 'C#', price: 770 },
  { id: 5, name: 'PHP', price: 900 },
];

function Home(){
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

function Learn(){
  return (
    <div>
      <h1>Learn</h1>
      <h4>All Courses Are Listed Here</h4>
      <Link className="btn btn-primary" to="courses">Courses</Link>
      <Link className="btn btn-success" to="bundles">Bundles</Link>
      <Outlet/>
    </div>
  )
}

function Courses(){
  return (
    <div>
      <h1>Courses List</h1>
      {courses?.map((course) => (
          <NavLink style={({isActive}) => {
            return {
              backgroundColor: isActive ? "yellow" : "pink",
              margin: "0px 10px"
            }}} 
          to={`${course.id}`} key={course.id}>
            {course.name}
          </NavLink>
      ))}
      <Outlet/>
    </div>
  )
}

function Course(){

  const navigate = useNavigate();

  const {courseId} = useParams();

  const course = courses?.find(course => course.id.toString() === courseId);

  useEffect(() => {
    if(!course)  navigate('/');
  },[courseId])

  return (
    <div>
      {course && 
        <div>
          <p>{course.id}</p>
          <p>{course.name}</p>
          <p>{course.price}</p>
          <button onClick={() => navigate('/dashboard', {state: JSON.stringify(course)})}>
            Buy This Course
          </button>
          <Link to="/dashboard" state={JSON.stringify(course)}>Dashboard</Link>
        </div>
      }
    </div>
  )
}

function Bundles(){
  return (
    <div>
      <h1>Bundles List</h1>
      <h1>Bundles Card</h1>
    </div>
  )
}

function Dashboard(){
  const location = useLocation();

  const course = JSON.parse(location.state);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{course.id}</p>
      <p>{course.name}</p>
      <p>{course.price}</p>
    </div>
  )
}

function NotFound(){
  return (
    <div>
      <h1>Not Found</h1>
    </div>
  )
}

