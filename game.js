$(document).ready(function(){
	$('#data').load('./data.html',function(){$(document).trigger('all_loaded');}); // Load html data
});
/*
$.getScript('./numbers.js'); // Get custom mathematical functions
$.getScript('./words.js'); // Get custom vocabulary functions
$.getScript('./weapons.js'); // Get weapon class
$.getScript('./families.js'); // Get family class
$.getScript('./characters.js'); // Get characters class
$.getScript('./rendering.js'); // Get custom display functions
*/

$(document).on('all_loaded',function(){
	switchable_gender = createSwitchable('#switchable_span','gender',Object.keys(gender_suffixes),Object.values(gender_suffixes),gender_pronoun);
	families_to_switchable = families.map(function(value){return value.getName();});
	weapons_to_switchable = families.map(function(value){return value.getWeapon().getDescription();});
	switchable_family = createSwitchable('#switchable_span','family',Object.keys(families_to_switchable),Object.values(families_to_switchable),weapons_to_switchable);
	$('#character_creation').html(fillTemplate('#template_character_creation',['CHARACTER_BASENAME'],[player.name]));
	$('#character_creation .gender').replaceWith(switchable_gender);
	$('#character_creation .gender_pronoun').replaceWith(switchable_gender.data('switch-too'));
	$('#character_creation .family').replaceWith(switchable_family);
	$('#character_creation .weapon').replaceWith(switchable_family.data('switch-too'));

	$('#create_character').click(function(){
		family_ids = [0,1,2];
		family_ids.splice($('#character_creation .family').data('value')*1,1);
		opponent_1 = new Character(family_ids[0]);
		opponent_2 = new Character(family_ids[1]);
		
		player.setName($('#character_creation .character_basename').val());
		player.setGender($('#character_creation .gender').data('value')*1);
		player.setFamily($('#character_creation .family').data('value')*1);

		$('#character_creation,#create_character').remove();
		$('#character_created').html(player.getDescription());

		opponent_1.duel(opponent_2);
		player.duel(opponent_1);
		player.duel(opponent_2);

		$('#combat_logs').toggle();
	});
});

$(document).on('click','#combat_logs h3',function(){$(this).next().toggle('slide',{direction:'up'});});
