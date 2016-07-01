var MAINJSON = [
  { "question": "What is the safest way to travel in avalanche terrain?", 
  "choices": 
  ["Close together",  
  "One at a time between islands of safety while watching each other",
  "Spread out and keeping as much distance between the group members as possible", 
  "Two by two. Can't beat the buddy system.", 
  "All alone"], 
  "correct": 1 },

  { "question": "What is the topographic feature shown on the map typically called?", "choices": ["Hanging valley", "Basin or bowl", "Crevasse", "Buttress", "Col or notch"], "correct": 4 },

  { "question": "Question 3?", "choices": ["Answer 1c", "Answer 2", "Answer 3", "Answer 4", "Answer 5"], "correct": 1 },

  { "question": "Question 4?", "choices": ["Answer 1d", "Answer 2", "Answer 3", "Answer 4", "Answer 5"], "correct": 2 },

  { "question": "Question 5?", "choices": ["Answer 1e", "Answer 2", "Answer 3", "Answer 4", "Answer 5"], "correct": 0 }
];

$(document).ready(function() { 
  generateQuiz(MAINJSON);

  function generateQuiz(json) {
    $.each(json, function(i, object) {
      var item = $('<li></li>');
        var header = $('<h1>'+ object.question +'</h1>');
        var questions = $('<ul></ul>');
      
      $.each(object.choices, function(i, value) {
        var klass = 'incorrect';

        if (i === object.correct)
          klass = 'correct';

        questions.append('<li class="'+ klass +'"> ['+ value +'] </li>');
      });

      item.attr('data-i', i);

      if (i !== 0)
        item.hide();
      
      item.append(header);
      item.append(questions);
      
      $('.list').append(item);
    });
    
    $('.correct').click(function() {
      var item = $(this).parents('li');
      var i = item.data('i');

      scoreTracker();

      $('.right').show();
      $('.next-button').show();

      $('.next-button').click(function() {
        item.next().show();
        item.eq(0).hide();
        $(this).hide();
        $('.right').hide();
      });

      $('.climber').animate({left: '+=37px', top: '-=70px'}, 800);

    });

    $('.incorrect').click(function() {
      var item = $(this).parents('li');
      var i = item.data('i');

      $('.wrong').show();
      $('.next-button').show();

      $('.next-button').click(function() {
        item.next().show();
        item.eq(0).hide();
        $(this).hide();
        $('.wrong').hide();
      });

      $('.climber').effect('shake', {times:6, distance:5, direction: 'up'}, 500 );

    });

    var counter = 1;
    var buttonClicks = 0;
    var correctCount = 0

    $('.next-button').click(function() {
    	buttonClicks++;

      if (counter < MAINJSON.length) {
        clickCount();
      } 
      if (counter == MAINJSON.length) {
        $('.button-text').replaceWith("See my results");
      }
     	if (buttonClicks == MAINJSON.length) {
	     quizScore();
	    }
      
 //reference image display
      if (counter == 2) {
        $('.reference-image-1').show();
      }
      if (counter != 2) {
        $('.reference-image-1').hide();
      }      
    });

    function clickCount() {   
      counter++;
      $('.question-number').html(counter);
    }

		function scoreTracker() {
	    correctCount++;
	    $('.correct-number').html(correctCount);
	    console.log(correctCount);
   	};

   	function quizScore() {
   		if (correctCount == (MAINJSON.length / MAINJSON.length) - 1) {
   			$('.zero').show();
   		}
   		else if (correctCount == MAINJSON.length / MAINJSON.length) {
   			$('.one').show();
   		}
   		else if (correctCount == 2) {
   			$('.two').show();
   		}   		
   		else if (correctCount == 3) {
   			$('.three').show();
   		} 
   		else if (correctCount == 4) {
   			$('.four').show();
   		} 
   		else if (correctCount == MAINJSON.length) {
   			$('.five').show();
   		}
   		$('.list').hide();    		   		   		
   	};
  	
  };
});

