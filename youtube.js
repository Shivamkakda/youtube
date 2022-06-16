// youtube clone
let searchedResult = document.getElementById("searchedResult");
let mainContainer = document.getElementById("mainContainer");

var globalData;


async function ytAPICall(){
    let query = document.getElementById("searchKeyword").value;

    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let dFatched = await res.json();
    globalData = dFatched.items
    console.log("fdata: ", dFatched.items);
    return (dFatched.items);
   
}

let timerId;
function debounce(keyword, delay){
    if(timerId){
        clearTimeout(timerId);
    }

    if(keyword.length === 0){
        searchedResult.style.display = "none";
        return false;
    }

    timerId = setTimeout(function(){
        searchResult(keyword);
    }, delay)
}

async function searchResult(keyword){
    
    searchedResult.style.display = "flex";
    searchedResult.innerHTML = null;

    let res = await ytAPICall(keyword);

    res.forEach(({snippet:{title}, videoElement}) => {
        let div =  document.createElement("div");
        div.setAttribute("class", "searchedResultP");
        div.onclick = () => {
            showSearch();
        }

        let title_name = document.createElement("p");
        title_name = title;

        div.append(title_name);

        searchedResult.append(div);
    });
}

function showSearch(){
    // searchedResult.innerHTML = null;
    searchedResult.style.display = "none";
    
    mainContainer.innerHTML = null;

    mainContainer.setAttribute("id", "mainContainerSecoundry");

    globalData.forEach(({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) =>{
        let div = document.createElement("div");
        div.setAttribute("class", "apibox");

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" width="380" height="220" allow="fullscreen"></iframe>`;

        let titlebox = document.createElement("div");
        titlebox.setAttribute("class", "titlebox");

        let title_div = document.createElement("div");
        title_div.setAttribute("class","title_div");
        let video_title = document.createElement("p");
        video_title.innerText = title;
        title_div.append(video_title);

        let channelBox = document.createElement("div");
        channelBox.setAttribute("class", "channelBox");
        let channlename = document.createElement("p");
        channlename.innerText = channelTitle;

        let img = document.createElement("img");
        img.src="https://img.icons8.com/ios-glyphs/20/000000/checked--v1.png";
        channelBox.append(channlename, img);

        titlebox.append(title_div, channelBox);

        div.append(vidDiv, titlebox);
        mainContainer.append(div);
    });
}

async function mostPopularVideo(){
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?type=video&key=AIzaSyDppDIBLwWIeHL6RICPfthgiBrxo5AQMKE&maxResults=20&safeSearch=strict&videoCaption=closedCaption&part=snippet&chart=mostPopular&regionCode=IN`);

    let data = await res.json();
    showvid(data.items);
}
function showvid(data){
    
    mainContainer.innerHTML = null;

    console.log("Data: ", data)

    data.forEach( ({id:{videoId}, snippet:{title}, snippet:{channelTitle}}) => {
        let div = document.createElement("div");
        div.setAttribute("class", "videoAPIBox")
        // console.log(id, snippet);

        let vidDiv = document.createElement("div");
        vidDiv.innerHTML = `<iframe src=https://www.youtube.com/embed/${videoId} title="YouTube video" frameBorder="0" width="280" height="200" allow="fullscreen"></iframe>`;

        let title_div = document.createElement("div");
        title_div.setAttribute("class","title_div");
        let video_title = document.createElement("p");
        video_title.innerText = title;
        title_div.append(video_title);

        let channelBox = document.createElement("div");
        channelBox.setAttribute("class", "channelBox");
        let channlename = document.createElement("p");
        channlename.innerText = channelTitle;

        let img = document.createElement("img");
        img.src="https://img.icons8.com/ios-glyphs/20/000000/checked--v1.png";
        channelBox.append(channlename, img);

        div.append(vidDiv, title_div, channelBox);
        mainContainer.append(div);
    })
}

mostPopularVideo();
// login window
var modal = document.getElementById("myModal")
var span = document.getElementsByClassName("close")[0]

function signIn(){
        modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
  }
// signup window
var modal2 = document.getElementById("myModal2")
var span2 = document.getElementsByClassName("close2")[0]

function signUp(){
        modal2.style.display = "block";
}
span2.onclick = function() {
    modal2.style.display = "none";
  }
      // signup
      function Signup(e){

        e.preventDefault()

        let form = document.getElementById("signup-form")

        let user_data ={
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            username: form.username.value,
            mobile: form.mobile.value,
            description: form.description.value,

        };


        user_data = JSON.stringify(user_data);

        fetch( "https://masai-api-mocker.herokuapp.com/auth/register",{


            method: "POST",

            body: user_data,

            headers:{
                "Content-Type":"application/json",
            },

        })
            .then ((res) =>{
                return res.json()
            })
            .then((res) =>{
                console.log("res:", res);
                location.href = "youtube.html"
            })
            .catch((err) => {
                alert(err)
            })
    }
    // login
    
    function Login(e){
        var acc = document.getElementById("btn1")

        e.preventDefault()

        let form = document.getElementById("Lform")

        let user_data ={

            username: form.user.value,

            password: form.pass.value,
     

        };


        let data_to_send = JSON.stringify(user_data);

        fetch( "https://masai-api-mocker.herokuapp.com/auth/login",{


            method: "POST",

            body: data_to_send,

            headers:{
                "Content-Type":"application/json",
            },

        })
            .then ((res) =>{
                return res.json()
            })
            .then((res) =>{

                fetchmyData (user_data.username, res.token)
            })
            .catch((err) => {
                console.log("err:",err)
            })


    }

    function fetchmyData (username, token){
        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
            headers: {
                "Content-Type":"application/json",
                
                Authorization: `Bearer ${token}`,
            },
        })
        .then ((res) =>{
                return res.json()
            })
            .then((res) =>{
                console.log("res:", res);
                location.href ="youtube.html"
            })
            .catch((err) => {
                console.log("err:",err)
               
            })

    }