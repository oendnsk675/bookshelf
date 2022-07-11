let STORAGE_KEY = 'BOOKSHELF'
let PREFERENCES_KEY = 'PREFERENCES'
let books = []; 

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
 }
  
 function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }

function composeBookObject(title, author, isComplete, timestamp) {
    return {
        id: +new Date(),
        title,
        author,
        isComplete,
        timestamp
    };
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }

function randerBookList(){
    const listUncompleted = document.getElementById(UNCOMPLETED_READ);
    let listCompleted = document.getElementById(COMPLETED_READ);

    
    for (book of books) {
        let id = book.id
        let title = book.title
        let author = book.author
        let timestamp = book.timestamp
        let isComplete = book.isComplete

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
}