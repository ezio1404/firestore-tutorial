
const cafeList= document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
//create element and render cafe
function renderCafe(doc){
    //creating html 
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross=document.createElement('div');

    //identifying the tag in the front end
    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    
    cafeList.appendChild(li);

    //dleeting data
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id=e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}
//retieving/getting data
// db.collection('cafes').orderBy('name').get().then((snapshot)=>{
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(doc=>{
//         // console.log(doc.data()); to grab data 
//         renderCafe(doc);
//     })
// })

//saving/adding data
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    });
    form.name.value='';
    form.city.value='';
})


//realtime listner
db.collection('cafes').orderBy('city').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
                renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li= cafeList.querySelector('[data-id= '+ change.doc.id+ ']');
            cafeList.removeChild(li);
        }
    });
});