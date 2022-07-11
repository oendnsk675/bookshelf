const UNCOMPLETED_READ = "uncompleted-book-list";
const COMPLETED_READ = "completed-book-list"; 
const TODO_ITEMID = "itemId";
let isSubmit = true
// let idBookEdited = 0;

function addBook(){
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const isComplete =  document.getElementById("isComplete").checked;
    const timestamp = document.getElementById("date").value
    

    const bookObject = composeBookObject(title, author, isComplete, timestamp);
    makeCotent(bookObject.id, title, author, isComplete, timestamp);
  
    books.push(bookObject);
    
    updateDataToStorage();
    clearForm();
}

function saveEditBook(){
    const id = document.getElementById("id-book").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isComplete =  document.getElementById("isComplete").checked;
    const timestamp = document.getElementById("date").value;

    let index = books.findIndex(book => book.id == id);
    books[index].title = title;
    books[index].author = author;
    books[index].isComplete = isComplete;
    books[index].timestamp = timestamp;

    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    data[index].title = title
    data[index].author = author
    data[index].isComplete = isComplete
    data[index].timestamp = timestamp
    const parsed = JSON.stringify(data);
    // console.log(parsed);
    localStorage.setItem(STORAGE_KEY, parsed);

    clearForm();

    isSubmit = true

    changeButtonSubmit()

    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const listCompleted = document.getElementById(COMPLETED_READ);
    listUncompleted.innerHTML = '';
    listCompleted.innerHTML = '';

    randerBookList();
}

function makeCotent(id, title, author, isComplete, timestamp) {
        const listUncompleted = document.getElementById(UNCOMPLETED_READ);
        let listCompleted = document.getElementById(COMPLETED_READ);

        let textCardComplete = 
            `<article class="book-item">
                <div class="book-item-left">
                    <h3>${limitText(title)}</h3>
                    <p class="author">Penulis: ${limitText(author)}</p>
                    <p class="year">Tahun: ${limitText(timestamp)}</p>
                </div>
                
                <div class="action">
                    <div onclick="uncheck(${id}, this)" class="check">
                        <svg class="invisible" xmlns="http://www.w3.org/2000/svg" width="17.749" height="17.749" viewBox="0 0 17.749 17.749"><path d="M8.874,0a8.874,8.874,0,1,0,8.874,8.874A8.875,8.875,0,0,0,8.874,0ZM7.95,12.788,4.622,9.561,6,8.187,7.95,10.04l4.173-4.277L13.5,7.136Z"/></svg>
                    </div>
                    <svg onclick="editBook(${id}, this)" class="edit" xmlns="http://www.w3.org/2000/svg" width="15.513" height="15.513" viewBox="0 0 15.513 15.513"><path d="M9.1,2.736.93,10.905,0,15.513l4.607-.93,8.171-8.17L9.1,2.736ZM2.4,12.362l-.549-.549,7.2-7.191L9.6,5.17Zm1.3,1.3-.549-.549,7.2-7.191.549.549ZM15.513,3.677,13.693,5.5,10.015,1.82,11.835,0Z"/></svg>
                    <svg onclick="deleteBook(${id}, this)" class="delete" xmlns="http://www.w3.org/2000/svg" width="14.791" height="17.749" viewBox="0 0 14.791 17.749"><path d="M14.572,17.749H4.219A1.48,1.48,0,0,1,2.74,16.27V4.437H16.051V16.27a1.48,1.48,0,0,1-1.479,1.479M7.916,7.4a.74.74,0,0,0-1.479,0v6.656a.74.74,0,1,0,1.479,0Zm4.437,0a.74.74,0,0,0-1.479,0v6.656a.74.74,0,1,0,1.479,0ZM16.79,3.7H2V2.219H6.437V1.109A1.111,1.111,0,0,1,7.546,0h3.7a1.111,1.111,0,0,1,1.109,1.109V2.219H16.79ZM7.916,2.219h2.958v-.74H7.916Z" transform="translate(-2)" fill-rule="evenodd"/></svg>
                </div>
            </article>`;
        
        let textCardUncomplete = 
            `<article class="book-item">
                <div class="book-item-left">
                    <h3>${limitText(title)}</h3>
                    <p class="author">Penulis: ${limitText(author)}</p>
                    <p class="year">Tahun: ${limitText(timestamp)}</p>
                </div>
                
                <div class="action">
                    <div onclick="check(${id}, this)" class="check">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.749" height="17.749" viewBox="0 0 17.749 17.749"><path d="M8.874,0a8.874,8.874,0,1,0,8.874,8.874A8.875,8.875,0,0,0,8.874,0ZM7.95,12.788,4.622,9.561,6,8.187,7.95,10.04l4.173-4.277L13.5,7.136Z"/></svg>
                    </div>
                    <svg onclick="editBook(${id}, this)" class="edit" xmlns="http://www.w3.org/2000/svg" width="15.513" height="15.513" viewBox="0 0 15.513 15.513"><path d="M9.1,2.736.93,10.905,0,15.513l4.607-.93,8.171-8.17L9.1,2.736ZM2.4,12.362l-.549-.549,7.2-7.191L9.6,5.17Zm1.3,1.3-.549-.549,7.2-7.191.549.549ZM15.513,3.677,13.693,5.5,10.015,1.82,11.835,0Z"/></svg>
                    <svg onclick="deleteBook(${id}, this)" class="delete" xmlns="http://www.w3.org/2000/svg" width="14.791" height="17.749" viewBox="0 0 14.791 17.749"><path d="M14.572,17.749H4.219A1.48,1.48,0,0,1,2.74,16.27V4.437H16.051V16.27a1.48,1.48,0,0,1-1.479,1.479M7.916,7.4a.74.74,0,0,0-1.479,0v6.656a.74.74,0,1,0,1.479,0Zm4.437,0a.74.74,0,0,0-1.479,0v6.656a.74.74,0,1,0,1.479,0ZM16.79,3.7H2V2.219H6.437V1.109A1.111,1.111,0,0,1,7.546,0h3.7a1.111,1.111,0,0,1,1.109,1.109V2.219H16.79ZM7.916,2.219h2.958v-.74H7.916Z" transform="translate(-2)" fill-rule="evenodd"/></svg>
                </div>
            </article>`;

        if (isComplete) {
            listCompleted.insertAdjacentHTML('beforeend', textCardComplete)
        } else {
            listUncompleted.insertAdjacentHTML('beforeend', textCardUncomplete)
        }
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isComplete").checked = false;
    document.getElementById("date").value = ""
}

