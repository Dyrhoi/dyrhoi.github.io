

var ageTexts = document.getElementsByClassName("age-calc");
for (var i = 0; i < ageTexts.length; i++) {
   ageTexts.item(i).innerHTML = getAge("1998-05-17");
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}