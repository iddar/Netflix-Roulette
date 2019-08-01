const $box = document.querySelector('#box')
const $img = document.querySelector('#box img')
const $title = document.querySelector('#box .title')
const $goto = document.querySelector('#box .goto')
const $synopsis = document.querySelector('#box .synopsis')
const $loading = document.querySelector('.loading')

const randomUri = 'https://dbug.mx/random'

fetch(randomUri)
    .then(blob => blob.json())
    .then(({title, image, synopsis,netflixid} )=> {
        box.pseudoStyle('before', 'background-image', `url(${image})`)
        $img.src = image

        $title.innerHTML = title
        $synopsis.innerHTML = synopsis
        $goto.href = `https://netflix.com/title/${netflixid}`

        $img.onload = function () {
            $loading.classList.add('hidden')
            $box.classList.remove('hidden')
         }
    })


// pseudoStyle selector from:
// http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
const UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};