// main function
function main(){
    const bookmark = document.querySelector(".bookmark");
    const products= document.querySelectorAll(".product");
    const modalProducts = document.querySelectorAll(".product-modal");
    const backProjectBtns = document.querySelectorAll(".reward-btn");
    const closeBox = document.querySelector(".close");
    
    outOfStock(products, modalProducts);
    bookmarkPage(bookmark);    
    modalBoxControl(backProjectBtns, closeBox);
    // radioForm(formCheckInputs, pledgeEntryBoxes, productForms);
    // success();
    closeSuccess()
}

// dynamically grey out any sold out items
function outOfStock(products, modalProducts){
    for (let product of products){
        const remaining = product.children[2].children[0].children[0];
        if (remaining.innerHTML === "0"){
            const heading = product.children[0].children[0];
            const button = product.children[2].children[1];
            // amend styling
            heading.style.color = "lightgrey";
            remaining.style.color = "lightgrey";
            button.style.backgroundColor = "lightgrey";
            button.disabled = "true";
            button.innerHTML = "Out of Stock";
        } 
    }
    
    for (let mProduct of modalProducts){
        const mRemainder = mProduct.children[0].children[3].children[0];
        if (mRemainder.innerHTML === "0"){
            const radioBtn = mProduct.children[0].children[0];
            mProduct.style.opacity = "0.4";
            radioBtn.disabled = "true";
        }
    }
}

// change color of bookmark button to indicate bookmarked
function bookmarkPage(bookmark){
    bookmark.addEventListener("click", function(){
        const bookmarkIcon = document.querySelector(".bookmark-icon") 
        const circle =  bookmarkIcon.children[0].children[0];
        const path = bookmarkIcon.children[0].children[1];
        if (bookmark.style.color === ""){
            bookmark.style.color = "hsl(176, 50%, 47%)";
            
            circle.style.fill = "hsl(176, 50%, 47%)";
            path.style.fill = "#FFFFFF";
        } else{
            bookmark.style.color = "";
            
            circle.style.fill = "#2F2F2F";
            path.style.fill = "##B1B1B1"
        }
    })
}

// modal box control
function modalBoxControl(backProjectBtns, close){
    for (let backBtn of backProjectBtns){
        backBtn.addEventListener("click", function(){
            document.querySelector(".modal-bg").style.display = "flex";
            console.log("You clicked me!")
            // radioForm(formCheckInputs, pledgeEntryBoxes, productForms)
            radioForm()
        })
    }
    close.addEventListener("click", function(){
        document.querySelector(".modal-bg").style.display = "none";
    })
}

// radio form check
function radioForm(){
    const formCheckInputs = document.querySelectorAll(".form-check-input")
    const productForms = document.querySelectorAll(".pledge-form");
    const pledgeEntryBoxes = document.querySelectorAll(".pledge-entry");
    for (let check of formCheckInputs){
        const pledgeEntry = check.parentNode.parentNode.children[2];
        $(document).ready(function(){
            $(check).click(function(){
                console.log(pledgeEntry)
                if (check.checked){
                    closePledges(pledgeEntryBoxes);
                    // display only selected pledgeEntry
                    pledgeEntry.style.display = "flex";
                }
            })
        })          
    }
    for (let form of productForms){
        form.addEventListener("submit", function(e){
            closePledges(pledgeEntryBoxes);
            e.preventDefault();
            increaseBackers()
            incrementCurrent(form);               
            success();
        })
    }
}

// loop over all pledgeEntryBoxes to close them
function closePledges(pledgeEntryBoxes){
    for (let pledgeBox of pledgeEntryBoxes){
        pledgeBox.style.display = "none";
    } 
}

// open success message once form submitted
function success(){
    document.querySelector(".modal-bg").style.display = "none";
    document.querySelector(".success-bg").style.display = "flex";
}

function closeSuccess(){
    document.querySelector(".got-it").addEventListener("click", function(){
        document.querySelector(".success-bg").style.display = "none";
    })
}

function increaseBackers(){
    // increment backers
    let backers = document.querySelector("#backers");
    let backerCount = backers.innerText
    
    // remove comma then increment - consider regex
    backerCount = backerCount.split(",").join("");
    backerCount++;

    // reinsert comma
    backerCount = backerCount.toLocaleString("en-US");
    backers.innerHTML = backerCount;
}

function incrementCurrent(form){
    // donation to add to tracker
    let donation = parseInt(form.children[0].value);
    
    // get current donated amount and progress bar value
    let current = document.querySelector("#current");
    let progress = document.querySelector("#progress-bar")

    // convert current to number and add donation 
    let currentValue = parseInt(current.innerHTML.split(",").join(""));
    currentValue += donation;

    // update progress bar
    progress.value = currentValue;

    // change number format to locale and add back into document
    currentValue = currentValue.toLocaleString();
    current.innerHTML = currentValue;
}


main();
