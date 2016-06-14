

players = Lockr.get('players') || {};
currentPlayer = Lockr.get('current_player') || 'defaultplayer'
var stateModel = players[currentPlayer] || {
};

document.addEventListener('DOMContentLoaded', function () {
  var buffer = '',
      question = document.querySelector('#question'),
      buttons = document.querySelector('#buttons'),
      message = document.querySelector('#message'),
      randomRange = Questions.length - 1;

  stateModel.randomQuestionId = _.random(randomRange),

  setBackgroundAudio();
  setBackgroundVideo();
  renderQuestion(stateModel.randomQuestionId);
  updateHeader();
  startTimer(40, function(){
    stopBackgroundVideo();
    stopCustomSound();
    playCustomSound('sounds/mariodie.wav');
    $('#question, #options, #buttons').hide();
    $('#header').addClass('the-end');
  });

  players = _.toArray(players);
  players = _.sortBy(players, 'hits').reverse();
  _(players).each(function(player){
    if (player.hits && player.name) {
      buffer += '<li><span class="hits">'+player.hits+'</span>'+player.name+'</li>';
    }
  });
  $('#scores').html(buffer);


  $('#create-player').on('click', function(){
    name = $('#player-name').val();
    if (name && name.length > 2) {
      players = Lockr.get('players') || {};
      players[name] = {
        hits: 0,
        misses: 0,
        name: name
      };
      Lockr.set('current_player', name);
      Lockr.set('players', players);
      $.modal.close();
      location.reload();
    }
  });

  $(buttons).on('click', 'li', function(e){
    var selected = e.currentTarget,
        $question = $('#question'),
        $options = $('#options');

    stateModel.selectedAnswer = $(selected).attr('rel');
    stateModel.correctAnswer = Questions[stateModel.randomQuestionId].ans;

    if(stateModel.selectedAnswer == stateModel.correctAnswer){
      $question.addClass('right');
      stateModel.hits += 1;
      stateModel.message = 'Right';
      playCustomSound('sounds/coin.wav');

    } else {
      $question.addClass('wrong');
      stateModel.misses += 1;
      stateModel.message = 'Wrong';
      playCustomSound('sounds/powerdown.wav');
    }

    // pull players array
    players = Lockr.get('players') || {};
    // find this player
    players[Lockr.get('current_player')] = stateModel;

    // save players array
    Lockr.set('players', players);
    $question.text(stateModel.message);

    updateHeader();
    $options.html('');

    setTimeout(function(){
      $question.removeClass('right wrong');
      stateModel.randomQuestionId = _.random(randomRange);
      renderQuestion(stateModel.randomQuestionId);
    }, 1500);
  });



});
