var auth = firebase.auth();
var google = new firebase.auth.GoogleAuthProvider();
var user;
var db = firebase.database();

auth.onAuthStateChanged(onAuth);
$('#btLogin').click(onLogin);
$('#btLogout').click(onLogout);



function onAuth(r) {
	user = r;
	if(r) {
		$('.header').html('<p>'+user.uid+'</p>');
		dbInit();
	}
	else {
		$('.header').html('');
		$('.wrapper').html('');
	}
}

function onAdd(r) {
	var html = '<p id="'+r.key+'">'+r.val().title+'&nbsp;';
	html += '<i onclick="onDelete(this);">삭제</i></p>';
	$('.wrapper').prepend(html);
}

function onDelete(el) {
	var key = $(el).parent().attr('id');
	db.ref('root/sample/'+key).remove();
}

function onRev(r) { //r:지워진 데이터
	$('#'+r.key).remove();
}

function onSubmit(f) {
	
	var data = {
		title: f.title.value,
		content: '테스트입니다.',
		createdAt: new Date().getTime()
	}
	if(f.title.value !== '') db.ref('root/sample').push(data);
	f.title.value = '';
	return false;
}

function dbInit() {
	db.ref('root/sample').on('child_added', onAdd);
	db.ref('root/sample').on('child_removed', onRev);
}

function onLogin() {
	auth.signInWithPopup(google);
}
function onLogout() {
	auth.signOut();
}