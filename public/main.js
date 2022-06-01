document.querySelector('#saveQuote').addEventListener('click', createQuote)

document.querySelectorAll('.editButton').forEach(element => {
    element.addEventListener('click', showEditFields)
})

document.querySelectorAll('.deleteButton').forEach(element => {
    element.addEventListener('click', deleteQuote)
})

function showEditFields(event) {
    document.querySelectorAll('.editButton').forEach((element) => {
        element.style.display = 'none'
    })
    document.querySelectorAll('.deleteButton').forEach((element) => {
        element.style.display = 'none'
    })
    const _id = event.target.getAttribute('_id')
    event.target.insertAdjacentHTML('afterend', `<div id="editForm"><input type="text" name="_id" placeholder="_id" value="${_id}" hidden><input type="text" name="newName" placeholder="New Name"> <input type="text" name="newQuote" placeholder="New Quote"><button class="saveButton">Save</button><button class="cancelEdition">Cancel</button></div>`)
    document.querySelector('.saveButton').addEventListener('click', updateQuote)
    document.querySelector('.cancelEdition').addEventListener('click', removeEditForm)
}

function removeEditForm() {
    document.querySelectorAll('.editButton').forEach((element) => {
        element.style.display = 'inline-block'
    })
    document.querySelectorAll('.deleteButton').forEach((element) => {
        element.style.display = 'inline-block'
    })
    document.querySelector('#editForm').remove()
}

function createQuote() {
    const data = {
        name: document.querySelector('[name="name"]').value,
        quote: document.querySelector('[name="quote"]').value
    }
    fetch('/quote', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(result => {
        console.log(result)
        window.location.replace('/')
    })
    .catch(error => console.log(error))
}


function updateQuote() {
    const data = {
        _id: document.querySelector('[name="_id"]').value,
        name: document.querySelector('[name="newName"]').value,
        quote: document.querySelector('[name="newQuote"]').value,
    }
    fetch('/quote', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((result) => {
        console.log(result)
        window.location.replace('/')
    })
    .catch((error) => console.log(error))
}


function deleteQuote(event) {
    const quoteId = event.target.getAttribute('_id')
    fetch('/quote', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: quoteId
        })
    })
    .then(result => {
        console.log(result)
        window.location.replace('/')
    })
    .catch(error => console.log(error))
}