const apiRoot = "https://api.unsplash.com";
const accessKey = "DUZJ4p_qKrFaihX9Wz5Elx8Td-2asj6K6vMQFADgY74";
const addToDom = photos => {
  photos.forEach(photo => {
    let el = document.createElement("div");
    el.classList.add('image-item');
    el.style.backgroundColor = photo.color;
    el.innerHTML =
      `<img src="${photo.urls.regular}=">
	  <div class="containerimg">
	  <img src="${photo.user.profile_image.small}=" class="imgcls">
	  <p class="para1">${photo.user.username}</p>
	  </div>
	  <div class="icondiv">
	  <button class="iconbtn"><i class='fas fa-arrow-down'></i>
	  </button>
	  <button class="iconbtn2"><i class="fa fa-heart"></i></button>
	  <button class="iconbtn3"><i class="fa fa-plus"></i></button>
	</div>
`;
	document.querySelector('.image-grid').appendChild(el);
  });
};
document.addEventListener('keypress', function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
				y="";
				search();
			}
});
const search = () => {
let query="";
let stmt = document.getElementById("search");
let stmt1=document.getElementById("searchbar");
document.getElementById("myDIV").style.display="none";
document.getElementById("imagediv").innerHTML="";
  let photos = [];
  if(stmt.value!="")
  {
	  query=stmt.value;
  }
  else if(stmt1.value!="")
  {
	  query=stmt1.value;
  }
  fetchdata(query);
}
function fetchdata(query){
	let photos=[];
	fetch(`${apiRoot}/search/photos/?client_id=${accessKey}&query=${query}&page=1`)
    .then((res) => {
    return res.json();
  })
    .then(data => {
		console.log(data);
    photos.push(...data['results']);
    addToDom(photos);

  })
    .catch( err => {
    console.log(err);
  });
};
const infiniteScroll = temp => {
  let photos = [];
	fetch(`${apiRoot}/photos/?client_id=${accessKey}&page=${temp}`)
    .then((res) => {
    return res.json();
  })
    .then(data => {
     console.log(data);
    photos.push(...data);
    addToDom(photos);

  })
    .catch( err => {
    console.log(err);
  });
};

const searchinfiniteScroll = temp => {
	let query="";
  let photos = [];
	let stmt = document.getElementById("search");
	let stmt1=document.getElementById("searchbar");
	if(y!="")
  {
	  query=y;
  }
  else if(stmt1.value!="")
  {
	  query=stmt1.value;
  }
  else if(stmt.value!="")
  {
	  query=stmt.value;
  }
	fetch(`${apiRoot}/search/photos/?client_id=${accessKey}&query=${query}&page=${temp}`)
    .then((res) => {
    return res.json();
  })
    .then(data => {
    photos.push(...data['results']);
    addToDom(photos);

  })
    .catch( err => {
    console.log(err);
  });
};
let y="";
const Navsearch = (x) => {
				y=x;
				document.getElementById("myDIV").style.display="none";
document.getElementById("imagediv").innerHTML="";
  let photos = [];
  fetchdata(y);
};
let count=1;
window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
	  let stmt=document.getElementById("search");
	  let stmt1=document.getElementById("searchbar");
count++;
if(stmt.value=="" && stmt1.value=="" && y=="")
{
    infiniteScroll(count);
}
else
{
	searchinfiniteScroll(count);
}
  }
});
infiniteScroll(count);
function toggleIcon(){
		var togglebtn=document.getElementById("mySidenav");
		togglebtn.classList.toggle("mystyle");
}
function toggleMenu(){
		var togglemenu=document.getElementById("mySidenav1");
		togglemenu.classList.toggle("mystyle");
}