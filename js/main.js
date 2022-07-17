// =====Search Area===========//
const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    searchField.value= '';
    const error = document.getElementById('error');
    if(searchText == ''){
        error.innerText = "Please write something"; // error handling 
        const searchResult = document.getElementById('search-result');
        searchResult.textContent= '';
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then( data => displaySearchResult(data.data))
    }     
}

const displaySearchResult = data =>{
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    
    if(data.length === 0){
    error.innerText= 'No results found' // error handling
    }
    
    const searchResult = document.getElementById('search-result');
    searchResult.textContent= '';
    data.forEach( info=> {
        if((data.indexOf(info) < 20)){ // showing data not more than 20 
            error.innerText= ''; 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `<div class="card border-0">
            <img src="${info.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${info.phone_name}</h5>
                <p class="card-text text-center">${info.brand}</p>
            </div>
            <a onclick="loadPhoneDetail('${info.slug}')" href="#" class="btn btn-outline-success w-50 mx-auto my-3">Details</a>
            </div>
        
    `
    searchResult.appendChild(div);
    }
});
}
// =====Details of phone section=====//
const loadPhoneDetail = id => {
    
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res =>res.json()) // converting the response into json
    .then(data => displayPhoneDetail(data)) 
    

}

const displayPhoneDetail = data => { //loading data in a function
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    const releaseDate = (realDate) => {
        if (realDate === '') {
            return 'Relase Date Not Found';
        }
        else {
            return realDate;
        }
    }
        // ======== The Detail Card==========//    
    div.innerHTML = `
    <img src="${data.data.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body mb-3">
                  <h5 class="card-title">${data.data.name}</h5>
                  <ul>
                  <li><span class= "fw-bold">Chipset</span>: ${data.data.mainFeatures.chipSet}</li>
                  <li><span class= "fw-bold">Display Size</span>: ${data.data.mainFeatures.displaySize}</li>
                  <li><span class= "fw-bold">Memory</span>: ${data.data.mainFeatures.memory}</li>
                  <li><span class= "fw-bold">Storage</span>: ${data.data.mainFeatures.storage}</li>
                  <li><span class= "fw-bold">Sensors</span>: ${data.data.mainFeatures?data.data.mainFeatures.sensors:'sensor not found'}</li>
                  </ul>
                  <p class="card-text"><small class="text-muted">${releaseDate(data.data.releaseDate)}</small></p>
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Other specifications
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <ul>
                
                  <li><span class= "fw-bold">Bluetooth</span>: ${data.data.others?data.data.others.Bluetooth:'bluetooth not found '}</li>
                  <li><span class= "fw-bold">GPS</span>: ${data.data.others?data.data.others.GPS:'GPS not found'}</li>
                  <li><span class= "fw-bold">NFC</span>: ${data.data.others?data.data.others.NFC:'NFC not found'}</li>
                  <li><span class= "fw-bold">Radio</span>: ${data.data.others?data.data.others.Radio:'Radio not found'}</li>
                  <li><span class= "fw-bold">USB</span>: ${data.data.others?data.data.others.USB:'USB not found'}</li>
                  <li><span class= "fw-bold">WLAN</span>: ${data.data.others?data.data.others.WLAN:'WLAN not found'}</li>
                  
                </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
    `
    phoneDetails.appendChild(div);

}
// =====================================THE END========================================//
 
