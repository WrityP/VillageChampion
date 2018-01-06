var consonants = ["b","c","d","f","h","j","k","l","m","n","p","q","r","s","t","v","w","x","z"]
var vowels = ["a","e","i","o","u","y",'ee','oo','ah','ou']

function capitalize(string){
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function createFamilyName(){
	return randomItem(consonants)+randomItem(vowels)+randomItem(consonants);
}


// Gender variables
var gender_suffixes = ['lon','la'];
var genders = ['male','female','neutral'];
var gender_pronoun = ['he','she','it'];
var gender_possessive_pronoun = ['his','her','its'];
// var sibling_gender = ['brother','sister'];

// Attack variables
var attack_frequencies = ['never','seldom','regularly','often','always'];
var attack_intensities = ['no','little','some','average','noticeable','remarkable','tremendous','devastating','awe-inspiring'];

function createName(){
	return ((Math.random()<0.5) ? randomItem(vowels)[0]+randomItem(consonants) : randomItem(consonants))+randomItem(vowels);
}

var hairs = ['dark-haired','blond-haired','red-haired'];
var size = ['tall','small'];