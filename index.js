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
            if (event.keyCode === 13) {
                event.preventDefault();
				string="";
				search();
			}
});
const search = () => {
let query="";
let  headerinputfield  = document.getElementById("search");
let imageinputfield=document.getElementById("searchbar");
document.getElementById("myDIV").style.display="none";
document.getElementById("imagediv").innerHTML="";
  let photos = [];
  if( headerinputfield.value!=="")
  {
	  query= headerinputfield .value;
  }
  else if(imageinputfield.value!=="")
  {
	  query=imageinputfield.value;
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
const infiniteScroll = pagenumber => {
  let photos = [];
	fetch(`${apiRoot}/photos/?client_id=${accessKey}&page=${pagenumber}`)
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

const searchinfiniteScroll = pagenumber => {
	let query="";
  let photos = [];
	let headerinputfield = document.getElementById("search");
	let imageinputfield=document.getElementById("searchbar");
	if(string!=="")
  {
	  query=string;
  }
  else if(imageinputfield.value!=="")
  {
	  query=imageinputfield.value;
  }
  else if(headerinputfield.value!=="")
  {
	  query=headerinputfield.value;
  }
	fetch(`${apiRoot}/search/photos/?client_id=${accessKey}&query=${query}&page=${pagenumber}`)
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
let string="";
const Navsearch = (navvalue) => {
				string=navvalue;
				document.getElementById("myDIV").style.display="none";
document.getElementById("imagediv").innerHTML="";
  let photos = [];
  fetchdata(string);
};
let count=1;
window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
	  let headerinputfield=document.getElementById("search");
	  let imageinputfield=document.getElementById("searchbar");
count++;
if(headerinputfield.value==="" && imageinputfield.value==="" && string==="")
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