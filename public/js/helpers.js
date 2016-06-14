function startTimer(duration, callback) {
    var timer = duration, minutes, seconds;
    repeat = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#header #countdown').text(minutes + ":" + seconds);

        if (--timer < 0) {
            clearTimeout(repeat);
            callback();
        }
    }, 1000);
}

function setBackgroundAudio(){
  var backgroundAudio = document.getElementById('background-audio');
  backgroundAudio.src = 'backgrounds/'+_.random(1,4)+'.mp3';
  // backgroundAudio.volume = 0.05;
  backgroundAudio.loop = true;
  backgroundAudio.play();
}

function setBackgroundVideo(){
  var backgroundVideo = document.getElementById('backround-video');
  backgroundVideo.src = 'backgrounds/'+_.random(1,3)+'.mp4';
  backgroundVideo.loop = true;
  backgroundVideo.play();
}

function stopBackgroundVideo(){
  var backgroundVideo = document.getElementById('backround-video');
  backgroundVideo.pause();
}

function playCustomSound(soundEffect){
  audio = document.querySelector('audio#answers');
  audio.src = soundEffect;
  audio.play();
}

function stopCustomSound(soundEffect){
  $.each($('audio'), function () {
    this.pause();
  });

}

function renderQuestion(id){
  var buttonsContainer = document.querySelector('#buttons'),
      optionsContainer = document.querySelector('#options');

  question.innerHTML = Questions[id].q;
  abcd = ['A', 'B', 'C', 'D'];
  var buttons = abcd.map(function(letter, i){
      return "<li class='button' rel=" + i + ">" + letter + "</li>";
  }).join('');

  var options = Questions[id].options.map(function(opt, i){
      return "<li rel=" + i + ">" + abcd[i] + ' > ' + opt + "</li>";
  }).join('');

  buttonsContainer.innerHTML = buttons;
  optionsContainer.innerHTML = options
}

function updateHeader(){
  $('#header #name .text').text(stateModel.name);
  $('#header #right-answers .number').text(stateModel.hits);
  $('#header #wrong-answers .number').text(stateModel.misses);
}
