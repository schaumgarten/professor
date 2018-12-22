import axios from 'axios';

//const base_url = 'http://localhost:3000/api';
const base_url = (window.location.hostname === "http://localhost:3001") ? "http://localhost:3000/api" : 'http://professor2018.herokuapp.com/api' ;

export const login = (auth,history) => {
    axios.post(`${base_url}/auth/login`, auth)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            history.push('/profile');
        })
        .catch(err => {
            console.error(err);
        })
};

export const register = (auth,history) => {
    axios.post(`${base_url}/auth/register`,auth)
        .then(res=> {
            console.log(res)
            history.push("/login")

        })
        .catch (err => {
            console.error(err);
        })
};

export const createCourse = (title,user) => {
   return axios.post(`${base_url}/courses/new`, {title, user})
        .then(res=> {
            console.log(res)
           //history.push("/profile")

        })
        .catch (err => {
            console.error(err);
        })
};

export const getCourses = (id) => {
    return axios.get(`${base_url}/courses/user/${id}`)

};

export const getAllCourses = () => {
    return axios.get(`${base_url}/courses/`)
};

export const joinCourse = (id, user, history) => {
    axios.post(`${base_url}/enrollments/join/${id}`,{user, history})
        .then(()=> {
            history.push("/profile")
        })
        .catch (err => {
            console.error(err);
        })
};

export const getUsers = () => {
    return axios.get(`${base_url}/auth/`)
};

export const patchRoles = (id,uroles) => {
    return axios.patch(`${base_url}/auth/${id}`,uroles);
};

/*export const getStudents = (id) => {
   return axios.get(`${base_url}/courses/course/${id}`)
       .then(res => console.log('======> ', res))
       .catch(err=>console.log(err))
        /!*.then(res => {
            const enrollments = res.data.enrollments;
            const students = []
            enrollments.forEach(enrollment => {
                students.push(enrollment._student)
            });
            console.log('=====>', students);
            return students;
        })
        .catch(err => {
            console.error(err);
        })*!/
};*/


