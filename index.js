document.addEventListener("DOMContentLoaded", function() {
    const bookContainer = document.querySelector('.bookContainer')

    const bookURL = `http://localhost:3000/books`

    fetch(`${bookURL}`)
    .then( response => response.json() )
    .then( bookData => bookData.forEach(function(book) {
      bookContainer.innerHTML += `
      <div id=${book.id}>
        <h2>${book.title}</h2>
        <h4>Author: ${book.author}</h4>
        <img src="${book.imageCover}" width="333" height="500">
        <p>${book.description}</p>
        <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
        <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
      </div>`
    })) // end of book fetch

    const bookInputForm = document.querySelector('.bookInputForm');
    bookInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log(e.target);
        const title = document.querySelector('.title').value;
        const author = document.querySelector('.author').value;
        const imageCover = document.querySelector('.imageCover').value;
        const description = document.querySelector('.description').value;

        fetch(`${bookURL}`, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                author: author,
                imageCover: imageCover,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( response => response.json() )
        .then( book => {
          bookContainer.innerHTML += `
          <div id=${book.id}>
            <h2>${book.title}</h2>
            <h4>Author: ${book.author}</h4>
            <img src="${book.imageCover}" width="333" height="500">
            <p>${book.description}</p>
            <button data-id="${book.id}" id="edit-${book.id}" data-action="edit">Edit</button>
            <button data-id="${book.id}" id="delete-${book.id}" data-action="delete">Delete</button>
          </div>`
        }) // end of book fetch
    })

    // fetch(`${bookURL}`)
    

});