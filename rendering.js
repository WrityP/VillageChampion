var fillTemplate = function(id,keys,values) {
	template = $('#templates').find(id).html(); // Get html from the template
    keys.forEach(function(key,index){
		template = template.replace(new RegExp('{'+key+'}','ig'),values[index]); // Fill the template
	});
	return template; // Return filled template
}

var createSwitchable = function(switchable_id,id,keys,values,switch_too = 0) {
	switchable = $('#switchables').find(switchable_id).children().first().clone(); // Get clone from the element
	option_template = switchable.children().clone(); // Get option clone
	switchable.html(''); // Empty switchable
	if(switch_too !== 0){switchable.data('switch-too',switchable.clone().addClass('switching'));}
	switchable.addClass(id);
	switchable.addClass('switchable');
    keys.forEach(function(key,index){
    	option = option_template.clone();
    	if(switch_too !== 0){
    		option.html(switch_too[index].trim());
    		switchable.data('switch-too').append(option.clone());
    	}
    	option.data('value',key);
    	option.html(values[index]);
		switchable.append(option); // Fill the switchable
	});
	switchable.data('value',switchable.children().first().data('value'));
	return switchable; // Return filled switchable
}

var combat_logs = new Array(); // Create empty combat logs directory
var combat_log; // Current combat log

var combatLog = function(){
	this.id = combat_logs.length;
	this.results = $('<div><h3></h3><div></div></div>');
	this.results.children('div').toggle();
	combat_logs.push(this);
	return this;
}

combatLog.prototype.addResult = function(attacker_name,defender_name,attack_intensity){
	keys = ["ATTACKER_NAME","DEFENDER_NAME","ATTACK_INTENSITY"];
	values = [attacker_name,defender_name,this.getAttackIntensity(attack_intensity)];
	$(this.results).children('div').append(fillTemplate('#template_attack_result',keys,values));
}


combatLog.prototype.addWinner = function(winner_name,loser_name,victory){
	keys = ["WINNER_NAME","LOSER_NAME","VICTORY"];
	values = [winner_name,loser_name,victory];
	this.results.children('h3').html(fillTemplate('#template_victory',keys,values));
}

combatLog.prototype.getAttackIntensity = function(attack_intensity){
	saturation = 25+Math.ceil(attack_intensity/attack_intensities.length*75);
	lightness = 90-Math.ceil(attack_intensity/attack_intensities.length*40);
	return fillTemplate('#template_attack_intensity',['COLOR','TEXT'],['hsl(0,'+saturation+'%,'+lightness+'%)',attack_intensities[attack_intensity]]);
}

combatLog.prototype.sendResults = function(){
	this.results.contents().appendTo('#combat_logs');
}

// Switchables
var switchChild = function(element){
	current = $(element).children('*:visible');
	next = current.next().length ? current.next() : $(element).children().first();
	current.toggle();
	next.toggle();
	return next;
}
$(document).on('click','.switchable',function(){
	$(this).data('value',switchChild(this).data('value'));

	if($(this).data('switch-too')){switchChild($(this).data('switch-too'));}
});