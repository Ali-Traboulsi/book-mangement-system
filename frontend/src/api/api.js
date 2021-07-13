import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from '../constants/apiConstants';

export const userLogin = async (state, setState, err) => {

    const userData = {
        "email": state.email,
        "password": state.password,
    };

    try {
        // invoke api
        const response = await axios.post(`${API_BASE_URL}/user/login`, userData, {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })

        if (response.status !== 201) return response.toJSON();

        console.log(response);

        setState(prevState => ({
            ...prevState,
            'successMsg': "Registration Successful! Redirecting to Home..."
        }));

        localStorage.setItem(ACCESS_TOKEN, response.data.token);
        // localStorage.setItem('id', response.data.data.id);
        // localStorage.setItem('email', response.data.data.email);

        return response

    } catch (err) {
        console.log(err)
    }

}

export const fetchBooks = async (state, setState) => {
    try {

        const response = await axios.get(`${API_BASE_URL}/books`);

        if (response.status !== 201) return response.toJSON();
        console.log(response);

        setState(prevState => ({
            ...prevState,
        }));

        return response;

    } catch (err) {
        console.log(err)
    }
}