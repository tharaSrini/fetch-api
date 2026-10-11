// let users = [
//     { name: "John", age: 30, city: "New York" },
//     { name: "Jane", age: 25, city: "Los Angeles" },
//     { name: "Mike", age: 35, city: "Chicago" },
//     { name: "Emily", age: 28, city: "Houston" },
//     { name: "David", age: 32, city: "Phoenix" }
// ];
const usersList = document.getElementById("usersList");

// usersList.innerHTML = users.map(user => `<li>${user.name}, ${user.age}, ${user.city}</li>`).join('');

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        usersList.innerHTML = users.map(user => `<li>${user.name}, ${user.email}, ${user.address.city}</li>`).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

fetchUsers();   