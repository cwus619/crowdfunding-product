const navBg = document.querySelector(".nav-bg")
const navImg = document.querySelector(".nav-img")

console.log(navBg.style.width)


// main function
function main(){
    // makeshift "database"
    let productCount = {
        "Bamboo Stand":101,
        "Black Edition Stand":64
    }

    // variables require by functiosn
    const bookmark = document.querySelector("#bookmark");
    const mobBookmark = document.querySelector("#bookmark-mobile")
    const products = document.querySelectorAll(".product");
    const modalProducts = document.querySelectorAll(".product-modal");
    const backProjectBtns = document.querySelectorAll(".reward-btn");
    const closeBox = document.querySelector(".close");
    

    outOfStock(products, modalProducts);
    bookmarkPage(bookmark, mobBookmark);    
    modalBoxControl(backProjectBtns, closeBox);
    radioForm(productCount, products, modalProducts);
    closeSuccess();
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
        const mRemainder = mProduct.children[2].children[0];
        if (mRemainder.innerHTML === "0"){
            const radioBtn = mProduct.children[0].children[0];
            mProduct.style.opacity = "0.4";
            radioBtn.disabled = "true";
        }
    }
}

// change color of bookmark button to indicate bookmarked
function bookmarkPage(bookmark, mobBookmark){
    bookmark.addEventListener("click", function(){
        showBookmarked(bookmark, mobBookmark);
    })
    mobBookmark.addEventListener("click", function(){
        showBookmarked(bookmark, mobBookmark);
    })
}

function showBookmarked(bookmark, mobBookmark){
    const bookmarkIcon = document.querySelectorAll(".bookmark-icon") 
    const circle =  bookmarkIcon[0].children[0].children[0];
    const mobCircle = bookmarkIcon[1].children[0].children[0];
    const path = bookmarkIcon[0].children[0].children[1];
    const mobPath = bookmarkIcon[1].children[0].children[1];
    const bookmarkText = document.getElementById("bookmark-text")
    if (bookmark.style.color === ""){
        bookmark.style.color = "hsl(176, 50%, 47%)";

        circle.style.fill = "hsl(176, 50%, 47%)";
        mobCircle.style.fill = "hsl(176, 50%, 47%)";
        path.style.fill = "#FFFFFF";
        mobPath.style.fill = "#FFFFFF";

        bookmarkText.innerText = "Bookmarked";
    } else{
        bookmark.style.color = "";
        
        circle.style.fill = "#2F2F2F";
        mobCircle.style.fill = "#2F2F2F";
        path.style.fill = "#B1B1B1"
        mobPath.style.fill = "#B1B1B1";
        bookmarkText.innerText = "Bookmark";
    }
}

// modal box control
function modalBoxControl(backProjectBtns, close){
    for (let backBtn of backProjectBtns){
        backBtn.addEventListener("click", function(){
            document.querySelector(".modal-bg").style.display = "flex";
        })
    }
    close.addEventListener("click", function(){
        document.querySelector(".modal-bg").style.display = "none";
    })
}

// radio form check
function radioForm(productCount, products, modalProducts){
    const formCheckInputs = document.querySelectorAll(".form-check-input")
    const productForms = document.querySelectorAll(".pledge-form");
    const pledgeEntryBoxes = document.querySelectorAll(".pledge-entry");
    for (let check of formCheckInputs){
        // Stored children of check in array
        const childElements = check.parentNode.children 
        
        // take final child element of check which is pledge-entry 
        const pledgeEntry = check.parentNode.children[childElements.length-1];
        
        $(document).ready(function(){
            $(check).click(function(){
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
            
            // decrement remaining product count
            if (form.id){
                productCount[form.id] = productCount[form.id]-1;
                for (let product of products){
                    if (product.children[0].children[0].innerHTML === form.id){
                        product.children[2].children[0].children[0].innerText = productCount[form.id];
                    }
                }
                for (let modalProduct of modalProducts){
                    // console.log(modalProduct.children[3].children[0].innerText)
                    if (modalProduct.children[1].children[0].children[0].innerText === form.id){
                        modalProduct.children[3].children[0].innerText = productCount[form.id];
                        console.log(productCount[form.id]);
                    }
                }
            }
            e.preventDefault();
            closePledges(pledgeEntryBoxes);
            success();
            increaseBackers()
            incrementCurrent(form);               
            // success();
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

// Put into a function
const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
hamburger.addEventListener("click", function(){
    console.log("HAMBURGER CLICKED!");
    document.querySelector(".menu-bg").style.display="flex";
    // hamburger.style.display="none";
})
closeMenu.addEventListener("click", function(){
    document.querySelector(".menu-bg").style.display="none";
    // hamburger.style.display="initial";
})

main();
