function emptyResult(){
    let result = document.getElementsByClassName("results")[0];

    let resultTable = document.createElement('table');

    const header = ['Favorate', 'Track Name', 'Artist Name', 'Artist ID', 'Album Name', 'Album ID', 'Tags', 'Created Date', 'Recorded Date', 'Duration', 'Genre', 'Track ID']

    let row = document.createElement('tr');
    header.forEach( (head) => {
        let th = document.createElement('th');
        let text = document.createTextNode(head);

        th.appendChild(text);
        row.appendChild(th);
    })

    resultTable.appendChild(row);
    
    result.appendChild(resultTable);

    resultTable.className = 'resultList';
}

emptyResult();

let track = document.getElementById("track");
let artist = document.getElementById("artist");
let album = document.getElementById("album");

let reset = document.getElementById('reset');

let resultList = document.getElementsByClassName('resultList')[0];


track.addEventListener('input', async (x) => {   

    let value = track.value.toString();

    await fetch(`/track/${value}`)
    .then((res) => {
        return res.json()        
    })
    .then((data) => {
        const index = ['title', 'name', 'artistID' , 'albumTitle', 'albumID', 'tags', 'creationDate', 'recordDate', 'duration', 'genres', 'trackNum']

        if (document.getElementById(data.title)){
            return
        }

        let row = document.createElement('tr');

        let favorate = document.createElement('td');
        
        let btn = document.createElement('button');

        let btnText = document.createTextNode("Add to Favorate");
        
        btn.appendChild(btnText);
        btn.setAttribute('id', `${data.title} btn`)
        btn.className = 'FavBtn';
        btn.onclick = (event) => addFavorate(data.title, data);

        favorate.appendChild(btn)

        row.appendChild(favorate);
        
        index.forEach( (i) => {
            
            let rowData = document.createElement('td');
            let text = document.createTextNode(data[i]);
            rowData.setAttribute('id', `${i}`)
            rowData.appendChild(text);
            row.appendChild(rowData);
        })

        row.setAttribute('id', data.title);
        resultList.appendChild(row)
    })
})

artist.addEventListener('input', async (x) => {

    await fetch(`/track-artist/${artist.value}`)
    .then((res) => {
        return res.json()        
    })
    .then((data) => {
        const index = ['title', 'name', 'artistID' , 'albumTitle', 'albumID', 'tags', 'creationDate', 'recordDate', 'duration', 'genres', 'trackNum']

        if (document.getElementById(data.title)){
            return
        }

        let row = document.createElement('tr');

        let favorate = document.createElement('td');
        
        let btn = document.createElement('button');

        let btnText = document.createTextNode("Add to Favorate");
        
        btn.appendChild(btnText);
        btn.setAttribute('id', `${data.title} btn`)
        btn.className = 'FavBtn';
        btn.onclick = (event) => addFavorate(data.title, data);

        favorate.appendChild(btn)

        row.appendChild(favorate);
        
        index.forEach( (i) => {
            
            let rowData = document.createElement('td');
            let text = document.createTextNode(data[i]);

            rowData.setAttribute('id', `${i}`)

            rowData.appendChild(text);
            row.appendChild(rowData);
        })

        row.setAttribute('id', data.title);
        resultList.appendChild(row)
    })
})

album.addEventListener('input', async (x) => {


    await fetch(`/track-album/${album.value}`)
    .then((res) => {
        return res.json()        
    })
    .then((data) => {
        const index = ['title', 'name', 'artistID' , 'albumTitle', 'albumID', 'tags', 'creationDate', 'recordDate', 'duration', 'genres', 'trackNum']

        if (document.getElementById(data.title)){
            return
        }

        let row = document.createElement('tr');

        let favorate = document.createElement('td');
        
        let btn = document.createElement('button');

        let btnText = document.createTextNode("Add to Favorate");
        
        btn.appendChild(btnText);
        btn.setAttribute('id', `${data.title} btn`)
        btn.className = 'FavBtn';
        btn.onclick = (event) => addFavorate(data.title, data);

        favorate.appendChild(btn)

        row.appendChild(favorate);
        
        index.forEach( (i) => {
            
            let rowData = document.createElement('td');
            let text = document.createTextNode(data[i]);

            rowData.setAttribute('id', `${i}`)
            rowData.appendChild(text);
            row.appendChild(rowData);
        })

        row.setAttribute('id', data.title);
        resultList.appendChild(row)
    })
})

