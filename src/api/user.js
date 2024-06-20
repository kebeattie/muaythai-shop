//API call to fetch user details

export const getUser = async (userEmail) => {
    try {
        const response = await fetch(`http://localhost:4001/users/${userEmail}`);
        const user = await response.json();
        
        return user;
    } catch(error) {

        return error;
    }
}