function uncheck(id, elm) {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const listCompleted = document.getElementById(COMPLETED_READ);
    listUncompleted.innerHTML = '';
    listCompleted.innerHTML = '';
    let index = books.findIndex(book => book.id == id);
    books[index].isComplete = false
    elm.parentNode.parentNode.remove()
    
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    data[index].isComplete = false
    const parsed = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, parsed);

    randerBookList();
}

function check(id, elm) {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    const listCompleted = document.getElementById(COMPLETED_READ);
    listUncompleted.innerHTML = '';
    listCompleted.innerHTML = '';
    let index = books.findIndex(book => book.id == id);
    books[index].isComplete = true
    elm.parentNode.parentNode.remove()

    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    data[index].isComplete = true
    const parsed = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, parsed);

    randerBookList();
}

function deleteBook(id, elm) {
    const container_alert = document.querySelector('.container-alert') 
     
    alertMsg('Anda yakin ingin menghapus?').then(() => {
            // console.log('i love you');
            let index = books.findIndex(book => book.id == id);
            books.splice(index, 1)
            updateDataToStorage();
            elm.parentNode.parentNode.remove()
            
            container_alert.classList.add('hidden')
    }).catch(() => {
        container_alert.classList.add('hidden')
    })
}

function limitText(str) {
    if(str.length > 10) {
        return str.substring(0,10) + '..';  
    }
    return str
}

function pencarian(data) {
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    let listCompleted = document.getElementById(COMPLETED_READ);
    
    
    if (data.length != 0) {
        console.log('panjang');
        listUncompleted.innerHTML = '';
        listCompleted.innerHTML = '';
        for (let i = 0; i < books.length; i++) {
            console.log('hores');
            if (books[i].title.match(`(${data})`) || books[i].author.match(`(${data})`) || books[i].timestamp.match(`(${data})`)){
                console.log('baday');
            }else{
                books.splice(i, 1)
                i--;
            }
        }
        randerBookList();
    } else {
        listUncompleted.innerHTML = '';
        listCompleted.innerHTML = '';
        console.log('kosong');
        loadDataFromStorage()
        // randerBookList();
    }
}

function editBook(id, elm) {
    const elementParent = elm.parentNode.parentNode
    let index = books.findIndex(book => book.id == id);
    let book = books[index];

    document.getElementById("id-book").value = id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("isComplete").checked = book.isComplete;
    document.getElementById("date").value = book.timestamp;

    isSubmit = false

    changeButtonSubmit()
}

function changeButtonSubmit() {

    if (isSubmit) {
        const btn_edit = document.getElementById("btn-edit");
        const btn_submit = document.createElement("input");
        btn_submit.setAttribute('value', 'Tambah');
        btn_submit.setAttribute('id', 'btn-submit');
        btn_submit.setAttribute('type', 'submit');
        btn_edit.replaceWith(btn_submit);
    } else {
        const btn_submit = document.getElementById("btn-submit");
        const btn_update = document.createElement("input");
        btn_update.setAttribute('value', 'Edit');
        btn_update.setAttribute('id', 'btn-edit');
        btn_update.setAttribute('type', 'submit');
        btn_submit.replaceWith(btn_update);
    }

    
}

function alertMsg(msg) {
    const container_alert = document.querySelector('.container-alert') 
    const btn_yes = document.querySelector('.action-alert .yes')
    const btn_cancel = document.querySelector('.action-alert .cancel')

    container_alert.classList.remove('hidden')

    return new Promise((resolve, reject) => {

        btn_yes.addEventListener('click', function(){
            resolve()  
        })

        btn_cancel.addEventListener('click', function(){
            reject()
        })
    })
    
}