reset.addEventListener('click', () => {
    while (resultList.childElementCount > 1){
            resultList.removeChild(resultList.lastChild);
    }
    
    track.value = '';
    artist.value = '';
    album.value = '';

})

let fav = document.getElementsByClassName('fav')[0];

function addFavorate(title, data){

    if (document.getElementById(`fav-${title}`)){
        return
    }
  
    const index = ['title', 'name', 'albumTitle', 'duration'];

    let row = document.createElement('tr');

    let number = document.createElement('td');
        
    let btn = document.createElement('button');
    
    let btnText = document.createTextNode('Remove from Favorate');

    btn.onclick = (event) => removeFavorate(title);
    btn.appendChild(btnText);    
    
    number.appendChild(btn);
    row.appendChild(number);
        
    index.forEach( (i) => {
            
        let rowData = document.createElement('td');
        rowData.setAttribute('id', `fav-${i}`)
        let text = document.createTextNode(data[i]);
        
        rowData.appendChild(text);
        row.appendChild(rowData);
    })

    row.setAttribute('id', `fav-${title}`);
    fav.appendChild(row)
}

function removeFavorate(title){
    let row =  document.getElementById(`fav-${title}`);
    fav.removeChild(row);
}

let sortTrack = document.getElementById('sortTrack');
let sortTrack2 = document.getElementById('sortTrack2');
let sortAlbum = document.getElementById('sortAlbum');
let sortAlbum2 = document.getElementById('sortAlbum2');
let sortDuration = document.getElementById('sortDuration');

sortTrack.addEventListener('click', () => {
    
    let rows, j, x, y, shouldSwitch;

    let switching = true;

    while (switching){
        switching = false;
        
        rows = resultList.rows;

        for (j=1; j < (rows.length - 1); j++){
            shouldSwitch = false;
                       
            x = rows[j].getElementsByTagName('TD')[1];

            y= rows[j + 1].getElementsByTagName('TD')[1];

            if(x.innerText.toLowerCase() > y.innerText.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            rows[j].parentNode.insertBefore(rows[j+1], rows[j]);
            switching= true;
        }

    }
})

sortAlbum.addEventListener('click', () => {
    
    let rows, j, x, y, shouldSwitch;

    let switching = true;

    while (switching){
        switching = false;
        
        rows = resultList.rows;

        
        for (j=1; j < (rows.length - 1); j++){
            shouldSwitch = false;
                       
            x = rows[j].getElementsByTagName('TD')[4];

            y= rows[j + 1].getElementsByTagName('TD')[4];

            if(x.innerText.toLowerCase() > y.innerText.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            rows[j].parentNode.insertBefore(rows[j+1], rows[j]);
            switching= true;
        }

    }
})

sortDuration.addEventListener('click', () => {
    
    let rows, j, x, y, shouldSwitch;

    let switching = true;

    while (switching){
        switching = false;
        
        rows = fav.rows;

        for (j=1; j < (rows.length - 1); j++){
            shouldSwitch = false;
                       
            x = rows[j].getElementsByTagName('TD')[4];

            y= rows[j + 1].getElementsByTagName('TD')[4];

            if(x.innerText.toLowerCase() > y.innerText.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            rows[j].parentNode.insertBefore(rows[j+1], rows[j]);
            switching= true;
        }

    }
})

sortAlbum2.addEventListener('click', () => {
    
    let rows, j, x, y, shouldSwitch;

    let switching = true;

    while (switching){
        switching = false;
        
        rows = fav.rows;

        for (j=1; j < (rows.length - 1); j++){
            shouldSwitch = false;
                       
            x = rows[j].getElementsByTagName('TD')[3];

            y= rows[j + 1].getElementsByTagName('TD')[3];

            if(x.innerText.toLowerCase() > y.innerText.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            rows[j].parentNode.insertBefore(rows[j+1], rows[j]);
            switching= true;
        }

    }
})

sortAlbum2.addEventListener('click', () => {
    
    let rows, j, x, y, shouldSwitch;

    let switching = true;

    while (switching){
        switching = false;
        
        rows = fav.rows;

        for (j=1; j < (rows.length - 1); j++){
            shouldSwitch = false;
                       
            x = rows[j].getElementsByTagName('TD')[3];

            y= rows[j + 1].getElementsByTagName('TD')[3];

            if(x.innerText.toLowerCase() > y.innerText.toLowerCase()){
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch){
            rows[j].parentNode.insertBefore(rows[j+1], rows[j]);
            switching= true;
        }

    }
})