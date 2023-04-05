const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

const myForm = document.getElementById('myForm');
const  user = document.getElementById('name');
const email = document.getElementById('email');
const result = document.querySelector('#result');


const getRandomId = () => {
    let randomId = Math.floor(Math.random() * 1000);
    return randomId;
}

myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let id = getRandomId();

    
    const data = {
        id,
        name: user.value,
        email: email.value
    };
    create(data);
})

/* create logic */
function create(user) {
    let extItem = users.find((item) => item.email === user.email);
    console.log('user =', user);
    console.log('ext user =', extItem);

         if (extItem) {
            alert("User is already registered, Email exists.");
        } else {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            printInTable();
            alert("user created successfully");
            window.location.href = "/Javascript/project-2/index.html";
        }
}

/* print in Table */
function printInTable() {

    users.forEach(item => {
        let tr = document.createElement('tr');
        let id = document.createElement('td');
        let name = document.createElement('td');
        let email = document.createElement('td');
        let action = document.createElement('td');

        id.textContent = item.id;
        name.textContent= item.name;
        email.textContent = item.email;
        action.innerHTML = `<button onclick='edit(this)' class='edit'>Edit</button> <button onclick='deleteUser(${item.id})' class='delete'>Delete</button>`;

        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(email);
        tr.appendChild(action);

        result.appendChild(tr);
    });
}

printInTable();


/* delete logic */
function deleteUser(id) {
    let index = users.findIndex((item) => item.id === id);
        console.log('index = ', index);

        if(window.confirm(`Are you sure to delete user id = ${id}?`)) {
             users.splice(index,1);
            
            localStorage.setItem('users', JSON.stringify(users));
            alert('user deleted successfully'); 
            window.location.href = "/Javascript/project-2/index.html";
        } else {
            return;
        }
}


/* update logic */
function edit(e) {
    let selUser = e.parentElement.parentElement;
    let id = selUser.children[0].innerHTML;
    console.log('selUser =', selUser.children[0].innerHTML);
    user.value = selUser.children[1].innerHTML;
    email.value = selUser.children[2].innerHTML;

    let index = users.findIndex((item) => item.id == id);
    users.splice(index,1);
    localStorage.setItem('users', JSON.stringify(users));
} 
