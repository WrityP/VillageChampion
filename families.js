var families = new Array(); // Create the empty family directory

// Family class
var Family = function(weapon_id){
	this.id = families.length;
	this.name = createFamilyName();
	this.weapon_id = weapon_id;

	families.push(this);
}

Family.prototype.getWeapon = function(){
	return weapons[this.weapon_id];
}

Family.prototype.getName = function(){
	name = capitalize((this.name));
	keys = ['FAMILY_ID','FAMILY_NAME'];
	values = [this.id,name];
	return fillTemplate('#template_family_name',keys,values);
}

// Fill the family directory with different weapons for each
weapon_ids = new Array();
for(i = 0; i < weapons.length; i++){weapon_ids.push(i);}
for(i = 0; i < 3; i++){
	weapon_id = randomItem(weapon_ids);
	weapon_ids.splice(weapon_ids.indexOf(weapon_id),1);
	new Family(weapon_id);
}