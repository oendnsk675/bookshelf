document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.querySelector(".form-input");
    const PREFERENCES = localStorage.getItem(PREFERENCES_KEY);
    const root = document.getElementsByTagName( 'html' )[0];
    const btn_darkmode = document.querySelector("#darkmode");

    if (PREFERENCES == 'dark') {
        root.classList.add('dark');
        btn_darkmode.checked = true
    }else{
        root.classList.remove('dark');
        btn_darkmode.checked = false
    }
    
    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        if (isSubmit) {
            addBook();
        } else {
            saveEditBook();
        }
    })

    
    btn_darkmode.addEventListener('change', function(){
        if (btn_darkmode.checked) {
            root.classList.add('dark');
            localStorage.setItem(PREFERENCES_KEY, 'dark');
        } else {
            localStorage.setItem(PREFERENCES_KEY, 'light');
            root.classList.remove('dark');
        }
    });

    const pencarian_input = document.getElementById('pencarian') 
    pencarian_input.addEventListener('keyup', function(){
        pencarian(pencarian_input.value)
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
})

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    randerBookList();
});

