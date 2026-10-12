// let users = [
//     { name: "John", age: 30, city: "New York" },
//     { name: "Jane", age: 25, city: "Los Angeles" },
//     { name: "Mike", age: 35, city: "Chicago" },
//     { name: "Emily", age: 28, city: "Houston" },
//     { name: "David", age: 32, city: "Phoenix" }
// ];
// usersList.innerHTML = users.map(user => `<li>${user.name}, ${user.age}, ${user.city}</li>`).join('');

const usersList = document.getElementById("usersList");
const loadUsers = document.getElementById("loadUsersBtn");
const apiStatus = document.getElementById("status");

async function fetchUsers() {
    loadUsers.disabled = true;
    apiStatus.textContent = "Loading users...";
    usersList.replaceChildren();

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        if (!Array.isArray(users) || users.length == 0) {
            apiStatus.textContent = "No data found!";
            return;
        }
        displayUsers(users);
        apiStatus.textContent = `${users.length} users loaded successfully.`;
    } catch (error) {
        console.error("Error fetching users:", error);
        apiStatus.textContent = "Unable to load users. Please try again.";
    } finally {
        loadBtn.disabled = false;
    }
}

function displayUsers(users) {
    usersList.replaceChildren();

    users.forEach(user => {
        const li = document.createElement("li");

        const name = document.createElement("strong");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = user.email;

        const city = document.createElement("p");
        city.textContent = user.address?.city ?? "City unavailable";

        li.append(name, email, city);
        usersList.appendChild(li);
    });
}

loadUsers.addEventListener("click", fetchUsers);
