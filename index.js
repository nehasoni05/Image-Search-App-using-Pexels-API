const apikey="563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35"; //use the apikey you have generated
const input=document.querySelector("input");
const search_btn=document.querySelector(".search_btn");
const showmore_btn=document.querySelector(".showmore");

let page_num=1;
let search_text="";
let search=false;

input.addEventListener("input",(event)=>{
    event.preventDefault();
    search_text=event.target.value;
})

search_btn.addEventListener("click",()=>{
    if(input.value==="")
    {
        alert("Please enter the some text")
        return;
    }
    cleargallery();
    search=true;
    SearchPhotos(search_text,page_num);
})

function cleargallery(){
    document.querySelector(".display_images").innerHTML="";
    page_num=1;
}

async function CuratedPhotos(page_num){
    // fetch the data from api
    const data=await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,         //use the apikey you have generated
        },
    });
    const response=await data.json();     //convert the response to json 
    console.log(response);

    display_images(response);            // call the display_images method to display the images on page
}

function display_images(response){
    //use forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo=document.createElement("div");
        photo.innerHTML=`<img src=${image.src.large}>
        <figcaption> Photo By: ${image.photographer}📸</figcaption>`;
        document.querySelector(".display_images").appendChild(photo);
    });
}

async function SearchPhotos(query, page_num){
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response=await data.json();
    console.log(response);

    display_images(response);
}

showmore_btn.addEventListener("click", () => {
    if(!search){  
        page_num++;
        CuratedPhotos(page_num);
    }
    else{
        if(search_text.value==="")
        return;
        page_num++;
        SearchPhotos(search_text,page_num);
    }
})

CuratedPhotos(page_num);