//API call to fetch user details

export const getUser = async (userEmail) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/users/${userEmail}`);
        const user = await response.json();
        
        return user;
    } catch(error) {

        return error;
    }
}