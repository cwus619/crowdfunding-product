// main function
function main(){
    const bookmark = document.querySelector(".bookmark");
    const products= document.querySelectorAll(".product");
    const modalProducts = document.querySelectorAll(".product-modal");
    // const backProjectBtns = document.querySelectorAll(".reward-btn");
    const backProjectBtns = document.querySelectorAll(".reward-btn");
    outOfStock(products, modalProducts);
    bookmarkPage(bookmark);    
    modalBoxControl(backProjectBtns)
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
            console.log(`Remainder is: ${mRemainder.innerHTML}`)
            const radioBtn = mProduct.children[0].children[0];
            console.log(mProduct.children[0].children[2])
            mProduct.style.opacity = "0.4";
            radioBtn.disabled = "true";
        }
    }
}

// change color of bookmark button to indicate bookmarked
function bookmarkPage(bookmark){
    bookmark.addEventListener("click", function(){
        console.log("Bazinga");
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

const backProjectBtns = document.querySelectorAll(".reward-btn");

// modal box control

function modalBoxControl(backProjectBtns){
    for (let backBtn of backProjectBtns){
        backBtn.addEventListener("click", function(){
            document.querySelector(".modal-bg").style.display = "flex";
        })
    }
}

// call functions
main();
