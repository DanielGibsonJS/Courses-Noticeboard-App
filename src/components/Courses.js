import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Courses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      // Loading animation before API call finishes
      isLoading: false,
    }
  }

  /* When page first loads - Do this: */
  componentDidMount() {

    this.setState({isLoading: true})
    /* Fetch the list of courses from the API using axios */    
    axios
      .get('https://database-courses-noticeboard.herokuapp.com/api/courses/')
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      /* Catch errors - Check if server error = push to /error page */
      .catch(err => {
        if (err.response.status === 500) {
          console.error('Error fetching and parsing data', err);
          this.props.history.push('/error');
        } else {
          this.props.history.push('/notfound');
        }
      })
      .finally( () => { this.setState({isLoading: false}) });
  }

  render() {

    const { courses } = this.state;

    //  Loading API response  
    const {isLoading} = this.state;

    return (
      <div className="bounds">
        
        {isLoading === true &&
          <div className="loaderFlex"><div className="loader"></div></div>
        }

        {/* Loop over every course and display the course title on each card */}
        {courses.map((course, index) => (
          <div className="grid-33" key={index}>
            <Link className="course--module course--link" to={"/courses/"+course.id}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        ))}
        
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Courses;
