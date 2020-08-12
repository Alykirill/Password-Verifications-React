export const sendData = async (username: string, password: string): Promise<any> => {
    const fetched = await fetch("http://localhost:8080/saveUserPassword", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: username, password: password})
    });

    return fetched.json();
}