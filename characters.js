var characters = new Array(); // Create the empty character directory

// Character class
var Character = function(family_id = -1,gender = roll(0,1)){
	this.id = characters.length;
	this.family_id;
	this.gender = gender;
	this.name = createName(this.gender);
	this.weapon;
	this.health = 30;

	if(family_id>-1){
		this.setFamily(family_id);
	}

	characters.push(this);
	return this;
}

Character.prototype.setFamily = function(family_id){
	this.family_id = family_id;
	this.weapon = families[family_id].getWeapon();
	return family_id;
}

Character.prototype.getFamily = function(){
	return families[this.family_id];
}
Character.prototype.setGender = function(gender){
	return this.gender = gender;
}

Character.prototype.setName = function(name){
	return this.name = name.slice(0,7);
}

Character.prototype.getName = function(){
	name = capitalize(this.name+gender_suffixes[this.gender]);
	keys = ['CHARACTER_ID','CHARACTER_NAME'];
	values = [this.id,name];
	template_name = (this.id == 0) ? '#template_player_name' : '#template_first_name';
	return fillTemplate(template_name,keys,values);
}

Character.prototype.getFullName = function(){
	return this.getFamily().getName() + ' ' + this.getName();
}

Character.prototype.getDescription = function(){
	k = ['CHARACTER_NAME','FAMILY_NAME','GENDER_PRONOUN','WEAPON_DESCRIPTION'];
	v = [this.getName(),this.getFamily().getName(),gender_pronoun[this.gender],this.getFamily().getWeapon().getDescription()];
	return fillTemplate('#template_character_description',k,v);
}

// Reset health, for the beginning of a fight
Character.prototype.resetHealth = function(){
	this.health = 30;
}

// Lose health, when taking damage
Character.prototype.loseHealth = function(value){
	this.health -= value;
}

// Attack another character
Character.prototype.attack = function(opponent){
	for(i = 0;i < this.weapon['strikes'];i++){
		if(Math.random()<0.6){ // 60% Accuracy roll
			damage = roll(1,this.weapon.attack-opponent.weapon.defense) // Damage roll
			opponent.loseHealth(damage); // Remove health
			combat_log.addResult(this.getFullName(),opponent.getFullName(),damage);
		}
	}
}

Character.prototype.duel = function(opponent){
	combat_log = new combatLog();
	initiator = Math.random() < 0.5;
	
	while(this.health>0 && opponent.health>0){
		if(initiator){this.attack(opponent);}
		else{opponent.attack(this);}
		initiator = !initiator;
	}
	if (this.health>0){
		combat_log.addWinner(this.getFullName(),opponent.getFullName(),'victory');
	}
	else{
		combat_log.addWinner(opponent.getFullName(),this.getFullName(),'loss');
	}
	combat_log.sendResults();
	this.resetHealth();
	opponent.resetHealth();
}

player = new Character(0); // Initiate player