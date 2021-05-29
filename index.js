const bookmark = document.querySelector(".bookmark");

// change color of bookmark button to indicate bookmarked
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