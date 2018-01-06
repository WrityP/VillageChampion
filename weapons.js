var weapons = new Array(); // Create the empty weapon directory

// Weapon class
var Weapon = function(name,attack,defense,strikes){
	this.id = weapons.length;
	this.name = name;
	this.attack = attack;
	this.defense = defense;
	this.strikes = strikes;

	weapons.push(this);
}

Weapon.prototype.getDescription = function(){
	keys = ['WEAPON_ID','WEAPON_NAME','ATTACK_FREQUENCY','ATTACK_INTENSITY'];
	values = [this.id,this.name,attack_frequencies[this.strikes],attack_intensities[this.attack]];
	return fillTemplate('#template_weapon_description',keys,values);
}

// Fill the weapon directory
new Weapon('the sword and shield',4,2,1);
new Weapon('a couple of axes',4,0,2);
new Weapon('the spear',8,0,1);
new Weapon('two daggers',3,0,3);
new Weapon('the rapier',3,1,2);